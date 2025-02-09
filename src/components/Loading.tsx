import React, { useEffect, useRef } from "react";
import BreathingText from "./fancy/breathing-text";
// import './Loading.css';

const Loading: React.FC = () => {
  const textRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const textElement = textRef.current;
    if (textElement) {
      const length = textElement.innerHTML.length;
      textElement.style.strokeDasharray = length.toString();
      textElement.style.strokeDashoffset = length.toString();

      const animate = () => {
        textElement.style.strokeDashoffset = "0";
      };

      setTimeout(animate, 1000);
    }
  }, []);

  return (
    <section className="flex items-center justify-center absolute inset-0 loading-page animate-pulse">
      <BreathingText
        label="Loading"
        className="pixel"
        fromFontVariationSettings="'wght' 100, 'slnt' 0"
        toFontVariationSettings="'wght' 800, 'slnt' -10"
      />
    </section>
  );
};

export default Loading;
