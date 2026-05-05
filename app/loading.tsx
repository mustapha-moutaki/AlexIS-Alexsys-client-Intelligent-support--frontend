export default function Loading() {
  const AlexISLogo: React.FC = () => (
    <svg
      viewBox="0 0 624 565"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <defs>
        <filter id="glow-login">
          <feGaussianBlur stdDeviation="7" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <path
        d="M514 261L623.5 261L471.5 0L150 1L0 262.5L102.5 262L223.5 89L424.5 89L514 261Z"
        fill="#52C1DE"
      >
        <animate
          attributeName="opacity"
          values="0;0;1;1;0;0"
          keyTimes="0;0;0.14;0.9;0.95;1"
          dur="5s"
          repeatCount="indefinite"
        />
      </path>

      <path
        d="M612.5 305L611 308L471.5 564.5L156 564.5L2.5 308L94 308L99.5 308L223.5 483L420 482L518 305L612.5 305Z"
        fill="#371450"
      >
        <animate
          attributeName="opacity"
          values="0;0.03;1;1;0;0"
          keyTimes="0;0.03;0.17;0.9;0.95;1"
          dur="5s"
          repeatCount="indefinite"
        />
      </path>

      <path
        d="M285.83 398.211L338.83 398.021L338 166L285 166.19L285.83 398.211Z"
        fill="#52C1DE"
        filter="url(#glow-login)"
      >
        <animate
          attributeName="opacity"
          values="0;0;0.4;0.15;0.4;0.15;0.4;0;0"
          keyTimes="0;0.13;0.35;0.45;0.55;0.65;0.75;0.9;1"
          dur="5s"
          repeatCount="indefinite"
        />
      </path>

      <path
        d="M215.51 298.034L320.118 315.47L206 398L417 297.453L311.203 280.598L416.406 194L413.434 195.743L215.51 298.034Z"
        fill="#ffffff"
      >
        <animate
          attributeName="opacity"
          values="0;0;1;1;0;0"
          keyTimes="0;0.16;0.2;0.9;0.95;1"
          dur="5s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent">
      <div className="w-[68px] md:w-[84px] aspect-[624/565] justify-center items-center">
        <AlexISLogo />
        Loading page ...
      </div>
    </div>
  );
}