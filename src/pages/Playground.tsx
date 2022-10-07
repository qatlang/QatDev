import ReactCodeMirror from "@uiw/react-codemirror";
import { atomone } from "@uiw/codemirror-theme-atomone";
import "./Playground.css";
import Button from "../components/Button";

let editorValue = `main() [
\tsay "Hello, World!".
]`;

export default function Playground() {
  return (
    <div className="playground">
      <div className="editorHeader">
        <Button className="runButton" content="Run" onClick={() => {}} />
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
          onChange={(val) => {
            editorValue = val;
          }}
        />
      </div>
    </div>
  );
}

