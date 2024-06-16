import React, { SVGProps } from 'react';

const IconPlus24X24 = (props: SVGProps<SVGSVGElement>) => {
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
        d="M6 12h12M12 18V6"
      />
    </svg>
  );
};

export default IconPlus24X24;
