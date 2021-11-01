/*
  <!-- Global site tag (gtag.js) - Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-82ENQHE562"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-82ENQHE562');
  </script>
*/

export async function initGoogleAnalytics() {
  const gtagScript = document.createElement('script');
  gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-82ENQHE562';
  gtagScript.async = true;
  document.head.appendChild(gtagScript);
};

const dataLayer: unknown[] = (window as any).dataLayer || [];
(window as any).dataLayer = dataLayer;

export function gtag(...args: unknown[]) {
  dataLayer.push(arguments);
}

gtag('js', new Date());
gtag('config', 'G-82ENQHE562');