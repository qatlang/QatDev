import ReactCodeMirror from "@uiw/react-codemirror";
import { linter, Diagnostic } from "@codemirror/lint";
import { atomone } from "@uiw/codemirror-theme-atomone";
import "./Playground.css";
import Button from "../components/Button";
import { useEffect, useRef, useState } from "react";

let editorValue = `main() [
\tsay "Hello, World!".
]`;

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
  range: FileRange;
}

function TimeStats(props: { qat: number; clang: number }) {
  return (
    <div className="timeStats">
      <div className="timeDesc">Timing of stages</div>
      <div className="timeStatValues">
        <div className="timeElement">
          <div className="timeName">qat</div>
          <div className="timeValue">{props.qat / 1000000} seconds</div>
        </div>
        <div className="timeElement">
          <div className="timeName">clang</div>
          <div className="timeValue">{props.clang / 1000000} seconds</div>
        </div>
      </div>
    </div>
  );
}

function CodeProblem(props: { probs: Problem[] }) {
  return (
    <div className="codeProblems">
      <div className="probTitle">
        {props.probs.length > 0 ? props.probs.length.toString() : ""} Problem
        {props.probs.length === 1 ? "" : "s"}
      </div>
      <div className="probList">
        {props.probs.length > 0 ? (
          props.probs.flatMap((prob) => (
            <div className="probElem">
              <div className="probRange">
                {(prob.range.start.line ?? 0).toString() +
                  ":" +
                  (prob.range.start.char ?? 0).toString() +
                  " -> " +
                  (prob.range.end.line ?? 0).toString() +
                  ":" +
                  (prob.range.end.char ?? 0).toString()}
              </div>
              <div className="probContent">
                <div
                  className="probCategory"
                  style={{
                    backgroundColor: prob.isError ? "#c2441d88" : "#8400ff88",
                  }}
                >
                  {prob.isError ? "Error" : "Warning"}
                </div>
                <div className="probValue">{prob.message}</div>
              </div>
            </div>
          ))
        ) : (
          <div className="probTitle">No problems found</div>
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
  updateLastRes: React.Dispatch<
    React.SetStateAction<
      | {
          problems: {
            isError: boolean;
            message: string;
            range: FileRange;
          }[];
          hasMain: boolean;
          status: boolean;
          qatTime: number;
          clangTime: number;
        }
      | undefined
    >
  >
) {
  updateLastRes(undefined);
  lineLengths = editorValue.split("\n").map((lin) => lin.length);
  fetch("http://127.0.0.1:5000/compile", {
    method: "POST",
    mode: "cors",
    body: JSON.stringify({
      content: editorValue,
      time: "",
    }),
  }).then(async (res) => {
    let jsRes = await res.json();
    updateLastRes(jsRes);

    console.log(jsRes);
  });
}

export default function Playground() {
  let [lastRes, updateLastRes] = useState<{
    problems: { isError: boolean; message: string; range: FileRange }[];
    hasMain: boolean;
    status: boolean;
    qatTime: number;
    clangTime: number;
  }>();
  useSaveKey(() => {
    compileCode(updateLastRes);
  });
  return (
    <div className="playground">
      <div className="editorHeader">
        <Button
          className="runButton"
          content="Build"
          onClick={(e) => {
            compileCode(updateLastRes);
          }}
        />
        <Button className="resetButton" content="Reset" onClick={() => {}} />
      </div>
      <div className="editorPanel">
        <ReactCodeMirror
          className="codeMirror"
          value={editorValue}
          basicSetup={{
            indentOnInput: true,
            autocompletion: true,
            bracketMatching: true,
            crosshairCursor: true,
            drawSelection: true,
            highlightActiveLine: true,
            syntaxHighlighting: true,
          }}
          autoFocus={true}
          indentWithTab={true}
          height="80vh"
          width="50vw"
          theme={atomone}
          extensions={[
            linter(function (_): readonly Diagnostic[] {
              const diags: Diagnostic[] = [];
              for (let i = 0; i < (lastRes?.problems ?? []).length; i++) {
                let prob = (lastRes?.problems ?? [])[i];
                diags.push({
                  from:
                    findCharsUptoLine(
                      prob.range.start.line > 0
                        ? prob.range.start.line - 1
                        : prob.range.start.line
                    ) + prob.range.start.char,
                  to:
                    findCharsUptoLine(
                      prob.range.end.line > 0
                        ? prob.range.end.line - 1
                        : prob.range.end.line
                    ) + prob.range.end.char,
                  severity: prob.isError ? "error" : "warning",
                  message: prob.message,
                });
              }
              return diags;
            }),
          ]}
          onChange={(val) => {
            editorValue = val;
          }}
        />
        {lastRes && (
          <div className="compileInfo">
            <div
              className="compilationStatus"
              style={{
                backgroundColor: lastRes.status ? "#15ac53" : "#c2441d",
              }}
            >
              {lastRes.status ? "Success" : "Failed"}
            </div>
            <TimeStats
              qat={lastRes.qatTime ?? 0}
              clang={lastRes.clangTime ?? 0}
            />
            <CodeProblem
              probs={(lastRes.problems ?? []).sort((a, b) => {
                return a.isError ? (b.isError ? 0 : -1) : b.isError ? 1 : 0;
              })}
            />
          </div>
        )}
      </div>
    </div>
  );
}

