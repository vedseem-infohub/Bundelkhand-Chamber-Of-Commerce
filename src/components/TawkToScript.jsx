'use client';
import { useEffect } from 'react';

export default function TawkToScript() {
  useEffect(() => {
    const s1 = document.createElement('script');
    s1.src = 'https://embed.tawk.to/68ac17d2be8646192a41710f/1j3g3q4o6';
    s1.async = true;
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    document.head.appendChild(s1);

    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_API.onLoad = function () {
      window.Tawk_API.hideWidget(); 
      window.Tawk_API.showWidget();
    };
  }, []);

  return null;
}

