import React from 'react';

interface LogoProps {
  nombre_uno?: string;
  nombre_dos?: string;
  bgColor?: string;
  size?: number;
}

const Logo: React.FC<LogoProps> = ({
  nombre_uno = '',
  nombre_dos = '',
  bgColor = '#e6ebe6', // color principal
  size = 56,
}) => {
  const inicial1 = nombre_uno.trim().charAt(0).toUpperCase();
  const inicial2 = nombre_dos.trim().charAt(0).toUpperCase();
  return (
    <div
      className="fixed top-0 left-0 z-50 p-4"
      style={{ pointerEvents: 'none' }}
    >
      <div
        style={{
          background: bgColor,
          borderRadius: '50%',
          width: size,
          height: size,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
          fontSize: size * 0.38,
          color: '#222',
          boxShadow: '0 2px 8px #0001',
          userSelect: 'none',
          fontFamily: 'Playfair Display, serif',
        }}
        aria-label={`Logo de ${nombre_uno} y ${nombre_dos}`}
      >
        {inicial1} & {inicial2}
      </div>
    </div>
  );
};

export default Logo;