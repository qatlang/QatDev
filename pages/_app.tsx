import "../styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";
import { useRouter } from "next/router";
import useWindowSize from "../utils/WindowSize";
import { useState } from "react";

function QatIcon() {
  const win = useWindowSize();
  return (
    <svg
      className="ml-6 mr-3 h-11 w-11"
      viewBox="0 0 315 315"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_i_606_3)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M0 0H129.193L157.5 20.9033L185.807 0H315V128.993L295.118 157.5L315 186.007V315H186.007L157.5 295.118L128.993 315H0V185.606L20.9033 157.299L0 128.993V0Z"
          fill="#CCCCCC"
        />
      </g>
      <g filter="url(#filter1_d_606_3)">
        <path
          d="M40.5145 40.5145H99.0073H128.254L157.5 62.1118L186.746 40.5145H215.993H274.486V99.0072V128.254L254.088 157.5L274.486 186.746V215.993V274.486H215.993H186.746L157.5 254.088L128.254 274.486H99.0073H40.5145V215.993V186.746L62.1119 157.5L40.5145 128.254V99.0072V40.5145Z"
          fill="#FAFAFA"
        />
      </g>
      <path
        d="M131.719 87.4504H179.37L235.685 229.32H191.283H155.003H118.724H74.3218L131.719 87.4504Z"
        fill="#555555"
      />
      <path
        d="M155.177 126.347L182.654 196.385H127.701L155.177 126.347Z"
        fill="#FAFAFA"
      />
      <defs>
        <filter
          id="filter0_i_606_3"
          x="0"
          y="0"
          width="315"
          height="315"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="10" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_606_3"
          />
        </filter>
        <filter
          id="filter1_d_606_3"
          x="20.5145"
          y="20.5145"
          width="273.971"
          height="273.971"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="10" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_606_3"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_606_3"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}

function QatNamedIcon() {
  return (
    <svg
      className="h-11 w-28"
      viewBox="0 0 548 198"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M190.577 148.322C188.352 146.096 187.851 142.696 189.15 139.83C194.791 127.381 197.932 113.557 197.932 99C197.932 44.3238 153.623 0 98.9659 0C44.3085 0 0 44.3238 0 99C0 153.676 44.3085 198 98.9659 198C113.887 198 128.036 194.697 140.724 188.782C144.792 186.885 149.67 187.507 152.843 190.681L157.215 195.055C159.09 196.931 161.634 197.985 164.287 197.985H181.309C181.313 197.985 181.316 197.989 181.314 197.993C181.313 197.996 181.315 198 181.319 198H391.713C398.776 198 403.613 190.877 401.008 184.312L354.894 68.1005C352.289 61.5356 357.127 54.4122 364.189 54.4122H411.901C417.424 54.4122 421.901 58.8894 421.901 64.4122V188C421.901 193.523 426.378 198 431.901 198H466.294C471.817 198 476.294 193.523 476.294 188V64.4122C476.294 58.8893 480.771 54.4122 486.294 54.4122H523.049C527.047 54.4122 530.661 52.031 532.238 48.3574L547.013 13.9452C549.846 7.34576 545.006 0 537.824 0H268.133C264.058 0 260.39 2.4728 258.863 6.25063L202.372 145.925C200.434 150.718 194.232 151.978 190.577 148.322ZM102.272 140.093C105.855 143.677 104.034 149.633 98.9659 149.633C71.0114 149.633 48.3498 126.964 48.3498 98.9999C48.3498 71.0358 71.0114 48.3664 98.9659 48.3664C126.92 48.3664 149.582 71.0358 149.582 98.9999C149.582 102.217 145.787 103.517 143.513 101.241L140.547 98.2751C139.413 97.1403 137.874 96.5027 136.27 96.5027H82.8327C73.9245 96.5027 69.4624 107.272 75.7604 113.573L102.272 140.093ZM317.789 152.035C324.835 152.035 329.671 144.943 327.099 138.384L303.428 78.0245C300.108 69.5591 288.129 69.5591 284.809 78.0245L261.138 138.384C258.565 144.943 263.402 152.035 270.447 152.035H317.789Z"
        fill="url(#paint0_linear_1819_4)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_1819_4"
          x1="8.5"
          y1="9.5"
          x2="553"
          y2="260"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#4F60FF" />
          <stop offset="1" stop-color="#FF1B6D" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function NavItem(props: {
  name: string;
  link: string;
  isActive: boolean;
  openInNewTab?: boolean;
}) {
  return (
    <Link
      className={
        props.isActive
          ? "mx-2 text-[1.4rem] bg-white text-black font-mono font-bold tracking-wider p-2 rounded-xl transition-all"
          : "mx-2 text-[1.4rem] bg-transparent text-green hover:text-white font-mono font-bold tracking-wider p-2 rounded-xl transition-all"
      }
      target={props.openInNewTab ? "_blank" : undefined}
      href={props.link}
    >
      {props.name}
    </Link>
  );
}

export default function App({ Component, pageProps }: AppProps) {
  let router = useRouter();
  const navPaths = [
    { name: "HOME", route: "/", out: false },
    { name: "PLAYGROUND", route: "/playground", out: false },
    { name: "DOWNLOADS", route: "/downloads", out: false },
    { name: "DOCS", route: "https://docs.qat.dev", out: true },
  ];
  //   const [isSystemDark, setIsSystemDark] = useState<boolean>(false);
  //   const [darkMode, setDarkMode] = useState<"dark" | "light" | "system">(
  //     "light"
  //   );
  //   useEffect(() => {
  //     const colSch = localStorage.getItem("color-scheme");
  //     if (colSch) {
  //       setDarkMode(colSch as typeof darkMode);
  //     }
  //   }, []);
  //   useEffect(() => {
  //     if (darkMode === "dark") {
  //       if (!document.documentElement.classList.contains("dark")) {
  //         document.documentElement.classList.add("dark");
  //         localStorage.setItem("color-scheme", "dark");
  //       }
  //     } else if (darkMode === "light") {
  //       if (document.documentElement.classList.contains("dark")) {
  //         document.documentElement.classList.remove("dark");
  //         localStorage.setItem("color-scheme", "light");
  //       }
  //     } else {
  //       localStorage.setItem("color-scheme", "system");
  //       if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  //         setIsSystemDark(true);
  //         if (!document.documentElement.classList.contains("dark")) {
  //           document.documentElement.classList.add("dark");
  //         }
  //       } else {
  //         setIsSystemDark(false);
  //         if (document.documentElement.classList.contains("dark")) {
  //           document.documentElement.classList.remove("dark");
  //         }
  //       }
  //     }
  //   }, [darkMode]);
  let [isSmallMenuExpanded, setSmallMenuExpand] = useState<boolean>(false);
  return (
    <div
      className="text-center min-h-[100vh] min-w-[97vw] text-white"
      style={{
        backgroundImage: "radial-gradient(ellipse at top, #282828, #000000)",
      }}
    >
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://qat.dev/" />
      <meta property="og:title" content="Qat Programming Language" />
      <meta
        property="og:description"
        content="Superfast modern systems language for efficient & maintainable software..."
      />
      <meta
        property="og:image"
        content="https://raw.githubusercontent.com/qatlang/media/main/images/qat_cover_1200x671.png"
      />
      <header className="max-h-[10vh] py-10 flex flex-row items-center justify-between">
        <Link href="/">
          <div className="flex flex-row align-middle">
            <QatIcon />
            <QatNamedIcon />
          </div>
        </Link>
        <div
          className="visible md:hidden relative"
          onClick={() => {
            setSmallMenuExpand(!isSmallMenuExpanded);
          }}
        >
          <svg
            className="h-11 w-11 mr-4 fill-styleGreen transition-all"
            viewBox="0 0 24 24"
            style={{
              rotate: isSmallMenuExpanded ? "135deg" : "0deg",
              fill: isSmallMenuExpanded ? "rgb(18, 143, 95)" : "white",
            }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM16 12.75H12.75V16C12.75 16.41 12.41 16.75 12 16.75C11.59 16.75 11.25 16.41 11.25 16V12.75H8C7.59 12.75 7.25 12.41 7.25 12C7.25 11.59 7.59 11.25 8 11.25H11.25V8C11.25 7.59 11.59 7.25 12 7.25C12.41 7.25 12.75 7.59 12.75 8V11.25H16C16.41 11.25 16.75 11.59 16.75 12C16.75 12.41 16.41 12.75 16 12.75Z" />
          </svg>
          {isSmallMenuExpanded && (
            <div className="flex flex-col z-[100] absolute rounded-lg bg-[#333333] w-fit py-1 px-3 right-7 top-9">
              {navPaths.flatMap((navItem, i) => {
                return (
                  <Link
                    href={navItem.route}
                    target={navItem.out ? "_blank" : undefined}
                    className="my-2 rounded-lg font-mono text-base py-2 px-6 tracking-wider"
                    style={{
                      backgroundColor:
                        router.asPath === navItem.route
                          ? "rgb(18, 143, 95)"
                          : "#white",
                    }}
                  >
                    {navItem.name}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
        <nav className="hidden md:visible md:flex md:flex-row">
          <NavItem name="HOME" link="/" isActive={router.asPath === "/"} />
          <NavItem
            name="PLAYGROUND"
            link="/playground"
            isActive={router.asPath.includes("/playground")}
          />
          <NavItem
            name="DOWNLOADS"
            link="/downloads"
            isActive={router.asPath.includes("/downloads")}
          />
          <NavItem
            name="DOCS"
            link="https://docs.qat.dev"
            openInNewTab={true}
            isActive={false}
          />
        </nav>
      </header>
      <Component {...pageProps} />
    </div>
  );
}

