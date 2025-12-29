'use client';

import { useEffect, useRef } from 'react';

interface AdsterraAdProps {
  adKey: string;
  format?: string;
  width?: number;
  height?: number;
}

const AdsterraAd = ({ adKey, format = 'iframe', width = 300, height = 250 }: AdsterraAdProps) => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!adRef.current) return;

    // Clear existing content
    adRef.current.innerHTML = '';

    const container = document.createElement('div');
    container.id = `adsterra-container-${adKey}`;
    adRef.current.appendChild(container);

    const configScript = document.createElement('script');
    configScript.type = 'text/javascript';
    configScript.innerHTML = `
      atOptions = {
        'key' : '${adKey}',
        'format' : '${format}',
        'height' : ${height},
        'width' : ${width},
        'params' : {}
      };
    `;
    container.appendChild(configScript);

    const invokeScript = document.createElement('script');
    invokeScript.type = 'text/javascript';
    invokeScript.src = `//www.highperformanceformat.com/${adKey}/invoke.js`;
    invokeScript.async = true;
    container.appendChild(invokeScript);

    return () => {
      if (adRef.current) {
        adRef.current.innerHTML = '';
      }
    };
  }, [adKey, format, width, height]);

  return (
    <div 
      ref={adRef} 
      className="adsterra-ad-container" 
      style={{ 
        minHeight: `${height}px`, 
        minWidth: `${width}px`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '20px 0'
      }} 
    />
  );
};

export default AdsterraAd;
