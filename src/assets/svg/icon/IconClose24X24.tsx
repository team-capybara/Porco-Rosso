import { SVGProps } from 'react';

const IconClose24X24 = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill="none"
      {...props}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M5.001 5 19 19M5 19 19 5"
      />
    </svg>
  );
};

export default IconClose24X24;
