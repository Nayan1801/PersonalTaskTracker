// src/components/ProgressWheel.jsx
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const ProgressWheel = ({ completed, total }) => {
  const circleRef = useRef(null);
  const containerRef = useRef(null);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const newPercent = total === 0 ? 0 : Math.round((completed / total) * 100);
    setPercent(newPercent);

    const radius = 60;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (newPercent / 100) * circumference;

    gsap.to(circleRef.current, {
      strokeDashoffset: offset,
      duration: 1,
      ease: 'power2.out',
    });

    // If 100%, do a burst glow
    if (newPercent === 100) {
      gsap.fromTo(
        containerRef.current,
        { scale: 1, boxShadow: '0 0 0px transparent' },
        {
          scale: 1.05,
          boxShadow: '0 0 25px rgba(34,197,94,0.7)',
          duration: 0.5,
          yoyo: true,
          repeat: 1,
        }
      );
    }

  }, [completed, total]);

  // Hover Animation
  const handleHover = () => {
    gsap.to(containerRef.current, {
      scale: 1.05,
      duration: 0.3,
      ease: 'power1.inOut',
    });
  };

  const handleLeave = () => {
    gsap.to(containerRef.current, {
      scale: 1,
      duration: 0.3,
      ease: 'power1.inOut',
    });
  };

  const handleClick = () => {
    gsap.fromTo(
      containerRef.current,
      { rotate: 0 },
      { rotate: 360, duration: 1, ease: 'back.inOut(1.7)' }
    );
  };

  return (
    <div
      ref={containerRef}
      className="w-50 h-50 flex flex-col items-center justify-center bg-white dark:bg-gray-900 rounded-xl shadow-lg transition-all cursor-pointer"
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
      onClick={handleClick}
    >
      <svg width="130" height="130" className="transform -rotate-90 animate-float">
        <circle
          cx="65"
          cy="65"
          r="60"
          stroke="#e5e7eb"
          strokeWidth="10"
          fill="none"
        />
        <circle
          ref={circleRef}
          cx="65"
          cy="65"
          r="60"
          stroke={percent === 100 ? '#22c55e' : '#3b82f6'}
          strokeWidth="10"
          fill="none"
          strokeDasharray={2 * Math.PI * 60}
          strokeDashoffset={2 * Math.PI * 60}
          strokeLinecap="round"
        />
      </svg>
      <div className="text-center mt-2">
        <p className={`text-xl font-bold ${percent === 100 ? 'text-green-500' : 'text-blue-600'} dark:text-blue-400`}>
          {completed}/{total}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {percent}% Completed
        </p>
      </div>
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ProgressWheel;
