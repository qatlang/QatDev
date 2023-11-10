import Button from "../components/Button";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Env } from "../models/env";
import AceEditor from "react-ace";
import "brace/theme/solarized_dark";
import "brace/mode/rust";
import { Ace } from "ace-builds";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Markdown from "../components/Markdown";
import fs from "fs";
import path from "path";

interface CompileResult {
  problems: Problem[];
  hasMain: boolean;
  status: boolean;
  compilationTime: number;
  linkingTime: number;
  binarySizes: number[];
}

let lineLengths: number[] = [];

function findCharsUptoLine(line: number): number {
  let result = 0;
  for (let i = 0; line < lineLengths.length && i < line; i++) {
    result += lineLengths[i];
  }
  return result;
}

interface FilePos {
  line: number;
  char: number;
}

interface FileRange {
  file: string;
  start: FilePos;
  end: FilePos;
}

interface Problem {
  isError: boolean;
  message: string;
  hasRange: boolean;
  fileRange?: FileRange;
}

function numToFileSize(value: number): string {
  if (value < 1024) {
    return value.toString() + " bytes";
  } else if (value < 1048576) {
    return (value / 1024).toString() + " kilobytes";
  } else {
    return (value / 1048576).toString() + " megabytes";
  }
}

function numToTimeUnits(value: number): string {
  if (value < 1000) {
    return value.toString() + " microseconds";
  } else if (value < 1000000) {
    return (value / 1000).toString() + " milliseconds";
  } else {
    return (value / 1000000).toString() + " seconds";
  }
}

function CompileStats(props: {
  binarySize: number | null;
  compilation: number;
  linking: number;
}) {
  return (
    <div className="flex flex-col bg-[#01313f] w-fit p-2 rounded-lg">
      {props.binarySize && (
        <div className="flex flex-row pb-1 align-middle">
          <div className="mr-2 self-center">Binary Size:</div>
          <div className="font-bold rounded-lg bg-black py-1 px-2">
            {numToFileSize(props.binarySize)}
          </div>
        </div>
      )}
      <div className="flex flex-row pb-1 align-middle">
        <div className="mr-2 self-center">
          Time for compiling to LLVM IR by <i>qat</i>:
        </div>
        <div className="font-bold rounded-lg bg-black py-1 px-2">
          {numToTimeUnits(props.compilation)}
        </div>
      </div>
      <div className="flex flex-row pb-1 align-middle">
        <div className="mr-2 self-center">
          IR Compilation & Linking by clang & lld
        </div>
        <div className="font-bold rounded-lg bg-black py-1 px-2">
          {numToTimeUnits(props.linking)}
        </div>
      </div>
    </div>
  );
}

function Diagnostics(props: {
  lastResult?: CompileResult;
  probs: Problem[];
  editor: Ace.Editor | null;
}) {
  return (
    <div className="flex flex-col justify-start max-h-60 overflow-y-auto text-left bg-[#002b36] border-t-4 border-solid border-[#2aa198] p-4 transition-all">
      <div className="flex flex-row">
        <p className="text-xl font-bold mr-3">Diagnostics</p>
        {props.lastResult && (
          <div
            className="py-1 px-3 font-mono font-bold text-base w-fit rounded-lg"
            style={{
              color: props.lastResult.status ? "black" : "white",
              backgroundColor: props.lastResult.status ? "#15ac53" : "#c2441d",
            }}
          >
            {props.lastResult.status ? "Success" : "Failed"}
          </div>
        )}
      </div>
      {props.lastResult && props.lastResult.status && (
        <div className="mt-2">
          <CompileStats
            binarySize={props.lastResult.binarySizes[0]}
            compilation={props.lastResult.compilationTime}
            linking={props.lastResult.linkingTime}
          />
        </div>
      )}
      <div className="mt-5">
        {props.probs.length > 0 ? (
          props.probs.flatMap((prob) => (
            <div className="mb-5 flex flex-col justify-start font-mono cursor-pointer pb-5 rounded-lg bg-[#00000033] p-2">
              {prob.fileRange && (
                <div className="font font-mono italic">
                  {prob.fileRange.start.line.toString() +
                    ":" +
                    prob.fileRange.start.char.toString() +
                    " -> " +
                    prob.fileRange.end.line.toString() +
                    ":" +
                    prob.fileRange.end.char.toString()}
                </div>
              )}
              <div
                className="flex flex-row mt-2"
                onClick={() => {
                  if (props.editor && prob.fileRange) {
                    props.editor.clearSelection();
                    let range = props.editor.getSelectionRange();
                    range.start.row = prob.fileRange.start.line - 1;
                    range.start.column = prob.fileRange.start.char - 1;
                    range.end.row = prob.fileRange.end.line - 1;
                    range.end.column = prob.fileRange.end.char - 1;
                    props.editor.selection.addRange(range);
                  }
                }}
              >
                <div
                  className="rounded-lg self-center p-2"
                  style={{
                    backgroundColor: prob.isError ? "#c2441dff" : "#8400ff88",
                  }}
                >
                  {prob.isError ? "Error" : "Warning"}
                </div>
                <div className="ml-5 text-left flex flex-col justify-center font-display">
                  <Markdown>{prob.message}</Markdown>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="italic">No problems found...</div>
        )}
      </div>
    </div>
  );
}

function useSaveKey(cbFn: () => void) {
  const callback = useRef(cbFn);
  useEffect(() => {
    callback.current = cbFn;
  });
  useEffect(() => {
    function handle(event: any) {
      if (event.code === "KeyS" && event.ctrlKey) {
        event.preventDefault();
        callback.current();
      }
    }
    document.addEventListener("keydown", handle);
    return () => document.removeEventListener("keydown", handle);
  });
}

function compileCode(
  codeContent: string,
  updateLastRes: React.Dispatch<React.SetStateAction<CompileResult | undefined>>
) {
  updateLastRes(undefined);
  lineLengths = codeContent.split("\n").map((lin) => lin.length);
  fetch("/api/compile", {
    method: "POST",
    mode: "cors",
    body: JSON.stringify({
      content: codeContent,
      time: new Date().toISOString(),
      confirmationKey: Env.confirmationKey(),
    }),
    cache: "no-cache",
  })
    .then(async (res) => {
      updateLastRes(await res.json());
    })
    .catch((err) => {
      console.error(err);
    });
}

export default dynamic(() => Promise.resolve(Playground), { ssr: false });

interface MDXContent {
  title: string;
  index: number;
  content: string;
}

function PlaygroundLearnItem(props: { file: MDXContent }) {
  let [isExpanded, setExpanded] = useState<boolean>(false);
  return (
    <div className="bg-[#181818] rounded-lg border border-solid border-1 border-[#444444]">
      <div
        className="cursor-pointer flex flex-row align-middle rounded-lg bg-[#282828] hover:bg-[#434343] transition-colors p-4"
        onClick={() => {
          setExpanded(!isExpanded);
        }}
      >
        <div className="font-bold text-xl flex-grow text-left">
          {props.file.index} - {props.file.title}
        </div>
        <div
          className="self-center transition-transform"
          style={{ rotate: isExpanded ? "180deg" : "0deg" }}
        >
          <svg
            width="20"
            height="11"
            viewBox="0 0 316 189"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M306.745 52.1693C318.457 40.4493 318.45 21.4544 306.73 9.74293C295.01 -1.96848 276.015 -1.96149 264.303 9.75855L179.482 94.6426C167.77 106.363 148.775 106.37 137.055 94.6582L52.1712 9.83662C40.4512 -1.8748 21.4562 -1.86781 9.74481 9.85223C-1.96661 21.5723 -1.95961 40.5672 9.76043 52.2786L137.087 179.511C148.807 191.222 167.801 191.215 179.513 179.495L306.745 52.1693Z"
              fill="#D9D9D9"
            />
          </svg>
        </div>
      </div>
      {isExpanded && (
        <Markdown className="px-3 py-3">{props.file.content}</Markdown>
      )}
    </div>
  );
}

function Playground(props: { files: MDXContent[] }) {
  let [lastRes, updateLastRes] = useState<CompileResult | undefined>(undefined);
  useSaveKey(() => {
    compileCode(editorValue, updateLastRes);
  });
  let [editorValue, setEditorValue] = useState(`pub main() [
	say "Hello, World!".
]`);
  let [editor, setEditor] = useState<Ace.Editor | null>(null);
  return (
    <div className="px-5 flex flex-col w-screen min-h-[92vh] max-h-[92vh]">
      <ToastContainer />
      <div className="flex flex-col-reverse md:flex md:flex-row md:flex-1 pb-5">
        <div className="flex flex-col max-h-[38vh] min-h-fit md:h-auto mt-5 md:mt-0 md:w-[35%] overflow-y-auto md:mr-5">
          {props.files.flatMap((e) => {
            return <PlaygroundLearnItem file={e} />;
          })}
        </div>
        <div className="flex flex-col md:flex-grow min-h-[50vh] max-h-[92vh]">
          <Button
            style="font-mono mb-4 h-fit"
            onClick={(_) => {
              if (
                !/Android/.test(navigator.platform) &&
                !["iPhone", "iPad", "iPod"].includes(navigator.platform)
              ) {
                toast.info<string>("You can press Ctrl + S to build the code", {
                  position: "top-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: false,
                  progress: undefined,
                  theme: "colored",
                });
              }
              compileCode(editorValue, updateLastRes);
            }}
          >
            Build
          </Button>
          <AceEditor
            className="font-mono flex-grow"
            theme="solarized_dark"
            mode="rust"
            width="100%"
            fontSize={25}
            enableBasicAutocompletion
            enableSnippets
            defaultValue={editorValue}
            onChange={(val) => {
              setEditorValue(val);
            }}
            onLoad={(ed) => {
              setEditor(ed);
            }}
            annotations={
              lastRes
                ? lastRes.problems.map((p) => {
                    return {
                      row: p.fileRange
                        ? p.fileRange!.start.line - 1
                        : undefined,
                      column: p.fileRange
                        ? p.fileRange!.start.char - 1
                        : undefined,
                      text: p.message,
                      type: p.isError ? "error" : "warning",
                    };
                  })
                : []
            }
            placeholder={"Start coding..."}
          />
          <Diagnostics
            lastResult={lastRes}
            probs={(lastRes?.problems ?? []).sort((a, b) => {
              return a.isError ? (b.isError ? 0 : -1) : b.isError ? 1 : 0;
            })}
            editor={editor}
          />
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps(_ctx: any) {
  const dir = path.resolve("./public/", "learn");
  const filenames = fs.readdirSync(dir);
  const result = filenames
    .map((p) => {
      const itemPath = path.join(dir, p);
      const content = fs.readFileSync(itemPath).toString();
      const [headStr, contentStr] = content.split("---");
      const [titleStr, indexStr] = headStr.split("\n");
      return {
        title: titleStr.split(": ")[1],
        index: Number(indexStr.split(": ")[1]),
        content: contentStr,
      };
    })
    .sort((a, b) => a.index - b.index);
  return { props: { files: result } };
}

