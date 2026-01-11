import React, { useState, useEffect } from 'react';
import { Search, Home, Bed, Bath, Maximize, X, Phone, Plus, Minus, Building2 } from 'lucide-react';

const propertiesData = [
  { id: 1, title: "Villa Enorme en Marbella", price: 450000, type: "Villa", mode: "Venta", rooms: 4, baths: 3, area: 250, image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800", description: "Роскошная вилла для продажи. Полная приватность." },
  { id: 2, title: "Piso Moderno en Barcelona", price: 1200, type: "Apartamento", mode: "Alquiler", rooms: 2, baths: 1, area: 75, image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800", description: "Светлая квартира в аренду в центре города." },
  { id: 3, title: "Ático Exclusivo en Madrid", price: 620000, type: "Atico", mode: "Venta", rooms: 3, baths: 2, area: 110, image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800", description: "Аттик с террасой на крыше. Продажа." },
  { id: 4, title: "Estudio en Valencia", price: 850, type: "Apartamento", mode: "Alquiler", rooms: 1, baths: 1, area: 45, image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800", description: "Студия для долгосрочной аренды." }
];

export default function App() {
  const [mode, setMode] = useState('Venta'); // 'Venta' (Продажа) или 'Alquiler' (Аренда)
  const [maxPrice, setMaxPrice] = useState(500000);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);

  useEffect(() => {
    const result = propertiesData.filter(item => item.mode === mode && item.price <= maxPrice);
    setFilteredProperties(result);
  }, [mode, maxPrice]);

  const adjustPrice = (amount) => setMaxPrice(prev => Math.max(0, prev + amount));

  return (
    <div style={styles.app}>
      <header style={styles.header}>
        <div style={styles.container}>
          <div style={styles.headerContent}>
            <h1 style={styles.logo}><Building2 /> Invest<span>Life</span></h1>
            <div style={styles.modeTabs}>
              <button onClick={() => {setMode('Venta'); setMaxPrice(500000)}} style={mode === 'Venta' ? styles.activeTab : styles.tab}>Продажа</button>
              <button onClick={() => {setMode('Alquiler'); setMaxPrice(2000)}} style={mode === 'Alquiler' ? styles.activeTab : styles.tab}>Аренда</button>
            </div>
          </div>
        </div>
      </header>

      <section style={styles.hero}>
        <div style={styles.container}>
          <h2 style={styles.heroTitle}>{mode === 'Venta' ? 'Покупка недвижимости' : 'Аренда жилья'}</h2>
          <div style={styles.filterBox}>
            <p style={styles.filterLabel}>Макс. цена: <span style={styles.priceValue}>{maxPrice.toLocaleString()} €</span></p>
            <div style={styles.priceControls}>
              <button onClick={() => adjustPrice(-1000)} style={styles.priceBtn}><Minus size={16}/> 1000</button>
              <div style={styles.priceBar}><div style={{...styles.priceFill, width: `${(maxPrice/1000000)*100}%`}}></div></div>
              <button onClick={() => adjustPrice(1000)} style={styles.priceBtn}><Plus size={16}/> 1000</button>
            </div>
          </div>
        </div>
      </section>

      <main style={styles.container}>
        <div style={styles.grid}>
          {filteredProperties.length > 0 ? filteredProperties.map(prop => (
            <div key={prop.id} style={styles.card} onClick={() => setSelectedProperty(prop)}>
              <div style={styles.badge}>{prop.mode === 'Venta' ? 'Продажа' : 'Аренда'}</div>
              <img src={prop.image} style={styles.cardImg} alt="property" />
              <div style={styles.cardInfo}>
                <p style={styles.cardPrice}>{prop.price.toLocaleString()} €{prop.mode === 'Alquiler' && '/мес'}</p>
                <h3 style={styles.cardTitle}>{prop.title}</h3>
                <div style={styles.cardSpecs}>
                  <span><Bed size={16}/> {prop.rooms}</span>
                  <span><Bath size={16}/> {prop.baths}</span>
                  <span><Maximize size={16}/> {prop.area}м²</span>
                </div>
              </div>
            </div>
          )) : <p style={{textAlign:'center', gridColumn:'1/-1'}}>Ничего не найдено в этом бюджете...</p>}
        </div>
      </main>

      {selectedProperty && (
        <div style={styles.overlay} onClick={() => setSelectedProperty(null)}>
          <div style={styles.modal} onClick={e => e.stopPropagation()}>
            <button style={styles.closeBtn} onClick={() => setSelectedProperty(null)}><X /></button>
            <img src={selectedProperty.image} style={styles.modalImg} />
            <div style={styles.modalBody}>
              <h2 style={styles.modalTitle}>{selectedProperty.title}</h2>
              <p style={styles.modalDesc}>{selectedProperty.description}</p>
              <button style={styles.mainBtn}><Phone size={20}/> Связаться с агентом</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  app: { fontFamily: "'Inter', sans-serif", backgroundColor: '#f0f2f5', minHeight: '100vh' },
  container: { maxWidth: '1400px', margin: '0 auto', padding: '0 30px' },
  header: { backgroundColor: '#fff', padding: '15px 0', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', position: 'sticky', top: 0, zIndex: 10 },
  headerContent: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  logo: { display: 'flex', alignItems: 'center', gap: '10px', color: '#2563eb', margin: 0, fontSize: '26px' },
  modeTabs: { display: 'flex', backgroundColor: '#f1f5f9', borderRadius: '12px', padding: '4px' },
  tab: { padding: '10px 25px', border: 'none', background: 'none', cursor: 'pointer', fontWeight: '600', color: '#64748b' },
  activeTab: { padding: '10px 25px', border: 'none', backgroundColor: '#fff', borderRadius: '10px', color: '#2563eb', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', cursor: 'pointer', fontWeight: 'bold' },
  hero: { padding: '80px 0', background: '#1e293b', color: '#fff', textAlign: 'center' },
  heroTitle: { fontSize: '42px', marginBottom: '40px', fontWeight: '800' },
  filterBox: { backgroundColor: 'rgba(255,255,255,0.05)', padding: '30px', borderRadius: '24px', maxWidth: '600px', margin: '0 auto', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' },
  filterLabel: { margin: '0 0 15px 0', fontSize: '18px' },
  priceValue: { color: '#60a5fa', fontWeight: 'bold', fontSize: '22px' },
  priceControls: { display: 'flex', alignItems: 'center', gap: '20px' },
  priceBtn: { backgroundColor: '#334155', color: '#fff', border: 'none', padding: '10px 15px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' },
  priceBar: { flex: 1, height: '6px', backgroundColor: '#334155', borderRadius: '3px', overflow: 'hidden' },
  priceFill: { height: '100%', backgroundColor: '#2563eb', transition: '0.3s' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '40px', padding: '60px 0' },
  card: { backgroundColor: '#fff', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', cursor: 'pointer', transition: 'transform 0.3s', position: 'relative' },
  badge: { position: 'absolute', top: '20px', left: '20px', backgroundColor: 'rgba(0,0,0,0.5)', color: '#fff', padding: '5px 15px', borderRadius: '20px', backdropFilter: 'blur(5px)', fontSize: '12px' },
  cardImg: { width: '100%', height: '280px', objectFit: 'cover' },
  cardInfo: { padding: '25px' },
  cardPrice: { fontSize: '24px', fontWeight: '800', color: '#2563eb', margin: 0 },
  cardTitle: { fontSize: '20px', margin: '10px 0', color: '#1e293b' },
  cardSpecs: { display: 'flex', gap: '20px', color: '#64748b' },
  overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' },
  modal: { backgroundColor: '#fff', maxWidth: '900px', width: '100%', borderRadius: '30px', overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column' },
  modalImg: { width: '100%', height: '400px', objectFit: 'cover' },
  modalBody: { padding: '40px' },
  mainBtn: { width: '100%', padding: '20px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '15px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '30px' },
  closeBtn: { position: 'absolute', top: '20px', right: '20px', backgroundColor: '#fff', border: 'none', borderRadius: '50%', padding: '10px', cursor: 'pointer' }
};