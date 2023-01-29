import lavaCapsule from "../public/lava_capsule.png";
import discordIcon from "../public/discord.png";
import githubIcon from "../public/github.png";
import youtubeIcon from "../public/youtube.png";
import aldrinImg from "../public/aldrin.jpeg";
import Button from "../utils/Button";
import styles from "styles/Home.module.css";
import { examples, features } from "../models/data";
import { useEffect, useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Select from "react-select";
import Image from "next/image";
import { useRouter } from "next/router";
import useWindowSize from "../utils/WindowSize";
import OnlyIf, { valueIf } from "../utils/OnlyIf";
import joinNames from "../utils/joinNames";
import fonts from "../utils/fonts";
import { IProjectStats, ITimeStats } from "../models/interfaces";

function Catchphrase() {
  const win = useWindowSize();
  return (
    <div
      className={joinNames([styles.catchPhrase, fonts.poppins.bold])}
      style={{
        fontSize: valueIf(win.isVertical(), "8vmin"),
        lineHeight: valueIf(win.isVertical(), "8vmin"),
      }}
    >
      {"Closer to your machine's heart 🦾"}
    </div>
  );
}

function LangDescription() {
  const win = useWindowSize();
  return (
    <div
      className={joinNames([styles.description, fonts.jetbrainsMono.normal])}
      style={{ fontSize: valueIf(win.isVertical(), "3.5vmin") }}
    >
      {
        "Superfast modern systems language for efficient & maintainable software..."
      }
    </div>
  );
}

function ProjectTimings(props: { stats: ITimeStats }) {
  const StatPair = (prop: { name: string; value: IProjectStats }) => {
    return prop.value ? (
      <div className={styles.projectStatRow}>
        <div className={styles.projectStatName}>{prop.name}</div>
        <div className={styles.projectStatTime}>
          {(
            parseFloat(prop.value.data.decimal) +
            (prop.name == "Compiler" ? 400 : 0)
          ).toString() + " hours"}
        </div>
      </div>
    ) : (
      <></>
    );
  };
  return (
    <div className={joinNames([styles.workStats, fonts.jetbrainsMono.normal])}>
      <div className={styles.workStatsHeader}>
        <svg
          className="workStatsIcon"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M10 20.0001C4.48 20.0001 0 15.5301 0 10.0001C0 4.48012 4.48 0.00012207 10 0.00012207C15.53 0.00012207 20 4.48012 20 10.0001C20 15.5301 15.53 20.0001 10 20.0001ZM13.19 13.7101C13.31 13.7801 13.44 13.8201 13.58 13.8201C13.83 13.8201 14.08 13.6901 14.22 13.4501C14.43 13.1001 14.32 12.6401 13.96 12.4201L10.4 10.3001V5.68012C10.4 5.26012 10.06 4.93012 9.65 4.93012C9.24 4.93012 8.9 5.26012 8.9 5.68012V10.7301C8.9 10.9901 9.04 11.2301 9.27 11.3701L13.19 13.7101Z"
            fill="#cccccc"
          />
        </svg>
        <div className={styles.workStatsTitle}>Time Tracker</div>
      </div>
      <StatPair name="Compiler" value={props.stats.compiler} />
      <StatPair name="Docs" value={props.stats.docs} />
      <StatPair name="Website" value={props.stats.website} />
      <StatPair name="Server" value={props.stats.server} />
      <StatPair name="VSCode ext." value={props.stats.vscode} />
    </div>
  );
}

export default function Home() {
  const router = useRouter();
  const win = useWindowSize();
  let [compilerStats, setCompilerStats] = useState<ITimeStats | null>(null);
  useEffect(() => {
    fetch("/api/workStats", { next: { revalidate: 7200 } })
      .then(async (resp) => {
        if (resp.status == 200) {
          setCompilerStats(await resp.json());
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className={styles.frontPageContent}>
      <div
        className={styles.frontCarousel}
        style={{ flexDirection: win.isVertical() ? "column" : "row" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: win.isVertical() ? "row" : "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            src={lavaCapsule}
            style={{
              height: win.isVertical() ? "40vmin" : "45vmin",
              width: win.isVertical() ? "40vmin" : "35vmin",
            }}
            className={styles.lavaCover}
            alt="lava-cover"
          />
          <OnlyIf If={win.isVertical()}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Catchphrase />
              <LangDescription />
            </div>
          </OnlyIf>
        </div>
        <div className={styles.phraseBlock}>
          <OnlyIf If={win.isHorizontal()}>
            <Catchphrase />
            <LangDescription />
          </OnlyIf>
          <div
            className={joinNames([styles.prompts, fonts.jetbrainsMono.bold])}
            style={{
              paddingLeft: valueIf(win.isVertical(), "3vmin"),
            }}
          >
            <Button
              onClick={() => {
                router.push("/downloads");
              }}
            >
              Download
            </Button>
            <Button
              onClick={() => {
                router.push("/playground");
              }}
            >
              Try Online
            </Button>
            <Button
              className={styles.sponsorIcon}
              onClick={() => {
                router.push("/playground");
              }}
            >
              <svg
                className={styles.sponsorIconImage}
                width="3vmin"
                height="3vmin"
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
              Donate
            </Button>
          </div>
          <div
            className={styles.socialIcons}
            style={{ paddingLeft: valueIf(win.isVertical(), "4vmin") }}
          >
            <div
              className={styles.socialIcon}
              style={{
                backgroundColor: "#333333",
                borderRadius: win.isVertical() ? "2.7vmin" : "1.5vmin",
                height: win.isVertical() ? "10vmin" : "6vmin",
                width: win.isVertical() ? "10vmin" : "6vmin",
              }}
            >
              <a
                href="https://github.com/qatlang"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Image
                  height={win.isVertical() ? 30 : 35}
                  width={win.isVertical() ? 30 : 35}
                  src={githubIcon}
                  alt="github-icon"
                />
              </a>
            </div>
            <div
              className={styles.socialIcon}
              style={{
                backgroundColor: "#5865f2",
                borderRadius: win.isVertical() ? "2.7vmin" : "1.5vmin",
                height: win.isVertical() ? "10vmin" : "6vmin",
                width: win.isVertical() ? "10vmin" : "6vmin",
              }}
            >
              <a
                href="https://discord.gg/CNW3Uvptvd"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Image
                  height={win.isVertical() ? 30 : 35}
                  width={win.isVertical() ? 30 : 35}
                  src={discordIcon}
                  alt="discord-icon"
                />
              </a>
            </div>
            <div
              className={styles.socialIcon}
              style={{
                backgroundColor: "#333333",
                borderRadius: win.isVertical() ? "2.7vmin" : "1.5vmin",
                height: win.isVertical() ? "10vmin" : "6vmin",
                width: win.isVertical() ? "10vmin" : "6vmin",
              }}
            >
              <a
                href="https://youtube.com/c/aldrinmathew"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Image
                  width={win.isVertical() ? 30 : 35}
                  src={youtubeIcon}
                  alt="discord-icon"
                />
              </a>
            </div>
          </div>
        </div>
        <div
          className={styles.examplesBlock}
          style={
            win.isVertical()
              ? {
                  marginTop: "2vmin",
                  width: "100%",
                  padding: "2vmin",
                }
              : undefined
          }
        >
          <Examples />
        </div>
      </div>
      <div className={styles.sponsorBlock}>
        <div
          className={joinNames([
            styles.sponsorHeader,
            fonts.jetbrainsMono.bold,
          ])}
        >
          <OnlyIf If={compilerStats != null}>
            <ProjectTimings stats={compilerStats!} />
          </OnlyIf>
        </div>
        <div className={styles.sponsorContent}></div>
      </div>
      <div className={styles.secondSection}>
        <div className={styles.featuresBlock}>
          <p
            className={joinNames([
              styles.featuresTitle,
              fonts.jetbrainsMono.bold,
            ])}
          >
            Overview
          </p>
          <div className={styles.featuresContent}>
            <ReactMarkdown
              className={joinNames([styles.markdown, fonts.roboto.normal])}
              // eslint-disable-next-line react/no-children-prop
              children={features}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Examples() {
  let [active, setActive] = useState(0);
  const size = useWindowSize();
  return (
    <>
      {
        <div
          className={joinNames([styles.example, fonts.jetbrainsMono.normal])}
        >
          <div className={styles.exampleHeader}>
            <p
              className={joinNames([
                styles.examplesTitle,
                fonts.jetbrainsMono.bold,
              ])}
              style={{ fontSize: size.isVertical() ? "3.5vmin" : undefined }}
            >
              Examples
            </p>
            <Select
              className={styles.exampleSelections}
              options={examples.flatMap((ex, i) => {
                return {
                  value: i,
                  label: ex.title,
                };
              })}
              defaultValue={{ value: 0, label: examples[0].title }}
              onChange={(val) => {
                if (val) {
                  setActive(val.value);
                }
              }}
              styles={{
                menuList: (styles, state) => {
                  return {
                    ...styles,
                    borderRadius: "5px",
                    fontSize: size.isVertical()
                      ? "calc(3.5vmin)"
                      : "calc(1.5vmin)",
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
                spacing: {
                  baseUnit: 2,
                  controlHeight: 0,
                  menuGutter: 0,
                },
              }}
            />
          </div>
          <div
            className={styles.exampleContent}
            style={{ fontSize: size.isVertical() ? "3.3vmin" : undefined }}
          >
            {examples[active].content.split("\n").map((elem, i) => (
              <div
                className={styles.codeLineRow}
                key={"codeLineRow." + i.toString()}
              >
                <div className={styles.codeLineNumber}>
                  {(i + 1).toString()}
                </div>
                <div className={styles.codeLine}>{elem}</div>
              </div>
            ))}
          </div>
        </div>
      }
    </>
  );
}

