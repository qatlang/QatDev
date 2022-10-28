import lavaCapsule from "../media/lava_capsule.png";
import discordIcon from "../media/discord.png";
import githubIcon from "../media/github.png";
import youtubeIcon from "../media/youtube.png";
import Button from "../components/Button";
import "./Home.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="frontPageContent">
      <div className="frontCarousel">
        <img src={lavaCapsule} className="lavaCover" alt="lava-cover" />
        <div className="phraseBlock">
          <div className="catchPhrase">Closer to your machine's heart 🦾</div>
          <div className="description">
            Super-fast modern systems language for efficient & maintainable
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
      </div>
    </div>
  );
}

