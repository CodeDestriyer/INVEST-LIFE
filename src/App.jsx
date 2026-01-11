import React, { useState, useMemo } from 'react';
import { DB } from './data';
import { Navbar } from './components/Navbar';
import { PropertyCard } from './components/PropertyCard';
import './index.css'; // Обязательно импортируй CSS!

export default function App() {
  const [mode, setMode] = useState('Venta');
  const [maxPrice, setMaxPrice] = useState(mode === 'Venta' ? 2000000 : 3500);

  const filteredData = useMemo(() => {
    return DB.filter(item => item.mode === mode && item.price <= maxPrice);
  }, [mode, maxPrice]);

  return (
    <div style={{ paddingTop: '70px' }}>
      <Navbar mode={mode} setMode={setMode} />
      
      <main className="container">
        <header style={{ margin: '40px 0' }}>
          <h1 style={{ fontSize: '2rem' }}>
            {mode === 'Venta' ? 'Недвижимость на продажу' : 'Аренда жилья'}
          </h1>
          <p style={{ color: '#64748b' }}>Найдено вариантов: {filteredData.length}</p>
        </header>

        {/* Вот тут работает магия из index.css */}
        <div className="property-grid">
          {filteredData.map(item => (
            <PropertyCard key={item.id} item={item} />
          ))}
        </div>
      </main>
    </div>
  );
}


const mainStyles = {
  container: { maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' },
  header: { marginBottom: '40px' },
  grid: { 
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
    gap: '30px' 
  }
};