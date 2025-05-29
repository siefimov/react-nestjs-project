import { type ComponentPropsWithoutRef } from 'react';

export const ArrowLeft: React.FC<ComponentPropsWithoutRef<'svg'>> = props => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    height="1em"
    width="1em"
    {...props}
  >
    <path d="M15 18l-6-6 6-6" />
  </svg>
);
