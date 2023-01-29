import "../styles/globals.css";
import type { AppProps } from "next/app";
import styles from "styles/App.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import useWindowSize from "../utils/WindowSize";
import { valueIf } from "../utils/OnlyIf";
import joinNames from "../utils/joinNames";
import fonts from "../utils/fonts";

export default function App({ Component, pageProps }: AppProps) {
  let router = useRouter();
  const win = useWindowSize();
  return (
    <div className={styles.App}>
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
      <header className={styles.appHeader}>
        <Link href="/">
          <div className={styles.branding}>
            <svg
              className={styles.qatIcon}
              width={win.isVertical() ? "30" : "35"}
              height={win.isVertical() ? "30" : "35"}
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
                  <feComposite
                    in2="hardAlpha"
                    operator="arithmetic"
                    k2="-1"
                    k3="1"
                  />
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
            <svg
              width={win.isVertical() ? "65" : "75"}
              height={win.isVertical() ? "30" : "35"}
              viewBox="0 0 553 198"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M186.84 144.583C193.927 130.94 197.932 115.438 197.932 99C197.932 44.3238 153.623 0 98.9659 0C44.3085 0 0 44.3238 0 99C0 153.676 44.3085 198 98.9659 198C116.591 198 133.141 193.391 147.475 185.312L160.144 197.985H181.317L181.311 198H406.44L349.463 54.4122H421.901V198H476.294V54.4122H529.639L553 0H261.391L198.285 156.032L186.84 144.583ZM110.491 148.315C106.789 149.178 102.931 149.633 98.9659 149.633C71.0114 149.633 48.3498 126.964 48.3498 98.9999C48.3498 71.0358 71.0114 48.3664 98.9659 48.3664C126.92 48.3664 149.582 71.0358 149.582 98.9999C149.582 101.627 149.382 104.208 148.996 106.727L138.776 96.5027H58.6964L110.491 148.315ZM332.453 152.035L294.118 54.2854L255.784 152.035H332.453Z"
                fill="url(#paint0_linear_1505_8)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_1505_8"
                  x1="8.5"
                  y1="9.5"
                  x2="553"
                  y2="260"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#4F60FF" />
                  <stop offset="1" stopColor="#FF1B6D" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </Link>
        <nav className={styles.navBar}>
          <Link
            className={joinNames([
              router.asPath == "/" ? styles.navLinkActive : styles.navLink,
              fonts.jetbrainsMono.bold,
            ])}
            style={{ fontSize: valueIf(win.isVertical(), "2.5vmin") }}
            href="/"
          >
            Home
          </Link>
          <div
            className={joinNames([styles.navLink, fonts.jetbrainsMono.bold])}
            style={{ fontSize: valueIf(win.isVertical(), "2.5vmin") }}
            onClick={() => {
              if (window) {
                window.open(
                  "https://docs.qat.dev",
                  "_blank",
                  "noreferrer noopener"
                );
              }
            }}
          >
            Learn
          </div>
          <Link
            className={joinNames([
              router.asPath.includes("/playground")
                ? styles.navLinkActive
                : styles.navLink,
              fonts.jetbrainsMono.bold,
            ])}
            style={{ fontSize: valueIf(win.isVertical(), "2.5vmin") }}
            href="/playground"
          >
            Playground
          </Link>
          <Link
            className={joinNames([
              router.asPath.includes("/downloads")
                ? styles.navLinkActive
                : styles.navLink,
              fonts.jetbrainsMono.bold,
            ])}
            style={{ fontSize: valueIf(win.isVertical(), "2.5vmin") }}
            href="/downloads"
          >
            Downloads
          </Link>
        </nav>
      </header>
      <Component {...pageProps} />
    </div>
  );
}

