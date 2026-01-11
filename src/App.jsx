import React, { useState, useMemo } from 'react';
import { DB } from './data';
import { Navbar } from './components/Navbar';
import { PropertyCard } from './components/PropertyCard'; // Создадим следующим шагом

export default function App() {
  const [mode, setMode] = useState('Venta');
  const [maxPrice, setMaxPrice] = useState(mode === 'Venta' ? 2000000 : 3500);

  // Логика фильтрации - работает быстро и четко
  const filteredData = useMemo(() => {
    return DB.filter(item => item.mode === mode && item.price <= maxPrice);
  }, [mode, maxPrice]);

  return (
    <div style={{ paddingTop: '70px', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <Navbar mode={mode} setMode={setMode} />
      
      <main style={mainStyles.container}>
        {/* Сюда мы вставим SearchBar и Grid */}
        <header style={mainStyles.header}>
          <h1>{mode === 'Venta' ? 'Покупка недвижимости' : 'Аренда жилья'}</h1>
          <p>Найдено объектов: {filteredData.length}</p>
        </header>

        <div style={mainStyles.grid}>
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