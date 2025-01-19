import { SVGProps } from 'react';

const IconX12X12 = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={12}
      height={12}
      fill="none"
      {...props}
    >
      <g
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth=".682"
      >
        <path d="m2.82 2.818 6.364 6.363M2.82 9.181l6.364-6.363" />
      </g>
    </svg>
  );
};

export default IconX12X12;
