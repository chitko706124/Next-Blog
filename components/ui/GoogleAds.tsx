"use client";

import { useEffect } from "react";

const GoogleAds = () => {
  useEffect(() => {
    // Check if AdSense script is already loaded
    if (!document.querySelector("#adsense-script")) {
      const script = document.createElement("script");
      script.id = "adsense-script";
      script.async = true;
      script.src =
        "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
      script.setAttribute("data-ad-client", "ca-pub-5952419186869307");
      script.crossOrigin = "anonymous";
      document.head.appendChild(script);
    }
  }, []);

  // return null;
  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-5952419186869307"
      data-ad-slot="4396157574"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
};

export default GoogleAds;
