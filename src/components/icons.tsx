import type { SVGProps } from 'react';

export function ResilientChainIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      <path d="M15.5 8.5 12 12l-3.5 3.5" />
      <path d="M8.5 8.5 12 12l3.5 3.5" />
      <path d="m12 12-3.5-3.5" />
      <path d="m12 12 3.5-3.5" />
    </svg>
  );
}
