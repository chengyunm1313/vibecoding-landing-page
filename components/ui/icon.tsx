import type { SVGProps } from 'react';

const iconPaths = {
  spark: (
    <path
      d="M12 3l1.9 4.6L18.5 9l-4.6 1.4L12 15l-1.9-4.6L5.5 9l4.6-1.4L12 3zm7 11l.95 2.05L22 17l-2.05.95L19 20l-.95-2.05L16 17l2.05-.95L19 14zM5 15l1.2 2.8L9 19l-2.8 1.2L5 23l-1.2-2.8L1 19l2.8-1.2L5 15z"
      fill="currentColor"
    />
  ),
  arrowRight: (
    <path
      d="M4 12h13m0 0l-5-5m5 5l-5 5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    />
  ),
  grid: (
    <path
      d="M4 4h7v7H4V4zm9 0h7v7h-7V4zM4 13h7v7H4v-7zm9 0h7v7h-7v-7z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  ),
  chart: (
    <path
      d="M5 19V9m7 10V5m7 14v-7"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.8"
    />
  ),
  rocket: (
    <path
      d="M13 3c3.8.5 6.5 3.2 7 7-2 2.2-4.8 4.1-8.4 5.8L8.2 12.4C9.9 8.8 11.8 6 14 4c-.3-.3-.6-.6-1-.9zM6 14l4 4M6 18c-.8.8-2.8 1.5-4 1 0-1.2.2-3.2 1-4 .8-.8 2.2-.8 3 0s.8 2.2 0 3z"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    />
  ),
  check: (
    <path
      d="M5 12.5l4.2 4.2L19 7"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    />
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 8v4l2.8 2"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </>
  ),
  map: (
    <path
      d="M4 6.5l5-2 6 2 5-2v13l-5 2-6-2-5 2v-13zM9 4.5v13m6-11v13"
      fill="none"
      stroke="currentColor"
      strokeLinejoin="round"
      strokeWidth="1.8"
    />
  ),
  users: (
    <>
      <path
        d="M9 11a3 3 0 100-6 3 3 0 000 6zm6 2a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M4.5 18.5a4.5 4.5 0 019 0m1.5 0a3.5 3.5 0 017 0"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </>
  ),
  message: (
    <path
      d="M6 18l-2 3v-5a7 7 0 117 7H6z"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    />
  ),
  shield: (
    <path
      d="M12 3l7 3v5c0 4.2-2.5 7.2-7 10-4.5-2.8-7-5.8-7-10V6l7-3zm-2.8 9.2l1.9 1.9 3.8-3.8"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    />
  ),
};

type IconName = keyof typeof iconPaths;

type IconProps = SVGProps<SVGSVGElement> & {
  name: IconName;
};

export function Icon({ name, className, ...props }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {iconPaths[name]}
    </svg>
  );
}
