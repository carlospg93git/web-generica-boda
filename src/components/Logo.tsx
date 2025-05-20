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
  bgColor = '#3C5A36', // verde oscuro
  size = 80,
}) => {
  const inicial1 = nombre_uno.trim().charAt(0).toUpperCase();
  const inicial2 = nombre_dos.trim().charAt(0).toUpperCase();
  return (
    <div
      className="fixed top-0 left-1/2 -translate-x-1/2 z-50"
      style={{ pointerEvents: 'none', marginTop: 24 }}
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
          fontFamily: "'Montez', cursive",
          color: '#fff',
          fontSize: size * 0.42,
          fontWeight: 400,
          letterSpacing: '0.01em',
        }}
        aria-label={`Logo de ${nombre_uno} y ${nombre_dos}`}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span>{inicial1}</span>
          <span style={{ fontSize: size * 0.28, margin: '0 2px' }}>&amp;</span>
          <span>{inicial2}</span>
        </span>
      </div>
    </div>
  );
};

export default Logo;