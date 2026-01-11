import React, { useState } from 'react';
import { Building2, Menu, X } from 'lucide-react';

export const Navbar = ({ mode, setMode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <div className="logo">
          <Building2 color="#2563eb" size={28} />
          <span>INVEST<b>LIFE</b></span>
        </div>
        
        {/* Desktop Menu */}
        <div className="nav-controls">
          <div className="mode-toggle">
            <button 
              onClick={() => setMode('Venta')} 
              className={mode === 'Venta' ? 'tab-active' : 'tab'}
            >
              Купить
            </button>
            <button 
              onClick={() => setMode('Alquiler')} 
              className={mode === 'Alquiler' ? 'tab-active' : 'tab'}
            >
              Снять
            </button>
          </div>
        </div>

        {/* Бургер для мобилок */}
        <button className="burger-btn" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="mobile-menu">
          <button onClick={() => { setMode('Venta'); setIsOpen(false); }}>Купить</button>
          <button onClick={() => { setMode('Alquiler'); setIsOpen(false); }}>Снять</button>
        </div>
      )}
    </nav>
  );
};