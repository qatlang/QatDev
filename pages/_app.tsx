import "../styles/globals.css";
import type { AppProps } from "next/app";
import Image from "next/image";
import styles from "styles/App.module.css";
import Link from "next/link";
import logo from "public/logo192.png";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  let router = useRouter();
  return (
    <div className={styles.App}>
      <header className={styles.appHeader}>
        <div className={styles.branding}>
          <Image
            src={logo}
            height={40}
            width={40}
            style={{ marginLeft: "1vw", marginRight: "1vw" }}
            alt="logo"
          />
          <div className={styles.titleGroup}>
            <div className={styles.appTitle}>qat</div>
            <div className={styles.appSubtitle}>programming language</div>
          </div>
        </div>
        <nav className={styles.navBar}>
          <Link
            className={
              router.asPath == "/" ? styles.navLinkActive : styles.navLink
            }
            href="/"
          >
            Home
          </Link>
          <div
            className={styles.navLink}
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
            className={
              router.asPath.includes("/playground")
                ? styles.navLinkActive
                : styles.navLink
            }
            href="/playground"
          >
            Playground
          </Link>
          <Link
            className={
              router.asPath.includes("/downloads")
                ? styles.navLinkActive
                : styles.navLink
            }
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

