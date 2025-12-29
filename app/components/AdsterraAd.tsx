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
    if (typeof window === 'undefined' || !adRef.current) return;

    // Clear existing content
    adRef.current.innerHTML = '';

    const container = document.createElement('div');
    container.id = `at-container-${adKey}`;
    adRef.current.appendChild(container);

    const configScript = document.createElement('script');
    configScript.type = 'text/javascript';
    configScript.innerHTML = `
      var atOptions = {
        'key' : '${adKey}',
        'format' : '${format}',
        'height' : ${height},
        'width' : ${width},
        'params' : {}
      };
      document.write('<scr' + 'ipt type="text/javascript" src="https://www.highperformanceformat.com/${adKey}/invoke.js"></scr' + 'ipt>');
    `;
    container.appendChild(configScript);

    return () => {
      if (adRef.current) {
        adRef.current.innerHTML = '';
      }
    };
  }, [adKey, format, width, height]);

  return (
    <div 
      ref={adRef} 
      className="ad-slot"
      style={{ 
        minHeight: `${height}px`, 
        minWidth: `${width}px`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '20px 0',
        background: 'rgba(0,0,0,0.05)',
        borderRadius: '8px'
      }} 
    />
  );
};

export default AdsterraAd;
