import React, { useEffect, useRef } from "react";
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
    <section className="flex items-center justify-center h-full loading-page animate-pulse">
      <svg
        version="1.1"
        viewBox="0 0 800 800"
        width="200"
        height="200"
        xmlns="http://www.w3.org/2000/svg"
        >
        <path
          transform="translate(668,144)"
          d="m0 0 4 1 14 14 13 17 10 14 12 19 12 22 12 24 11 27 7 23 7 30 4 26 2 21v52l-4 33-6 30-7 26-10 28-13 29-14 25-14 21-9 12-9 11-11 13-25 25-8 7-11 9-14 11-16 11-21 13-27 14-18 8-28 10-28 7-27 5-36 4-29 1-23-1-32-4-27-5-26-7-29-10-24-11-23-12-23-14-17-13-12-9-14-12-19-19 1-7 6-17 16-39 25-63 14-35 16-41 13-32 12-29 15-40 12-30 11-28 10-23 7-12 9-10 11-7 14-5 12-2h29l16 4 13 7 10 9 8 11 10 21 15 40 12 31 20 52 14 37 13 35 15 40 7 18 1 8-6 1h-67l-3-5-8-21-11-33-13-34-18-48-16-43-8-20-6-17-9-19-3-4h-5l-5 9-9 20-18 47-17 43-15 36-14 36-29 73-20 51-4 12 1 6 14 11 17 11 25 14 29 12 11 4 25 6 25 5 16 2h59l27-4 26-6 16-5 19-7 18-8 23-13 22-15 10-8 13-11 11-10 8-7 12-13 7-8 12-16 15-23 13-25 11-28 7-22 6-28 4-30v-51l-4-30-7-30-7-21-13-31-9-19-1-6v-89z"
          fill="#FEFEFE"
        />
        <path
          transform="translate(368,27)"
          d="m0 0h52l36 4 27 5 25 7 32 11 20 9 24 12 17 10 10 8 2 2 1 7 1 37v412l-1 12-3 1h-59l-5-2-1-10v-419l-10-6-17-8-27-10-17-5-23-5-21-3-13-1h-44l-21 2-22 4-25 6-18 6-23 10-21 11-18 11-21 16-13 11-13 12-14 14-9 11-10 12-18 27-12 22-10 22-9 25-6 24-5 33-1 13v35l2 22 5 30 7 26 11 30 3 8v10l-7 20-16 39-6 12h-3l-4-5-8-13-12-23-10-21-10-26-8-27-5-23-6-37-1-14v-47l4-33 6-32 7-27 8-22 9-21 12-23 13-22 13-19 11-15 13-16 5-6h2l2-4 17-17 8-7 13-11 19-14 18-12 23-13 25-12 18-7 31-10 27-6 30-5z"
          fill="#FEFEFE"
        />
      </svg>
    </section>
  );
};

export default Loading;
