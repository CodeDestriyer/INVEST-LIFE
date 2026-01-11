import React, { useState, useMemo, useEffect } from 'react';
import { DB } from './data';
import { Navbar } from './components/Navbar';
import { PropertyCard } from './components/PropertyCard';
import { MapPin, Search, Minus, Plus } from 'lucide-react';
import './index.css'; // Твой главный файл со стилями

export default function App() {
  const [mode, setMode] = useState('Venta');
  const [maxPrice, setMaxPrice] = useState(mode === 'Venta' ? 2000000 : 3500);
  const [searchCity, setSearchCity] = useState('');

  // Сброс цены при переключении режима
  useEffect(() => {
    setMaxPrice(mode === 'Venta' ? 2000000 : 3500);
  }, [mode]);

  const filteredData = useMemo(() => {
    return DB.filter(item => 
      item.mode === mode && 
      item.price <= maxPrice &&
      (searchCity === '' || item.city.toLowerCase().includes(searchCity.toLowerCase()))
    );
  }, [mode, maxPrice, searchCity]);

  const adjustPrice = (amount) => {
    setMaxPrice(prev => Math.max(0, prev + amount));
  };

  return (
    <div className="app-wrapper">
      <Navbar mode={mode} setMode={setMode} />

      {/* HERO SECTION */}
      <header className="hero">
        <div className="hero-overlay"></div>
        <div className="container">
          <div className="hero-content">
            <span className="hero-badge">Премиальная недвижимость в Испании</span>
            <h1 className="hero-h1">Найдите место, где <br/> начинается ваша история</h1>
            
            <div className="search-bar">
              <div className="search-item">
                <MapPin size={20} color="#2563eb" />
                <input 
                  placeholder="Город (Madrid, Marbella...)" 
                  className="search-input"
                  value={searchCity}
                  onChange={(e) => setSearchCity(e.target.value)}
                />
              </div>
              <div className="divider"></div>
              <div className="search-item price-item">
                <span className="price-label">До: <b>{maxPrice.toLocaleString()} €</b></span>
                <div className="price-actions">
                  <button onClick={() => adjustPrice(mode === 'Venta' ? -10000 : -1000)} className="p-btn"><Minus size={14}/></button>
                  <button onClick={() => adjustPrice(mode === 'Venta' ? 10000 : 1000)} className="p-btn"><Plus size={14}/></button>
                </div>
              </div>
              <button className="main-search-btn">
                <Search size={20} /> Поиск
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* КАТАЛОГ */}
      <main className="container section">
        <div className="catalog-header">
          <h2 className="section-title">
            {mode === 'Venta' ? "Каталог Продажи" : "Каталог Аренды"}
          </h2>
          <p className="results-count">Найдено объектов: {filteredData.length}</p>
        </div>

        <div className="property-grid">
          {filteredData.map(item => (
            <PropertyCard key={item.id} item={item} />
          ))}
        </div>
      </main>
    </div>
  );
}