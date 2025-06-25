import React from "react";

const CodeSandbox = () => {
  return (
    <iframe
      src="https://codesandbox.io/p/devbox/example-wjffpc?embed=1&file=%2FREADME.md&showConsole=true"
      style={{
        width: "100%",
        height: "500px",
        border: 0,
        borderRadius: "4px",
        overflow: "hidden",
      }}
      title="Example"
      allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
    ></iframe>
  );
};

export default CodeSandbox;
