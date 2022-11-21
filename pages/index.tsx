import lavaCapsule from "../public/lava_capsule.png";
import discordIcon from "../public/discord.png";
import githubIcon from "../public/github.png";
import youtubeIcon from "../public/youtube.png";
import aldrinImg from "../public/aldrin.jpeg";
import Button from "../components/button";
import styles from "styles/Home.module.css";
import { examples, features } from "../models/data";
import { useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Select from "react-select";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  return (
    <div className={styles.frontPageContent}>
      <div className={styles.frontCarousel}>
        <Image
          src={lavaCapsule}
          className={styles.lavaCover}
          alt="lava-cover"
        />
        <div className={styles.phraseBlock}>
          <div className={styles.catchPhrase}>
            {"Closer to your machine's heart 🦾"}
          </div>
          <div className={styles.description}>
            {
              "Superfast modern systems language for efficient & maintainable software..."
            }
          </div>
          <div className={styles.prompts}>
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
          <div className={styles.socialIcons}>
            <div className={styles.githubIcon}>
              <a
                href="https://github.com/qatlang"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Image
                  height={40}
                  width={40}
                  src={githubIcon}
                  alt="github-icon"
                />
              </a>
            </div>
            <div className={styles.discordIcon}>
              <a
                href="https://discord.gg/CNW3Uvptvd"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Image
                  height={40}
                  width={40}
                  src={discordIcon}
                  alt="discord-icon"
                />
              </a>
            </div>
            <div className={styles.youtubeIcon}>
              <a
                href="https://youtube.com/c/aldrinmathew"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Image width={40} src={youtubeIcon} alt="discord-icon" />
              </a>
            </div>
          </div>
        </div>
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
      </div>
      <div className={styles.secondSection}>
        <div className={styles.featuresBlock}>
          <p className={styles.featuresTitle}>Key Features</p>
          <div className={styles.featuresContent}>
            {/* eslint-disable-next-line react/no-children-prop*/}
            <ReactMarkdown children={features} />
          </div>
        </div>
        <div className={styles.examplesBlock}>
          <p className={styles.examplesTitle}>Examples</p>
          <Examples />
        </div>
      </div>
    </div>
  );
}

function Examples() {
  let [active, setActive] = useState(0);
  return (
    <>
      {
        <div className={styles.example}>
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
          <div className={styles.exampleContent}>
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

