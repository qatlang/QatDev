import ReactCodeMirror from "@uiw/react-codemirror";
import { linter, Diagnostic } from "@codemirror/lint";
import { atomone } from "@uiw/codemirror-theme-atomone";
import styles from "styles/Playground.module.css";
import Button from "../utils/Button";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

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
    <div className={styles.timeStats}>
      <div className={styles.timeDesc}>Timing of stages</div>
      <div className={styles.timeStatValues}>
        <div className={styles.timeElement}>
          <div className={styles.timeName}>qat</div>
          <div className={styles.timeValue}>{props.qat / 1000000} seconds</div>
        </div>
        <div className={styles.timeElement}>
          <div className={styles.timeName}>clang</div>
          <div className={styles.timeValue}>
            {props.clang / 1000000} seconds
          </div>
        </div>
      </div>
    </div>
  );
}

function CodeProblem(props: { probs: Problem[] }) {
  return (
    <div className={styles.codeProblems}>
      <div className={styles.probTitle}>
        {props.probs.length > 0 ? props.probs.length.toString() : ""} Problem
        {props.probs.length === 1 ? "" : "s"}
      </div>
      <div className={styles.probList}>
        {props.probs.length > 0 ? (
          props.probs.flatMap((prob) => (
            <div className={styles.probElem}>
              <div className={styles.probRange}>
                {(prob.range.start.line ?? 0).toString() +
                  ":" +
                  (prob.range.start.char ?? 0).toString() +
                  " -> " +
                  (prob.range.end.line ?? 0).toString() +
                  ":" +
                  (prob.range.end.char ?? 0).toString()}
              </div>
              <div className={styles.probContent}>
                <div
                  className={styles.probCategory}
                  style={{
                    backgroundColor: prob.isError ? "#c2441d88" : "#8400ff88",
                  }}
                >
                  {prob.isError ? "Error" : "Warning"}
                </div>
                <div className={styles.probValue}>{prob.message}</div>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.probTitle}>No problems found</div>
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
  lineLengths = codeContent.split("\n").map((lin) => lin.length);
  fetch("/api/compile", {
    method: "POST",
    mode: "cors",
    body: JSON.stringify({ content: codeContent, time: "" }),
    cache: "no-cache",
  })
    .then(async (res) => {
      let jsRes = await res.json();
      updateLastRes(jsRes);
      console.log(jsRes);
    })
    .catch((err) => {
      console.log(err);
    });
}

export default dynamic(() => Promise.resolve(Playground), { ssr: false });

function Playground() {
  let [lastRes, updateLastRes] = useState<{
    problems: { isError: boolean; message: string; range: FileRange }[];
    hasMain: boolean;
    status: boolean;
    qatTime: number;
    clangTime: number;
  }>();
  useSaveKey(() => {
    compileCode(editorValue, updateLastRes);
  });
  let editorValue = `main() [
   \tsay "Hello, World!".
   ]`;
  return (
    <div className={styles.playground}>
      <div className={styles.editorHeader}>
        <Button
          className={styles.runButton}
          onClick={(e) => {
            compileCode(editorValue, updateLastRes);
          }}
        >
          Build
        </Button>
        {/* <Button
          className={styles.resetButton}
          content="Reset"
          onClick={() => {}}
        /> */}
      </div>
      <div className={styles.editorPanel}>
        <ReactCodeMirror
          className={styles.codeMirror}
          value={editorValue}
          basicSetup={{
            closeBrackets: true,
            tabSize: 4,
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
          <div className={styles.compileInfo}>
            <div
              className={styles.compilationStatus}
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

