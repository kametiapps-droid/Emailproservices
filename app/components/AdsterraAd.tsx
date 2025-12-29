"use client";
import { useEffect, useId } from "react";

interface AdsterraAdProps {
  adKey: string;
  format?: string;
  width?: number;
  height?: number;
}

export default function AdsterraAd({ adKey, format = 'iframe', width = 468, height = 60 }: AdsterraAdProps) {
  const containerId = useId().replace(/:/g, '');
  
  useEffect(() => {
    const container = document.getElementById(`container-${containerId}`);
    if (!container) return;

    const settings = document.createElement("script");
    settings.type = "text/javascript";
    settings.innerHTML = `
      atOptions = {
        'key' : '${adKey}',
        'format' : '${format}',
        'height' : ${height},
        'width' : ${width},
        'params' : {}
      };
    `;
    container.appendChild(settings);

    const s = document.createElement("script");
    s.type = "text/javascript";
    s.src = `https://www.highperformanceformat.com/${adKey}/invoke.js`;
    s.async = true;
    container.appendChild(s);

    return () => {
      container.innerHTML = '';
    };
  }, [adKey, format, width, height, containerId]);

  return (
    <div style={{ marginTop: "20px", width, height, overflow: 'hidden' }}>
      <div id={`container-${containerId}`}></div>
    </div>
  );
}
