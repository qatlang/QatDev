import lavaCapsule from "../public/lava_capsule.png";
import discordIcon from "../public/discord.png";
import githubIcon from "../public/github.png";
import youtubeIcon from "../public/youtube.png";
import aldrinImg from "../public/aldrin.jpeg";
import Button from "../utils/Button";
import styles from "styles/Home.module.css";
import { examples, features } from "../models/data";
import { useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Select from "react-select";
import Image from "next/image";
import { useRouter } from "next/router";
import useWindowSize from "../utils/WindowSize";
import OnlyIf, { valueIf } from "../utils/OnlyIf";
import joinNames from "../utils/joinNames";
import fonts from "../utils/fonts";

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
      className={joinNames([styles.description, fonts.firaCode.normal])}
      style={{ fontSize: valueIf(win.isVertical(), "3.5vmin") }}
    >
      {
        "Superfast modern systems language for efficient & maintainable software..."
      }
    </div>
  );
}

export default function Home() {
  const router = useRouter();
  const win = useWindowSize();
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
            className={joinNames([styles.prompts, fonts.firaCode.bold])}
            style={{
              paddingLeft: valueIf(win.isVertical(), "3vmin"),
            }}
          >
            <Button
              content="Download"
              onClick={() => {
                router.push("/downloads");
              }}
            />
            <Button
              content="Try it Online"
              onClick={() => {
                router.push("/playground");
              }}
            />
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
      {/* <div className={styles.sponsorBlock} style={{}}>
        <div className={joinNames([styles.sponsorHeader, fonts.firaCode.bold])}>
          <div className={styles.sponsorIcon}>💛</div>
          Sponsor the project
        </div>
        <div className={styles.sponsorContent}></div>
      </div> */}
      <div className={styles.secondSection}>
        <div className={styles.sponsorPrompt}>
          <a
            className={styles.githubProfileLink}
            href="https://github.com/aldrinmathew"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className={styles.aldrinImage}
              src={aldrinImg}
              alt="aldrin"
            />
          </a>
          <a
            className={styles.sponsorButtonLink}
            href="https://github.com/sponsors/aldrinmathew"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className={styles.sponsorButton}>💛 Sponsor</div>
          </a>
          <a
            className={styles.kofiButtonLink}
            href="https://ko-fi.com/aldrinmathew"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className={styles.kofiButton}>☕ Ko-Fi</div>
          </a>
          <a
            className={styles.paypalButtonLink}
            href="https://paypal.me/aldrinsartfactory"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className={styles.paypalButton}>💵 PayPal</div>
          </a>
        </div>
        <div className={styles.featuresBlock}>
          <p className={joinNames([styles.featuresTitle, fonts.firaCode.bold])}>
            Key Features
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
        <div className={joinNames([styles.example, fonts.firaCode.normal])}>
          <div className={styles.exampleHeader}>
            <p
              className={joinNames([styles.examplesTitle, fonts.firaCode.bold])}
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
              defaultValue={{ value: 0, label: "String Datatype" }}
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
              <p className={styles.codeLine} key={"codeLine." + i.toString()}>
                {elem}
              </p>
            ))}
          </div>
        </div>
      }
    </>
  );
}

