"use client";
import { useEffect } from "react";

export default function Ads() {
  useEffect(() => {
    // Load script 1
    const s1 = document.createElement("script");
    s1.src = "https://pl28354949.effectivegatecpm.com/a6c0b501e723bd19d692eca38b289c7e/invoke.js";
    s1.async = true;
    document.body.appendChild(s1);

    // Load script 2
    const s2 = document.createElement("script");
    s2.src = "https://www.highperformanceformat.com/78700c452c631c6534cf7a201eb6cab5/invoke.js";
    document.body.appendChild(s2);

    // Load script 3
    const s3 = document.createElement("script");
    s3.src = "https://pl28355048.effectivegatecpm.com/4a/b4/ed/4ab4edfe9bfd89766697db1bf9b9a3ff.js";
    document.body.appendChild(s3);

  }, []);

  return (
    <div>
      {/* yahan ad dikhega */}
      <div id="container-a6c0b501e723bd19d692eca38b289c7e"></div>
    </div>
  );
}
