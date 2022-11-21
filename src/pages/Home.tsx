import lavaCapsule from "../media/lava_capsule.png";
import discordIcon from "../media/discord.png";
import githubIcon from "../media/github.png";
import youtubeIcon from "../media/youtube.png";
import aldrinImg from "../media/aldrin.jpeg";
import Button from "../components/Button";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { examples, features } from "../models/data";
import { useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Select from "react-select";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="frontPageContent">
      <div className="frontCarousel">
        <img src={lavaCapsule} className="lavaCover" alt="lava-cover" />
        <div className="phraseBlock">
          <div className="catchPhrase">Closer to your machine's heart 🦾</div>
          <div className="description">
            Superfast modern systems language for efficient & maintainable
            software...
          </div>
          <div className="prompts">
            <Button
              content="Download"
              onClick={() => {
                navigate("/downloads");
              }}
            />
            <Button
              content="Try it Online"
              onClick={() => {
                navigate("/playground");
              }}
            />
          </div>
          <div className="socialIcons">
            <div className="githubIcon">
              <a
                href="https://github.com/qatlang"
                rel="noopener noreferrer"
                target="_blank"
              >
                <img
                  height={40}
                  width={40}
                  src={githubIcon}
                  alt="github-icon"
                />
              </a>
            </div>
            <div className="discordIcon">
              <a
                href="https://discord.gg/CNW3Uvptvd"
                rel="noopener noreferrer"
                target="_blank"
              >
                <img
                  height={40}
                  width={40}
                  src={discordIcon}
                  alt="discord-icon"
                />
              </a>
            </div>
            <div className="youtubeIcon">
              <a
                href="https://youtube.com/c/aldrinmathew"
                rel="noopener noreferrer"
                target="_blank"
              >
                <img width={40} src={youtubeIcon} alt="discord-icon" />
              </a>
            </div>
          </div>
        </div>
        <div className="sponsorPrompt">
          <a
            className="githubProfileLink"
            href="https://github.com/aldrinmathew"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="aldrinImage" src={aldrinImg} alt="aldrin" />
          </a>
          <a
            className="sponsorButtonLink"
            href="https://github.com/sponsors/aldrinmathew"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="sponsorButton">💛 Sponsor</div>
          </a>
          <a
            className="kofiButtonLink"
            href="https://ko-fi.com/aldrinmathew"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="kofiButton">☕ Ko-Fi</div>
          </a>
          <a
            className="paypalButtonLink"
            href="https://paypal.me/aldrinsartfactory"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="paypalButton">💵 PayPal</div>
          </a>
        </div>
      </div>
      <div className="secondSection">
        <div className="featuresBlock">
          <p className="featuresTitle">Key Features</p>
          <div className="featuresContent">
            <ReactMarkdown children={features} />
          </div>
        </div>
        <div className="examplesBlock">
          <p className="examplesTitle">Examples</p>
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
        <div className="example">
          <Select
            className="exampleSelections"
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
          <div className="exampleContent">
            {examples[active].content.split("\n").map((elem) => (
              <p className="codeLine">{elem}</p>
            ))}
          </div>
        </div>
      }
    </>
  );
}

