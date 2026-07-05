interface LogoIconProps {
  size?: number;
  className?: string;
}

export function LogoIcon({ size = 32, className = "" }: LogoIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Shield body */}
      <path
        d="M16 2L4 7V18C4 24.5 9.5 29.5 16 31C22.5 29.5 28 24.5 28 18V7L16 2Z"
        fill="#1A6FC4"
      />
      {/* Subtle inner shadow/depth */}
      <path
        d="M16 4.8L6.4 8.9V18C6.4 23.4 10.9 27.7 16 29.2C21.1 27.7 25.6 23.4 25.6 18V8.9L16 4.8Z"
        fill="url(#shieldGrad)"
        opacity="0.25"
      />
      {/* Checkmark */}
      <path
        d="M10.5 16.5L14 20L21.5 12.5"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient id="shieldGrad" x1="16" y1="4" x2="16" y2="31" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>
    </svg>
  );
}
