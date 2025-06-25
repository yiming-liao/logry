import { logry } from "logry/browser";

const BrowserPresets = () => {
  const context = { userId: "user_123" };
  const meta = { method: "POST", data: { status: 401 } };

  const p = logry({ id: "1", level: "trace", preset: "pretty" });
  const pe = logry({ id: "2", level: "trace", preset: "pretty-expanded" });
  const m = logry({ id: "3", level: "trace", preset: "minimal" });
  const v = logry({ id: "4", level: "trace", preset: "verbose", context });

  console.log(
    "\n═══════════════════════════[ pretty ]════════════════════════════\n\n",
  );

  p.fatal("This is a msg.");
  p.error("This is a msg.", meta);
  p.warn("This is a msg.", meta, { scope: ["api", "user"] });

  console.log(
    "\n═══════════════════════[ pretty-expanded ]═══════════════════════\n\n",
  );

  pe.info("This is a msg.");
  pe.debug("This is a msg.", meta);
  pe.trace("This is a msg.", meta, { scope: ["api", "user"] });

  console.log(
    "\n═══════════════════════════[ minimal ]═══════════════════════════\n\n",
  );

  m.fatal("This is a msg.");
  m.error("This is a msg.", meta);
  m.warn("This is a msg.", meta, { scope: ["api", "user"] });

  console.log(
    "\n═══════════════════════════[ verbose ]═══════════════════════════\n\n",
  );

  v.info("This is a msg.");
  v.debug("This is a msg.", meta);
  v.trace("This is a msg.", meta, { scope: ["api", "user"] });

  return null;
};

export default BrowserPresets;
