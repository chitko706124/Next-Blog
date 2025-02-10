"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle: any;
  }
}

interface AdBannerProps {
  "data-ad-slot": string;
  "data-ad-format"?: string;
  "data-full-width-responsive"?: string;
  style?: React.CSSProperties;
}

const AdBanner: React.FC<AdBannerProps> = (props) => {
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      !document.querySelector("#adsense-script")
    ) {
      const script = document.createElement("script");
      script.id = "adsense-script";
      script.async = true;
      script.src =
        "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
      script.setAttribute("data-ad-client", "ca-pub-5952419186869307");
      script.crossOrigin = "anonymous";
      document.head.appendChild(script);
    }

    // Push ads after the script is loaded
    const interval = setTimeout(() => {
      if (window.adsbygoogle) {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err) {
          console.error("AdSense push error:", err);
        }
      }
    }, 1000);

    return () => clearTimeout(interval);
  }, []);

  return (
    <ins
      className="adsbygoogle adbanner-customize"
      style={{
        display: "block",
        overflow: "hidden",
        ...props.style, // Allow custom styles
      }}
      data-ad-client="ca-pub-5952419186869307"
      {...props}
    />
  );
};

export default AdBanner;
