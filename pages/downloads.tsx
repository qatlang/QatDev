import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { ILanguageRelease } from "../models/interfaces";
import styles from "styles/Downloads.module.css";
import WindowsIcon from "public/windows_icon.png";
import LinuxIcon from "public/linux_icon.png";
import Image from "next/image";
import fonts, { FontList } from "../utils/fonts";
import joinNames from "../utils/joinNames";
import Select from "react-select";
import useWindowSize from "../utils/WindowSize";

function getIconFromPlatform(platform: string): any {
  if (platform === "windows") {
    return WindowsIcon;
  } else {
    return LinuxIcon;
  }
}

export async function getServerSideProps() {
  const res = await fetch(process.env["NEXT_PUBLIC_SERVER_URL"] + "/releases", {
    method: "GET",
    mode: "cors",
    next: { revalidate: 180 },
  });
  let jsRes = (await res.json()) as
    | { releases: ILanguageRelease[] }
    | undefined;
  if (jsRes) {
    return {
      props: {
        releases: jsRes.releases.sort(
          (a: ILanguageRelease, b: ILanguageRelease) => {
            return b.index - a.index;
          }
        ),
      },
    };
  } else {
    return { props: { releases: [] } };
  }
}

export default function Downloads(props: { releases: ILanguageRelease[] }) {
  const releases = props.releases ?? [];
  let [selection, setSelection] = useState(0);
  let [downloadSelection, setDownloadSelection] = useState(0);
  const updateVersionSelection = (val: number) => {
    if (downloadSelection >= releases[val].files.length) {
      setDownloadSelection(0);
    }
    setSelection(val);
  };
  const size = useWindowSize();
  return (
    <div className={styles.downloads}>
      {releases.length > 0 ? (
        <div className={styles.releaseCard}>
          <div className={styles.firstColumn}>
            <div className={styles.releaseSwitcher}>
              <div
                className={joinNames([
                  styles.nextVersion,
                  fonts.jetbrainsMono.bold,
                ])}
                style={{
                  backgroundColor: selection > 0 ? "#128f5f" : "#333333",
                  color: selection > 0 ? "#ffffff" : "#777777",
                  cursor: selection > 0 ? "pointer" : "auto",
                }}
                onClick={() => {
                  if (selection > 0) {
                    updateVersionSelection(selection - 1);
                  }
                }}
              >
                ++
              </div>
              <div
                className={styles.releaseVersionInfo}
                style={{
                  background:
                    selection == 0
                      ? `linear-gradient(to bottom right,rgb(0, 50, 255),rgb(255, 0, 80))`
                      : "#444444",
                }}
              >
                <div className={styles.releaseVersion}>
                  {releases[selection].version.value}
                </div>
                {releases[selection].version.isPrerelease ? (
                  <div className={styles.releasePrerelease}>
                    {" " + releases[selection].version.prerelease}
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <div
                className={joinNames([
                  styles.previousVersion,
                  fonts.jetbrainsMono.bold,
                ])}
                style={{
                  backgroundColor:
                    selection < releases.length - 1 ? "#128f5f" : "#333333",
                  color:
                    selection < releases.length - 1 ? "#ffffff" : "#777777",
                  cursor: selection < releases.length - 1 ? "pointer" : "auto",
                }}
                onClick={() => {
                  if (selection < releases.length - 1) {
                    updateVersionSelection(selection + 1);
                  }
                }}
              >
                --
              </div>
            </div>
            <Select
              className={joinNames([
                styles.downloadSelections,
                fonts.jetbrainsMono.normal,
              ])}
              options={releases[selection].files.flatMap((ex, i) => {
                return {
                  value: i,
                  label: ex.platform + " " + ex.architecture,
                };
              })}
              defaultValue={{
                value: 0,
                label: [
                  releases[selection].files[0].platform,
                  releases[selection].files[0].architecture,
                ].join(" "),
              }}
              onChange={(val) => {
                if (val) {
                  setDownloadSelection(val.value);
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
                menu: (styles, state) => {
                  return {
                    ...styles,
                    borderRadius: "10px",
                  };
                },
                option: (styles, state) => {
                  return {
                    ...styles,
                    color: "white",
                    fontFamily: FontList.jetbrainsMono,
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
            <div
              className={joinNames([
                styles.releaseTitle,
                fonts.jetbrainsMono.bold,
              ])}
            >
              {releases[selection].title}
            </div>
            <ReactMarkdown
              className={joinNames([
                styles.releaseContent,
                fonts.roboto.normal,
              ])}
              // eslint-disable-next-line react/no-children-prop
              children={releases[selection].content}
            />
          </div>
          <div className={styles.secondColumn}>
            <div className={styles.downloadButtons}>
              {releases[selection].files.flatMap((artefact, i) => {
                return (
                  <div
                    key={"downloadButton." + i.toString()}
                    className={styles.downloadButton}
                    onClick={() => {
                      console.log("Downloading platform: ", artefact.platform);
                      fetch("/api/downloadedRelease", {
                        method: "POST",
                        mode: "cors",
                        body: JSON.stringify({
                          releaseID: releases[selection].releaseID,
                          confirmationKey:
                            process.env["NEXT_PUBLIC_CONFIRMATION_KEY"],
                          platformID: artefact.id,
                        }),
                        cache: "no-cache",
                      }).catch((e) => {
                        console.log(
                          "Error while incrementing download count",
                          e
                        );
                      });
                      window.open(artefact.path, "_blank");
                    }}
                  >
                    <div className={styles.platformIcon}>
                      <Image
                        height={25}
                        src={getIconFromPlatform(artefact.platform)}
                        alt="downloadPlatformIcon"
                      />
                    </div>
                    <div className={styles.downloadInfo}>
                      <div className={styles.downloadPlatform}>
                        {artefact.platform}
                      </div>
                      <div className={styles.downloadArch}>
                        {artefact.architecture}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div>No releases available</div>
      )}
    </div>
  );
}

