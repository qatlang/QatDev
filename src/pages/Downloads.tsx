import { useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { ILanguageRelease } from "../models/interfaces";
import "./Downloads.css";
import WindowsIcon from "../media/windows_icon.png";
import LinuxIcon from "../media/linux_icon.png";

function getIconFromPlatform(platform: string): string {
  if (platform === "windows") {
    return WindowsIcon;
  } else {
    return LinuxIcon;
  }
}

export default function Downloads() {
  let [releases, setReleases] = useState<ILanguageRelease[]>([]);
  if (releases.length === 0) {
    fetch("http://localhost:5000/releases", {
      method: "GET",
      mode: "cors",
    }).then(async (res) => {
      let jsRes = (await res.json()) as
        | { releases: ILanguageRelease[] }
        | undefined;
      if (jsRes) {
        setReleases(
          jsRes.releases.sort((a: ILanguageRelease, b: ILanguageRelease) => {
            return b.index - a.index;
          })
        );
      }
    });
  }
  let [selection, setSelection] = useState(0);
  return (
    <div className="downloads">
      <div className="selectReleaseBox">
        <div
          className="releaseSelectButton"
          style={{
            color: selection > 0 ? "#ffffff" : "#777777ff",
          }}
          onClick={() => {
            if (selection > 0) {
              setSelection(selection - 1);
            }
          }}
        >
          Next
        </div>
        <div
          className="releaseSelectButton"
          style={{
            color: selection < releases.length - 1 ? "#ffffff" : "#777777ff",
          }}
          onClick={() => {
            if (selection < releases.length - 1) {
              setSelection(selection + 1);
            }
          }}
        >
          Previous
        </div>
      </div>
      {releases.length > 0 ? (
        <div className="releaseCard">
          <div className="firstColumn">
            <div className="releaseVersionInfo">
              <div className="releaseVersion">
                {releases[selection].version.value}
              </div>
              {releases[selection].version.isPrerelease ? (
                <div className="releasePrerelease">
                  {" " + releases[selection].version.prerelease}
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className="downloadButtons">
              {releases[selection].files.flatMap((artefact) => {
                return (
                  <div
                    className="downloadButton"
                    onClick={() => {
                      window.open(artefact.path, "_blank");
                    }}
                  >
                    <div className="platformIcon">
                      <img
                        height={25}
                        src={getIconFromPlatform(artefact.platform)}
                        alt="downloadPlatformIcon"
                      />
                    </div>
                    <div className="downloadInfo">
                      <div className="downloadPlatform">
                        {artefact.platform}
                      </div>
                      <div className="downloadArch">
                        {artefact.architecture}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="secondColumn">
            <div className="releaseTitle">{releases[selection].title}</div>
            <ReactMarkdown
              className="releaseContent"
              children={releases[selection].content}
            />
          </div>
        </div>
      ) : (
        <div>No releases available</div>
      )}
    </div>
  );
}

