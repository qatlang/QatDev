import lavaCapsule from "../public/lava_capsule.png";
import discordIcon from "../public/discord.png";
import githubIcon from "../public/github.png";
import youtubeIcon from "../public/youtube.png";
import aldrinImg from "../public/aldrin.jpeg";
import Button from "../components/Button";
import { examples, languageFeatures } from "../models/data";
import { useEffect, useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Select from "react-select";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import useWindowSize from "../utils/WindowSize";
import { IPushedCommit, ITimeStats } from "../models/interfaces";
import { SocialIcon } from "../components/SocialIcon";
import { StringMappedInteractionTypes } from "discord.js";
import Markdown from "../components/Markdown";
import styles from "../styles/index.module.css";

function Catchphrase(props: { className?: string }) {
  return (
    <div className={props.className ?? "font-mono text-left"}>
      <div className="flex flex-row">
        <div className="font-bold xl:text-4xl lg:text-3xl md:text-4xl sm:text-4xl text-2xl mb-2">
          {"Closer to your machine's heart"}
        </div>
        <div className="text-4xl sm:text-6xl self-center pr-5 sm:pr-10">🦾</div>
      </div>
      <div className="pt-2 sm:pb-3 xl:text-2xl lg:text-xl md:text-2xl sm:text-xl text-sm">
        {
          "Superfast modern systems language for efficient & maintainable software..."
        }
      </div>
    </div>
  );
}

function MobileCatchphrase() {
  return (
    <div className="sm:hidden font-mono text-center mx-5">
      <div className="flex flex-row">
        <div className="font-bold lg:text-4xl md:text-4xl sm:text-2xl text-3xl mb-2">
          {"Closer to your machine's heart"}
        </div>
        <div className="text-6xl sm:text-6xl self-center sm:pr-10">🦾</div>
      </div>
      <div className="pt-2 sm:pb-3 lg:text-2xl md:text-2xl sm:text-xl text-base">
        {
          "Superfast modern systems language for efficient & maintainable software..."
        }
      </div>
    </div>
  );
}

function SmallStat(props: {
  title: string;
  description: string;
  emoji: string;
}) {
  return (
    <div className="flex flex-row flex-1 align-middle justify-center lg:mt-0 w-[50%] lg:w-auto">
      <div className="flex flex-col align-middle justify-center text-base sm:text-lg mr-2">
        <div className="font-mono font-bold text-xl sm:text-2xl">
          {props.title}
        </div>
        {props.description}
      </div>
      <div className="text-4xl sm:text-5xl select-none self-center">
        {props.emoji}
      </div>
    </div>
  );
}

function ProjectInfo(props: {
  className?: string;
  workHours: number | null;
  latestCommit: IPushedCommit | null;
  releaseCount: number | null;
}) {
  return (
    <div
      className={
        props.latestCommit && props.releaseCount && props.workHours
          ? (props.className ?? "") +
            " flex flex-col lg:flex-row my-3 py-4 rounded-md w-[100%] self-center justify-center"
          : styles.pulseLoad + " h-5 rounded-md shadow-lg mx-4 my-6"
      }
    >
      {props.workHours && props.latestCommit && props.releaseCount && (
        <>
          <div className="flex flex-row mr-0 w-[100%] lg:w-[25%] lg:flex-grow lg:align-middle lg:justify-center lg:mr-4 mb-5 sm:mb-10 lg:mb-0">
            <div className="flex flex-row w-[100%] lg:flex-col my-0 sm:my-5 mx-10 sm:mx-0 space-x-6 lg:space-x-0 lg:space-y-5">
              <SmallStat
                title={props.releaseCount.toString() + " releases"}
                description="since December 2021"
                emoji="🚀"
              />
              <SmallStat
                title={props.workHours.toFixed(2) + " hours"}
                description="of work"
                emoji="🔥"
              />
            </div>
          </div>
          <div className="flex flex-col lg:max-h-72 self-center border border-solid border-[#333333] lg:w-auto lg:mx-0 w-[95%] bg-[#00000088] rounded-3xl items-start justify-start p-4 sm:p-7">
            <div className="flex flex-row align-middle justify-center mb-4 text-xs sm:text-sm text-white">
              <p className="py-1">Latest Commit in</p>
              <div className="h-fit font-mono flex flex-row self-center align-middle justify-center text-white bg-styleGreen font-bold py-[0.13rem] sm:py-1 px-1 sm:px-2 mx-2 rounded-md sm:rounded-lg">
                {props.latestCommit.repository +
                  ":" +
                  (props.latestCommit.ref.includes("/")
                    ? props.latestCommit.ref.split("/")[
                        props.latestCommit.ref.split("/").length - 1
                      ]
                    : props.latestCommit.ref)}
              </div>
              <p className="py-1 self-center">on</p>
              <div className="font-mono font-bold self-center bg-[#4169e1] h-fit rounded-md sm:rounded-lg mx-2 py-[0.13rem] sm:py-1 px-1 sm:px-2">
                {props.latestCommit.site}
              </div>
            </div>
            <ReactMarkdown
              className="font-mono text-left text-lg font-bold mb-2"
              components={{
                code: (value) => (
                  <pre className="inline bg-[#ffffff33] rounded-md px-1">
                    {value.children}
                  </pre>
                ),
              }}
              // eslint-disable-next-line react/no-children-prop
              children={props.latestCommit.title}
            />
            <Markdown className="overflow-y-auto text-left">
              {props.latestCommit.message}
            </Markdown>
          </div>
          <div className="font-mono flex flex-col flex-grow text-sm border border-solid border-[#333333] lg:w-[25%] lg:mt-0 mt-3 sm:mt-5 w-[95%] lg:self-auto self-center align-middle justify-center bg-black rounded-3xl lg:ml-5 p-5">
            <div className="flex flex-row w-auto align-middle justify-center">
              <div className="flex flex-col mr-5 self-center">
                <p>Created with ❤️</p>
                <p>
                  in <b>Kerala, India</b> 🇮🇳 by
                </p>
              </div>
              <Image
                className="w-[80px] h-[80px] rounded-full"
                src={aldrinImg}
                alt="Aldrin Mathew"
              />
            </div>
            <p className="font-bold mt-4">Aldrin Mathew</p>
            <div className="self-center mt-4">
              <Link href="https://github.com/aldrinmathew" target="_blank">
                <Image className="w-8" src={githubIcon} alt="Github icon" />
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function AllButtons(props: { className: string }) {
  const router = useRouter();
  return (
    <div className={props.className}>
      <div className="hidden lg:flex lg:flex-col">
        <Catchphrase />
      </div>
      <div className="flex flex-col sm:flex-row">
        <div className="flex flex-row mb-2 sm:mb-0">
          <Button
            style="font-mono sm:text-xl text-sm"
            onClick={() => router.push("/downloads")}
          >
            Download
          </Button>
          <Button
            style="font-mono sm:text-xl text-sm"
            onClick={() => router.push("/playground")}
          >
            Try
          </Button>
        </div>
        <Button
          theme="special"
          style="font-mono sm:text-xl text-sm"
          onClick={() => {
            router.push("/donate");
          }}
        >
          <svg
            className="self-center mr-2 h-6 w-6 sm:h-8 sm:w-8"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M13.8498 0.500709C14.4808 0.500709 15.1108 0.589709 15.7098 0.790709C19.4008 1.99071 20.7308 6.04071 19.6198 9.58071C18.9898 11.3897 17.9598 13.0407 16.6108 14.3897C14.6798 16.2597 12.5608 17.9197 10.2798 19.3497L10.0298 19.5007L9.76977 19.3397C7.48077 17.9197 5.34977 16.2597 3.40077 14.3797C2.06077 13.0307 1.02977 11.3897 0.389772 9.58071C-0.740228 6.04071 0.589773 1.99071 4.32077 0.769709C4.61077 0.669709 4.90977 0.599709 5.20977 0.560709H5.32977C5.61077 0.519709 5.88977 0.500709 6.16977 0.500709H6.27977C6.90977 0.519709 7.51977 0.629709 8.11077 0.830709H8.16977C8.20977 0.849709 8.23977 0.870709 8.25977 0.889709C8.48077 0.960709 8.68977 1.04071 8.88977 1.15071L9.26977 1.32071C9.36159 1.36968 9.46466 1.44451 9.55373 1.50918C9.61017 1.55015 9.66099 1.58705 9.69977 1.61071C9.71609 1.62034 9.73268 1.63002 9.7494 1.63978C9.83514 1.68983 9.92446 1.74197 9.99977 1.79971C11.1108 0.950709 12.4598 0.490709 13.8498 0.500709ZM16.5098 7.70071C16.9198 7.68971 17.2698 7.36071 17.2998 6.93971V6.82071C17.3298 5.41971 16.4808 4.15071 15.1898 3.66071C14.7798 3.51971 14.3298 3.74071 14.1798 4.16071C14.0398 4.58071 14.2598 5.04071 14.6798 5.18971C15.3208 5.42971 15.7498 6.06071 15.7498 6.75971V6.79071C15.7308 7.01971 15.7998 7.24071 15.9398 7.41071C16.0798 7.58071 16.2898 7.67971 16.5098 7.70071Z"
              fill="#ff3300"
            />
          </svg>
          {"Donate"}
        </Button>
      </div>
      <div className="flex flex-row mt-5 mb-10 ml-[-0.5rem] sm:ml-0">
        <SocialIcon icon={githubIcon} link={"https://github.com/qatlang"} />
        <SocialIcon
          icon={discordIcon}
          link={"https://discord.gg/CNW3Uvptvd"}
          color="discord"
        />
        <SocialIcon
          icon={youtubeIcon}
          link={"https://youtube.com/@aldrinmathew"}
        />
      </div>
    </div>
  );
}

export default function Home() {
  let [compilerStats, setCompilerStats] = useState<ITimeStats | null>(null);
  let [latestCommit, setLatestCommit] = useState<IPushedCommit | null>(null);
  let [releaseCount, setReleaseCount] = useState<number | null>(null);
  let [totalWorkHours, setTotalWorkHours] = useState<number | null>(null);
  useEffect(() => {
    if (
      compilerStats &&
      compilerStats.compiler &&
      compilerStats.docs &&
      compilerStats.server &&
      compilerStats.vscode &&
      compilerStats.website
    ) {
      setTotalWorkHours(
        (compilerStats.compiler.data.total_seconds +
          compilerStats.docs.data.total_seconds +
          compilerStats.server.data.total_seconds +
          compilerStats.vscode.data.total_seconds +
          compilerStats.website.data.total_seconds +
          compilerStats.tom.data.total_seconds) /
          3600 +
          400 /* Estimated Untracked time for the compiler repo */
      );
    }
  }, [compilerStats]);
  useEffect(() => {
    fetch("/api/workStats", { next: { revalidate: 7200 } })
      .then(async (resp) => {
        if (resp.status === 200) {
          setCompilerStats(await resp.json());
          console.debug("Fetched work stats:", compilerStats);
        } else {
          console.error("Fetching work statistics returned invalid response");
        }
      })
      .catch((err) => {
        console.error("Error while retrieving work statistics: ", err);
      });
    fetch("/api/latestCommit", { next: { revalidate: 7200 } })
      .then(async (resp) => {
        if (resp.status === 200) {
          setLatestCommit(await resp.json());
        } else {
          console.error("Fetching latest commit returned invalid response");
        }
      })
      .catch((err) => {
        console.error(err);
      });
    fetch("/api/releaseCount", { next: { revalidate: 7200 } }).then(
      async (resp) => {
        if (resp.status === 200) {
          setReleaseCount((await resp.json()).count);
        } else {
          console.error("Fetching release count returned invalid response");
        }
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Feature = (props: { title: string; content: string }) => {
    return (
      <div className="flex flex-col bg-black text-left p-3 sm:p-8 border-2 border-solid border-[#333333] rounded-2xl">
        <p className="font-bold text-xl sm:text-2xl mb-2">{props.title}</p>
        <Markdown>{props.content}</Markdown>
      </div>
    );
  };

  return (
    <div className="flex flex-col">
      <title>Home | QAT Language</title>
      <div className="xl:w-[1280px] lg:w-[95%] xs:w-[100%] self-center">
        <div className="flex flex-col lg:flex-row pt-2 sm:pt-6 md:pt-14 lg:h-96 lg:mb-10">
          <MobileCatchphrase />
          <div className="flex flex-row lg:flex-col align-middle justify-center">
            <div className="flex-1 pl-5 sm:pl-0 self-center pointer-events-none select-none lg:mr-5">
              <Image
                className="xl:w-[40rem]"
                src={lavaCapsule}
                priority
                alt="lava-cover"
              />
            </div>
            <div className="lg:hidden flex flex-col w-[65%] pl-5 sm:pl-0 sm:w-[70%]">
              <Catchphrase className="hidden font-mono text-left sm:flex sm:flex-col" />
              <AllButtons className="mt-5 flex flex-col" />
            </div>
          </div>
          <AllButtons className="lg:flex lg:flex-col hidden" />
          <div className="lg:ml-2 lg:w-[33%] w-[95%] self-center h-[100%] lg:h-auto p-2 lg:mt-0 mt-5">
            <Examples />
          </div>
        </div>
        <ProjectInfo
          workHours={totalWorkHours}
          latestCommit={latestCommit}
          releaseCount={releaseCount}
        />
        <p className="my-5 lg:my-10 text-xl sm:text-2xl lg:text-3xl font-bold">
          What is qat all about?
        </p>
        <div className="mx-2 mb-5 flex flex-col space-y-2 sm:hidden">
          {languageFeatures.flatMap((f) => (
            <Feature title={f.title} content={f.content} />
          ))}
        </div>
        <div className="hidden sm:flex sm:flex-row space-x-2 lg:space-x-6 mx-4 my-2 lg:my-4">
          {[
            { a: 0, b: Math.floor(languageFeatures.length / 2) },
            {
              a: Math.floor(languageFeatures.length / 2),
              b: languageFeatures.length,
            },
          ].flatMap((i) => (
            <div className="flex flex-col space-y-2 lg:space-y-6 w-[50%]">
              {languageFeatures.slice(i.a, i.b).flatMap((feature) => {
                return (
                  <Feature title={feature.title} content={feature.content} />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Examples() {
  let [active, setActive] = useState(1);
  const size = useWindowSize();
  return (
    <>
      {
        <div className="flex flex-col font-mono">
          <div className="flex flex-row font-mono align-middle justify-between">
            <p className="font-bold text-md text-left">Examples</p>
            <Select
              className="w-1/2 text-sm mb-2"
              options={examples.flatMap((ex, i) => {
                return {
                  value: i,
                  label: ex.title,
                };
              })}
              defaultValue={{ value: 1, label: examples[1].title }}
              onChange={(val) => {
                if (val) {
                  setActive(val.value);
                }
              }}
              styles={{
                singleValue: (styles, _) => {
                  return {
                    ...styles,
                    fontSize: size.isVertical() ? "1rem" : "1rem",
                  };
                },
                menuList: (styles, _) => {
                  return {
                    ...styles,
                    borderRadius: "5px",
                    fontSize: "calc(1rem)",
                    border: "1px solid #555555",
                  };
                },
                option: (styles, state) => {
                  return {
                    ...styles,
                    color: "white",
                    fontWeight: state.isSelected ? "bold" : "normal",
                  };
                },
              }}
              theme={{
                colors: {
                  primary: "#128f5f",
                  primary75: "#128f5fcc",
                  primary50: "#128f5f99",
                  primary25: "#128f5f55",
                  danger: "#ff0055",
                  dangerLight: "#ff0055",
                  neutral0: "#303030",
                  neutral5: "#555555",
                  neutral10: "#666666",
                  neutral20: "#777777",
                  neutral30: "#888888",
                  neutral40: "#999999",
                  neutral50: "#aaaaaa",
                  neutral60: "#bbbbbb",
                  neutral70: "#cccccc",
                  neutral80: "#dddddd",
                  neutral90: "#ffffff",
                },
                borderRadius: 5,
                spacing: { baseUnit: 2, controlHeight: 0, menuGutter: 0 },
              }}
            />
          </div>
          <div
            className="max-h-72 bg-[#303030] rounded-lg pr-1 pt-1 text-[#dddddd] flex flex-col align-top justify-start overflow-x-auto overflow-y-auto"
            style={{ fontSize: size.isVertical() ? "3.3vmin" : "1.8vmin" }}
          >
            {examples[active].content.split("\n").map((elem, i) => (
              <div
                className="w-auto text-base flex flex-row align-middle"
                key={"codeLineRow." + i.toString()}
              >
                <div className="pl-5 whitespace-pre mb-1">{elem}</div>
              </div>
            ))}
          </div>
        </div>
      }
    </>
  );
}

