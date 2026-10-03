import React from 'react';

const Logo = ({ className = '' }) => {
  return (
    <img 
      src="/logo.png" 
      alt="DESEO Logo" 
      className={`logo ${className}`} 
      style={{ display: 'block', height: 'auto', maxWidth: '100px' }}
    />
  );
};

export default Logo;
