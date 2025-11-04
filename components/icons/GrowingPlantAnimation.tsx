import React from 'react';

export const GrowingPlantAnimation: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    {...props}
  >
    <style>{`
      .gpa-stem {
        stroke-dasharray: 20;
        stroke-dashoffset: 20;
        animation: gpa-grow-stem 1.5s ease-out 0.5s forwards;
      }
      .gpa-leaf {
        opacity: 0;
        transform-origin: bottom center;
        animation: gpa-sprout-leaf 1s ease-out forwards;
      }
      .gpa-leaf-1 { animation-delay: 2s; }
      .gpa-leaf-2 { animation-delay: 2.2s; }
      .gpa-seed {
        animation: gpa-hide-seed 0.5s ease-in 0.2s forwards;
      }

      @keyframes gpa-grow-stem {
        to {
          stroke-dashoffset: 0;
        }
      }
      @keyframes gpa-sprout-leaf {
        from {
          opacity: 0;
          transform: scale(0);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }
      @keyframes gpa-hide-seed {
        to {
          opacity: 0;
          transform: translateY(2px) scale(0.8);
        }
      }
    `}</style>
    <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Seed */}
      <ellipse className="gpa-seed" cx="12" cy="21" rx="2" ry="1" fill="currentColor" stroke="none" />
      
      {/* Stem */}
      <path className="gpa-stem" d="M12 20 C 12 15, 10 12, 12 8" />
      
      {/* Leaves */}
      <path className="gpa-leaf gpa-leaf-1" d="M12 11 C 10 10, 7 11, 7 14" />
      <path className="gpa-leaf gpa-leaf-2" d="M12 11 C 14 10, 17 11, 17 14" />
    </g>
  </svg>
);
