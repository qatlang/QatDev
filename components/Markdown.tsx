import { Ace } from "ace-builds";
import dynamic from "next/dynamic";
import ReactMarkdown from "react-markdown";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default dynamic(() => Promise.resolve(Markdown), { ssr: false });

export function Markdown(props: {
  className?: string;
  children: string;
  editor?: Ace.Editor;
}) {
  return (
    <ReactMarkdown
      className={props.className + " text-left"}
      components={{
        ul: (value) => <ul className="my-2">{value.children}</ul>,
        li: (value) => <li className="my-2">• {value.children}</li>,
        p: (value) => <p className="inline my-0">{value.children}</p>,
        code: (value) =>
          value.inline ? (
            <pre className="inline bg-[#3d434d] rounded-md px-1">
              {value.children}
            </pre>
          ) : (
            <div className="my-3 relative text-left block overflow-x-auto bg-[#2b2f36] p-3 rounded-lg border-2 border-solid transition-colors border-[#555555] hover:border-styleGreen">
              {value.children}
              <ToastContainer />
              <div
                className="select-none transition-colors absolute bottom-1 right-1 px-2 py-1 bg-styleGreen rounded-md cursor-pointer hover:bg-[#2a6b52] active:bg-[#235844]"
                onClick={async () => {
                  try {
                    if (
                      navigator &&
                      navigator.clipboard &&
                      window.isSecureContext
                    ) {
                      await navigator.clipboard.writeText(
                        value.children.map((c) => c?.toString()).join()
                      );
                      toast.success<string>("Code copied to clipboard", {
                        position: "bottom-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: false,
                        progress: undefined,
                        theme: "colored",
                      });
                    } else {
                      toast.error<string>(
                        "Error while copying code: Clipboard could not be found",
                        {
                          position: "bottom-right",
                          autoClose: 3000,
                          hideProgressBar: false,
                          closeOnClick: false,
                          pauseOnHover: true,
                          draggable: false,
                          progress: undefined,
                          theme: "colored",
                        }
                      );
                    }
                  } catch (e: any) {
                    toast.error<string>(
                      "Error while copying code: " + e.toString(),
                      {
                        position: "bottom-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: false,
                        progress: undefined,
                        theme: "colored",
                      }
                    );
                  }
                }}
              >
                <svg
                  width="19.5"
                  height="22.5"
                  viewBox="0 0 156 180"
                  fill="#ffffff99"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M42 0H78C99.2881 0 116.877 15.838 119.626 36.3736C140.162 39.1229 156 56.7119 156 78V138C156 161.196 137.196 180 114 180H78C56.7119 180 39.123 164.162 36.3736 143.626C15.838 140.877 0 123.288 0 102V42C0 18.804 18.804 0 42 0ZM36 125.244V78C36 54.804 54.804 36 78 36H101.244C98.5796 25.6486 89.183 18 78 18H42C28.7452 18 18 28.7452 18 42V102C18 113.183 25.6486 122.58 36 125.244ZM78 54H114C127.255 54 138 64.7452 138 78V138C138 151.255 127.255 162 114 162H78C64.7452 162 54 151.255 54 138V78C54 64.7452 64.7452 54 78 54Z"
                  />
                </svg>
              </div>
            </div>
          ),
      }}
      // eslint-disable-next-line react/no-children-prop
      children={props.children}
    />
  );
}

