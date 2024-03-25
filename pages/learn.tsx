import path from "path";
import fs from "fs";
import { useState } from "react";
import Markdown from "../components/Markdown";
import Link from "next/link";

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

export default function Page(props: {
  files: {
    title: string;
    index: number;
    content: string;
  }[];
}) {
  const [index, setIndex] = useState<number>(0);
  return (
    <div className="flex flex-col w-[100%]">
      <title>Learn | QAT Programming Language</title>
      <div className="flex flex-col self-center w-[90%]">
        <div className="text-xl text-left my-6">
          If you are familiar with systems programming or if you want detailed
          documentation for the language,{" "}
          <Link
            className="font-bold text-blue-500 active:text-black"
            href="https://docs.qat.dev"
            target="_blank"
          >
            try docs.qat.dev
          </Link>
        </div>
        <div className="flex flex-row w-[100%] overflow-x-auto pb-6 my-6">
          {props.files.flatMap((f, i) => {
            return (
              <div
                className="transition-colors cursor-pointer border-2 border-solid border-gray-400 dark:border-styleGray hover:border-black dark:hover:border-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black active:bg-black active:border-black active:text-white mr-4 font-bold text-left py-2 px-4 text-xl rounded-lg"
                onClick={() => {
                  setIndex(i);
                }}
                style={{
                  color: i == index ? "#ffffff" : undefined,
                  backgroundColor: i == index ? "#128f5f" : undefined,
                  borderColor: i == index ? "#128f5f" : undefined,
                }}
              >
                {f.title}
              </div>
            );
          })}
        </div>
        <div className="text-3xl font-bold text-left my-4">
          {props.files[index].title}
        </div>
        {/* eslint-disable-next-line react/no-children-prop */}
        <Markdown className="text-lg" children={props.files[index].content} />
        <div className="flex flex-row w-[100%] mt-10 mb-20">
          {index > 0 && (
            <ChangePage
              onClick={() => {
                setIndex(index - 1);
              }}
              type="Previous"
              name={props.files[index - 1].title}
            />
          )}
          <div className="flex-grow" />
          {index < props.files.length - 1 && (
            <ChangePage
              onClick={() => {
                setIndex(index + 1);
              }}
              type="Next"
              name={props.files[index + 1].title}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function ChangePage(props: {
  onClick: () => void;
  type: string;
  name: string;
}) {
  return (
    <div
      onClick={props.onClick}
      className="transition-colors select-none active:bg-white active:border-white dark:active:bg-black dark:active:border-black hover:text-white dark:hover:text-black hover:bg-black dark:hover:bg-white px-4 py-2 border-2 border-solid border-gray-400 dark:border-gray-600 hover:border-black dark:hover:border-white cursor-pointer rounded-xl flex flex-col w-fit"
    >
      <div className="text-left font-bold text-xl">{props.type}</div>
      <div>{props.name}</div>
    </div>
  );
}

