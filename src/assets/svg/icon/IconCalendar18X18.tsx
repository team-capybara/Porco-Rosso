import { SVGProps } from 'react';

const IconCalendar18X18 = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={18}
      height={18}
      fill="none"
      {...props}
    >
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path
          strokeMiterlimit="10"
          strokeWidth="1.5"
          d="M6 1.5v2.25M12 1.5v2.25M2.625 6.818h12.75M15.75 6.375v6.375c0 2.25-1.125 3.75-3.75 3.75H6c-2.625 0-3.75-1.5-3.75-3.75V6.375c0-2.25 1.125-3.75 3.75-3.75h6c2.625 0 3.75 1.5 3.75 3.75"
        />
        <path
          strokeWidth="2"
          d="M11.77 10.275h.006M11.77 12.525h.006M8.996 10.275h.007M8.996 12.525h.007M6.222 10.275h.007M6.222 12.525h.007"
        />
      </g>
    </svg>
  );
};

export default IconCalendar18X18;
