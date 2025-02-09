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

  return null; // No need to return anything for Auto Ads
};

export default GoogleAds;
