/* eslint-disable @typescript-eslint/no-require-imports */
import type { ReactNode } from "react";
import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<"svg">>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Cross-Platform Compatibility",
    Svg: require("@site/static/img/undraw_docusaurus_mountain.svg").default,
    description: (
      <>
        <code>logry</code> works seamlessly in both Node.js and browser
        environments. It's perfect for monorepo setups, allowing shared global
        loggers across multiple packages and platforms.
      </>
    ),
  },
  {
    title: "Highly Customizable",
    Svg: require("@site/static/img/undraw_docusaurus_tree.svg").default,
    description: (
      <>
        Build your ideal logging pipeline with <code>customNormalizers</code>,{" "}
        <code>customFormatters</code>, and even extend it further using the
        flexible <code>HandlerManager</code> to register your own handlers.
      </>
    ),
  },
  {
    title: "Built-in Presets",
    Svg: require("@site/static/img/undraw_docusaurus_react.svg").default,
    description: (
      <>
        <code>logry</code> comes with built-in presets for formatting and output
        styles, so you can get started quickly with sensible defaults — and
        still customize as needed.
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
