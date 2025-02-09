import "./style.css";

const LiquidLoader = () => {
  return (
    <div className="loader relative w-[80%] max-w-[300px] h-[40px]">
      <span className="absolute top-0 left-0 w-[10vw] max-w-[40px] aspect-square inline-block shadow-[0_0_30px_#009ad4] bg-gradient-to-b from-[#02edff] to-[#009ad4] blur-[10px] "></span>
      <span className="absolute top-0 left-0 w-[10vw] max-w-[40px] aspect-square inline-block shadow-[0_0_30px_#009ad4] bg-gradient-to-b from-[#02edff] to-[#009ad4] blur-[10px] delay-75"></span> 
      <span className="absolute top-0 left-0 w-[10vw] max-w-[40px] aspect-square inline-block shadow-[0_0_30px_#009ad4] bg-gradient-to-b from-[#02edff] to-[#009ad4] blur-[10px] delay-150"></span>
      <span className="absolute top-0 left-0 w-[10vw] max-w-[40px] aspect-square inline-block shadow-[0_0_30px_#009ad4] bg-gradient-to-b from-[#02edff] to-[#009ad4] blur-[10px] delay-300"></span>
      <span className="absolute top-0 left-0 w-[10vw] max-w-[40px] aspect-square inline-block shadow-[0_0_30px_#009ad4] bg-gradient-to-b from-[#02edff] to-[#009ad4] blur-[10px] delay-700"></span>
      <svg className="hidden absolute">
        <defs>
          <filter id="liquid">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation={10}
              result="blur"
            />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export default LiquidLoader;
