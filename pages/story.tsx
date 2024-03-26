import dynamic from "next/dynamic";
import { IPost } from "../models/interfaces";
import { useState } from "react";
import pb, { Tables } from "../models/pb";
import Markdown from "../components/Markdown";
import { Env } from "../models/env";

export default dynamic(() => Promise.resolve(Blog), { ssr: false });

export async function getServerSideProps() {
  let result = await pb
    .collection(Tables.story)
    .getList<IPost>(0, 10, { sort: "-timestamp" });
  return { props: { posts: result.items, totalPage: result.totalPages } };
}

export function Blog(props: { posts: IPost[]; totalPage: number }) {
  const [posts, setPosts] = useState<IPost[]>(props.posts);
  const [page, setPage] = useState<number>(1);
  let totalPage = props.totalPage;
  return (
    <div className="flex flex-col max-w-[100%] pt-8">
      <title>Story | QAT Programming Language</title>
      <div className="flex flex-col w-[90%] self-center">
        <p className="text-3xl font-bold text-left mb-4">Story of qat</p>
        <p className="text-lg text-left mb-10">
          Hi, these are updates that I post occasionally, mostly about the
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          status of the project, or crucial changes. Please don't expect
          frequent updates. My focus is on developing and improving the language
          and not on maintaining any superficial impression about the project
        </p>
        {posts.flatMap((post, i) => {
          return (
            <div>
              <div
                key={post.timestamp}
                className="p-4 shadow-lg dark:shadow-none bg-white dark:bg-black rounded-2xl border-2 border-solid border-gray-300 dark:border-styleGray"
              >
                <div className="text-left text-sm font-bold mb-4 py-[0.15rem] px-2 text-black dark:text-paleWhite bg-gray-200 dark:bg-gray-700 w-fit rounded-lg">
                  {new Date(post.timestamp).toLocaleString(undefined, {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </div>
                {post.title.length > 0 && (
                  <div className="font-bold text-2xl text-left mb-4">
                    {post.title}
                  </div>
                )}
                <Markdown
                  className={"text-lg text-left"}
                  // eslint-disable-next-line react/no-children-prop
                  children={post.content}
                />
                {post.source.length > 0 && (
                  <div className="py-1 px-2 italic text-sm text-gray-500 font-bold text-left">
                    Posted on {post.source}
                  </div>
                )}
              </div>
              {i != posts.length - 1 && (
                <p className="my-5 text-xl font-bold select-none text-left text-gray-500">
                  ⇡
                </p>
              )}
            </div>
          );
        })}
        <div
          className="bg-styleGreen select-none text-[#ffffff] cursor-pointer py-2 px-4 font-bold w-fit self-center mt-10 mb-20 hover:bg-black dark:hover:bg-white active:bg-white dark:active:bg-black hover:text-white dark:hover:text-black rounded-lg"
          onClick={() => {
            if (page + 1 <= totalPage) {
              fetch("/api/getPosts?previousPage=" + page.toString(), {
                body: JSON.stringify({
                  confirmationKey: Env.confirmationKey(),
                }),
                cache: "no-store",
                method: "POST",
              })
                .then(async (res) => {
                  if (res.status === 200) {
                    const resVal = (await res.json()) as {
                      totalPages: number;
                      items: IPost[];
                    };
                    totalPage = resVal.totalPages;
                    setPosts([...posts, ...resVal.items]);
                    setPage(page + 1);
                  }
                })
                .catch((e) => {
                  console.debug("Error while fetching posts: ", e);
                });
            }
          }}
        >
          Show more
        </div>
      </div>
    </div>
  );
}

