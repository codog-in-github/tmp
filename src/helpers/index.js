export const loadScript = (src, attrs = {}) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    Object.keys(attrs).forEach((key) => {
      script.setAttribute(key, attrs[key]);
    });
    script.src = src;
    script.onload = resolve;
    script.onerror = () => {
      reject(new Error(`Failed to load script: ${src}`));
    };
    document.head.appendChild(script);
  });
};
