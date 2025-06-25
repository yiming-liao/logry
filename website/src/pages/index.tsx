import type { ReactNode } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
// import HomepageFeatures from "@site/src/components/HomepageFeatures";
import Heading from "@theme/Heading";

import styles from "./index.module.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <div>
          <a href="https://yiming-liao.github.io/logry/docs/introduction/getting-started">
            <img
              src="/logry/img/logry-logo-rounded.png"
              alt="Logry node"
              width="100"
              height="100"
              style={{
                borderRadius: "10px",
                boxShadow: "3px 3px 8px rgba(0, 0, 0, 0.25)",
              }}
            />
          </a>
        </div>
        <Heading as="h1" className="hero__title" style={{ margin: "20px 0 " }}>
          {siteConfig.title}
        </Heading>
        <p
          className="hero__subtitle"
          style={{ color: "rgb(23, 23, 23)", fontFamily: "Georgia, serif" }}
        >
          {/* {siteConfig.tagline} */}A lightweight, extensible logger for
          universal JavaScript runtimes like Node.js, browsers, and Edge.
          <br />
          Includes scoped loggers, formatter pipelines, and modular handlers for
          file logging, remote delivery, or custom use.
        </p>
        <div className={styles.buttons}>
          <Link
            style={{ margin: "20px 0" }}
            className="button button--secondary button--lg"
            to="/docs/introduction/getting-started"
          >
            Getting Started
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <HomepageHeader />
      {/* <main>
        <HomepageFeatures />
      </main> */}
    </Layout>
  );
}
