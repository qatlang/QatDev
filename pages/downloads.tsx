import { useState } from "react";
import { ILanguageRelease } from "../models/interfaces";
import WindowsIcon from "public/windows_icon.png";
import LinuxIcon from "public/linux_icon.png";
import Image from "next/image";
// import Select from "react-select";
import { Env } from "../models/env";
import Markdown from "../components/Markdown";
import Button from "../components/Button";

function getIconFromPlatform(platform: string): any {
  if (platform === "windows") {
    return WindowsIcon;
  } else {
    return LinuxIcon;
  }
}

export async function getServerSideProps() {
  const res = await fetch(Env.serverUrl() + "/releases", {
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
  let [areDownloadsVisible, setDownloadsVisible] = useState(false);
  return (
    <div className={"text-[#eeeeee] mx-10 mb-10"}>
      {releases.length > 0 ? (
        <div className="flex flex-col h-[89vh]">
          <div className="mb-3 flex flex-row h-fit w-fit align-middle justify-center">
            <div className="ml-2 font-mono font-bold text-5xl self-center">
              {(releases[selection].version.value.startsWith("v") ? "" : "v") +
                releases[selection].version.value}
            </div>
            {releases[selection].version.isPrerelease ? (
              <div
                className="self-center font-mono font-bold rounded-lg h-fit ml-4 mr-6 px-2 py-1 border border-[#ffffff55]"
                style={{
                  backgroundColor:
                    releases[selection].version.prerelease === "alpha"
                      ? "red"
                      : releases[selection].version.prerelease === "beta"
                      ? "blueviolet"
                      : "green",
                }}
              >
                {releases[selection].version.prerelease}
              </div>
            ) : (
              <></>
            )}
            <Button
              style="h-fit font-mono"
              onClick={() => {
                setDownloadsVisible(true);
              }}
            >
              Download
            </Button>
          </div>
          <div className="ml-2 font-mono font-bold text-3xl mb-2 text-left">
            {releases[selection].title}
          </div>
          {areDownloadsVisible && (
            <div
              className="flex flex-col align-middle justify-center h-[100vh] w-[100vw] bg-[#000000cc] z-50 fixed left-0 top-0"
              onClick={() => setDownloadsVisible(false)}
            >
              <div className="max-h-[50vh] min-h-[10rem] overflow-y-auto p-5 rounded-2xl bg-black w-fit self-center border-2 border-solid border-[#555555]">
                {releases[selection].files.flatMap((artefact, i) => {
                  return (
                    <div
                      key={"downloadButton." + i.toString()}
                      className="self-center w-[30rem] mb-5 px-4 py-2 transition-colors select-none flex flex-row bg-[#128f5f] rounded-xl align-middle justify-start cursor-pointer hover:bg-white hover:text-black active:bg-gray-400"
                      onClick={() => {
                        fetch("/api/downloadedRelease", {
                          method: "POST",
                          mode: "cors",
                          body: JSON.stringify({
                            releaseID: releases[selection].releaseID,
                            confirmationKey: Env.confirmationKey(),
                            platformID: artefact.id,
                          }),
                          cache: "no-cache",
                        }).catch((e) => {
                          console.error(
                            "Error while incrementing download count",
                            e
                          );
                        });
                        window.open(artefact.path, "_blank");
                      }}
                    >
                      <div className="flex flex-row">
                        <Image
                          className="h-14 w-12 mr-4 self-center"
                          src={getIconFromPlatform(artefact.platform)}
                          alt="downloadPlatformIcon"
                        />
                        <div className="flex flex-col align-top justify-start text-left">
                          <div className="mb-2 uppercase font-mono font-bold text-2xl">
                            {artefact.platform}
                          </div>
                          <p className="mb-2">
                            Architecture:{" "}
                            <i className="font-mono font-bold bg-[#00000033] py-1 px-2 rounded-lg">
                              {artefact.architecture}
                            </i>
                          </p>
                          <p>
                            Target:{" "}
                            <i className="font-mono font-bold bg-[#00000033] py-1 px-2 rounded-lg">
                              {artefact.target}
                            </i>
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          <Markdown
            className="mt-4 py-5 px-10 text-left overflow-y-auto rounded-3xl bg-black h-max border-2 border-solid border-[#333333]"
            // eslint-disable-next-line react/no-children-prop
            children={releases[selection].content}
          />
        </div>
      ) : (
        <div>No releases available</div>
      )}
    </div>
  );
}

