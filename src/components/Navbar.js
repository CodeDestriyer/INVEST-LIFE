import React, { useState } from 'react';
import { Building2, Menu, X } from 'lucide-react';

export const Navbar = ({ mode, setMode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav style={navStyles.nav}>
      <div style={navStyles.container}>
        <div style={navStyles.logo}>
          <Building2 color="#2563eb" size={28} />
          <span>INVEST<b>LIFE</b></span>
        </div>
        
        {/* Десктопные табы */}
        <div style={navStyles.menuDesktop}>
          <div style={navStyles.toggle}>
            <button onClick={() => setMode('Venta')} style={mode === 'Venta' ? navStyles.active : navStyles.tab}>Купить</button>
            <button onClick={() => setMode('Alquiler')} style={mode === 'Alquiler' ? navStyles.active : navStyles.tab}>Снять</button>
          </div>
        </div>

        <button onClick={() => setIsOpen(!isOpen)} style={navStyles.burger}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>
      
      {/* Мобильное меню */}
      {isOpen && (
        <div style={navStyles.mobileDropdown}>
          <button onClick={() => {setMode('Venta'); setIsOpen(false)}}>Продажа</button>
          <button onClick={() => {setMode('Alquiler'); setIsOpen(false)}}>Аренда</button>
        </div>
      )}
    </nav>
  );
};

const navStyles = {
  nav: { height: '70px', background: '#fff', borderBottom: '1px solid #eee', position: 'fixed', width: '100%', top: 0, zIndex: 100 },
  container: { maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%', padding: '0 20px' },
  logo: { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '20px', fontWeight: 'bold' },
  toggle: { display: 'flex', background: '#f1f5f9', padding: '4px', borderRadius: '30px' },
  tab: { border: 'none', background: 'none', padding: '8px 20px', cursor: 'pointer', borderRadius: '25px', color: '#64748b' },
  active: { border: 'none', background: '#fff', padding: '8px 20px', cursor: 'pointer', borderRadius: '25px', color: '#2563eb', fontWeight: 'bold', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' },
  burger: { display: 'none', background: 'none', border: 'none', cursor: 'pointer' }, // В CSS добавим медиа-запрос
  mobileDropdown: { position: 'absolute', top: '70px', left: 0, width: '100%', background: '#fff', display: 'flex', flexDirection: 'column', padding: '20px', gap: '15px', borderBottom: '1px solid #eee' }
};