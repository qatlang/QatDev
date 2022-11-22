import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { ILanguageRelease } from "../models/interfaces";
import styles from "styles/Downloads.module.css";
import WindowsIcon from "public/windows_icon.png";
import LinuxIcon from "public/linux_icon.png";
import Image from "next/image";

function getIconFromPlatform(platform: string): any {
  if (platform === "windows") {
    return WindowsIcon;
  } else {
    return LinuxIcon;
  }
}

export default async function Downloads() {
  let [releases, setReleases] = useState<ILanguageRelease[]>([]);
  useEffect(() => {
    async function getReleases() {
      const res = await fetch("http://localhost:5000/releases", {
        method: "GET",
        mode: "cors",
        next: { revalidate: 30 },
      });
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
    }
    getReleases();
  });
  let [selection, setSelection] = useState(0);
  return (
    <div className={styles.downloads}>
      <div className={styles.selectReleaseBox}>
        <div
          className={styles.releaseSelectButton}
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
          className={styles.releaseSelectButton}
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
        <div className={styles.releaseCard}>
          <div className={styles.firstColumn}>
            <div className={styles.releaseVersionInfo}>
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
            <div className={styles.downloadButtons}>
              {releases[selection].files.flatMap((artefact) => {
                return (
                  <div
                    className={styles.downloadButton}
                    onClick={() => {
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
          <div className={styles.secondColumn}>
            <div className={styles.releaseTitle}>
              {releases[selection].title}
            </div>
            <ReactMarkdown
              className={styles.releaseContent}
              // eslint-disable-next-line react/no-children-prop
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

