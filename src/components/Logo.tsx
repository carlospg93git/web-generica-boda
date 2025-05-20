import React from 'react';

interface LogoProps {
  iniciales?: string;
}

const Logo: React.FC<LogoProps> = ({ iniciales = 'M&C' }) => {
  return (
    <div className="fixed top-0 left-0 z-50 p-4">
      <span className="text-4xl font-logo text-nature-700 drop-shadow-lg select-none">
        {iniciales}
      </span>
    </div>
  );
};

export default Logo;