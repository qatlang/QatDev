import dynamic from "next/dynamic";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { CodeProps } from "react-markdown/lib/ast-to-react";
import "react-toastify/dist/ReactToastify.css";

export default dynamic(() => Promise.resolve(Markdown), { ssr: false });

export function CodeBlock(props: CodeProps) {
  let [copied, setCopied] = useState<"copied" | "error" | null>(null);
  return props.inline ? (
    <pre className="inline font-bold border border-solid border-gray-400 bg-gray-100 dark:border-gray-600 dark:bg-[#3d434d] rounded-md px-1">
      {props.children}
    </pre>
  ) : (
    <div className="my-4 flex flex-col">
      <div className="text-left block overflow-x-auto border-gray-400 bg-[#dce7f9] font-bold dark:border-styleGray dark:bg-[#2f383e] p-3 rounded-t-lg rounded-br-lg border-2 border-solid transition-colors">
        {props.children}
      </div>
      <div
        className="font-bold place-self-start select-none transition-colors w-fit px-1 py-[0.05rem] bg-gray-600 text-white dark:bg-gray-400 dark:text-black text-sm rounded-b-md cursor-pointer hover:bg-black hover:text-white active:bg-white hover:dark:bg-white hover:dark:text-black active:dark:bg-black"
        style={{
          backgroundColor:
            copied === "copied"
              ? "#128f5f"
              : copied === "error"
              ? "red"
              : undefined,
          color: copied ? "white" : undefined,
        }}
        onClick={async () => {
          try {
            if (navigator && navigator.clipboard && window.isSecureContext) {
              await navigator.clipboard.writeText(
                props.children.map((c) => c?.toString()).join()
              );
              setCopied("copied");
              setTimeout(() => {
                setCopied(null);
              }, 2000);
            } else {
              setCopied("error");
              setTimeout(() => {
                setCopied(null);
              }, 2000);
            }
          } catch (e: any) {
            console.log("Error while copying code block");
          }
        }}
      >
        {copied ? "✓ Copied" : "Copy"}
      </div>
    </div>
  );
}

export function Markdown(props: { className?: string; children: string }) {
  return (
    <ReactMarkdown
      className={props.className + " text-black dark:text-white text-left"}
      components={{
        ul: (value) => <ul className="my-2">{value.children}</ul>,
        li: (value) => <li className="my-2">• {value.children}</li>,
        p: (value) => <p className="inline my-0">{value.children}</p>,
        code: CodeBlock,
      }}
      // eslint-disable-next-line react/no-children-prop
      children={props.children}
    />
  );
}

