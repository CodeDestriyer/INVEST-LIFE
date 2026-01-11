import React, { useState, useEffect } from 'react';
import { Search, Home, Bed, Bath, Maximize, X, Phone } from 'lucide-react';

// Данные объектов (Каталог)
const propertiesData = [
  {
    id: 1,
    title: "Apartamento de Lujo en Marbella",
    price: 450000,
    type: "Apartamento",
    rooms: 3,
    baths: 2,
    area: 120,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    description: "Превосходные апартаменты с видом на море. Полностью меблированы, кондиционер, бассейн в жилом комплексе."
  },
  {
    id: 2,
    title: "Villa Moderna en Altea",
    price: 890000,
    type: "Villa",
    rooms: 5,
    baths: 4,
    area: 350,
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80",
    description: "Современная вилла с панорамным остеклением, собственным садом и приватным бассейном. Элитный район."
  },
  {
    id: 3,
    title: "Ático en el Centro de Madrid",
    price: 620000,
    type: "Atico",
    rooms: 2,
    baths: 1,
    area: 85,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
    description: "Уютный аттик в историческом центре. Огромная терраса 40м2, дизайнерский ремонт, лифт."
  }
];

export default function App() {
  const [filteredProperties, setFilteredProperties] = useState(propertiesData);
  const [selectedProperty, setSelectedProperty] = useState(null); // Для модального окна
  const [filters, setFilters] = useState({ type: '', maxPrice: '' });

  // Логика фильтрации
  useEffect(() => {
    let result = propertiesData.filter(item => {
      return (filters.type === '' || item.type === filters.type) &&
             (filters.maxPrice === '' || item.price <= parseInt(filters.maxPrice));
    });
    setFilteredProperties(result);
  }, [filters]);

  return (
    <div style={styles.app}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.container}>
          <h1 style={styles.logo}>Invest<span>Life</span></h1>
          <nav style={styles.nav}>
            <a href="#">Catálogo</a>
            <a href="#">Servicios</a>
            <button style={styles.contactBtn}>Contactar</button>
          </nav>
        </div>
      </header>

      {/* Hero & Filters */}
      <section style={styles.hero}>
        <div style={styles.container}>
          <h2 style={styles.heroTitle}>Найдите свой дом в Испании</h2>
          <div style={styles.filterBar}>
            <select 
              onChange={(e) => setFilters({...filters, type: e.target.value})}
              style={styles.select}
            >
              <option value="">Все типы</option>
              <option value="Apartamento">Апартаменты</option>
              <option value="Villa">Виллы</option>
              <option value="Atico">Аттики</option>
            </select>
            <input 
              type="number" 
              placeholder="Цена до (€)" 
              style={styles.input}
              onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
            />
            <button style={styles.searchBtn}><Search size={20} /> Buscar</button>
          </div>
        </div>
      </section>

      {/* Catalog */}
      <main style={styles.container}>
        <div style={styles.grid}>
          {filteredProperties.map(prop => (
            <div key={prop.id} style={styles.card} onClick={() => setSelectedProperty(prop)}>
              <img src={prop.image} alt={prop.title} style={styles.cardImg} />
              <div style={styles.cardBody}>
                <span style={styles.price}>{prop.price.toLocaleString()} €</span>
                <h3 style={styles.cardTitle}>{prop.title}</h3>
                <div style={styles.cardIcons}>
                  <span><Bed size={16} /> {prop.rooms}</span>
                  <span><Bath size={16} /> {prop.baths}</span>
                  <span><Maximize size={16} /> {prop.area} m²</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Модальное окно (Доп инфа) */}
      {selectedProperty && (
        <div style={styles.overlay} onClick={() => setSelectedProperty(null)}>
          <div style={styles.modal} onClick={e => e.stopPropagation()}>
            <button style={styles.closeBtn} onClick={() => setSelectedProperty(null)}><X /></button>
            <img src={selectedProperty.image} style={styles.modalImg} />
            <div style={styles.modalContent}>
              <h2 style={styles.modalTitle}>{selectedProperty.title}</h2>
              <p style={styles.modalPrice}>{selectedProperty.price.toLocaleString()} €</p>
              <p style={styles.modalDesc}>{selectedProperty.description}</p>
              <div style={styles.modalSpecs}>
                <div style={styles.specItem}><strong>Тип:</strong> {selectedProperty.type}</div>
                <div style={styles.specItem}><strong>Комнаты:</strong> {selectedProperty.rooms}</div>
                <div style={styles.specItem}><strong>Площадь:</strong> {selectedProperty.area} м²</div>
              </div>
              <button style={styles.callBtn}><Phone size={18} /> Заказать звонок</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  app: { fontFamily: "'Inter', sans-serif", backgroundColor: '#f8fafc', minHeight: '100vh', color: '#1e293b' },
  container: { maxWidth: '1200px', margin: '0 auto', padding: '0 20px' },
  header: { backgroundColor: '#fff', padding: '20px 0', borderBottom: '1px solid #e2e8f0', position: 'sticky', top: 0, zIndex: 100 },
  logo: { fontSize: '24px', fontWeight: 'bold', margin: 0, color: '#2563eb' },
  nav: { display: 'flex', alignItems: 'center', gap: '30px', float: 'right', marginTop: '-30px' },
  contactBtn: { backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' },
  hero: { padding: '60px 0', background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)', color: '#fff', textAlign: 'center' },
  heroTitle: { fontSize: '36px', marginBottom: '30px' },
  filterBar: { backgroundColor: '#fff', padding: '10px', borderRadius: '12px', display: 'flex', gap: '10px', maxWidth: '800px', margin: '0 auto' },
  select: { flex: 1, padding: '12px', border: '1px solid #e2e8f0', borderRadius: '8px', outline: 'none' },
  input: { flex: 1, padding: '12px', border: '1px solid #e2e8f0', borderRadius: '8px', outline: 'none' },
  searchBtn: { backgroundColor: '#1e293b', color: '#fff', border: 'none', padding: '0 25px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '30px', padding: '50px 0' },
  card: { backgroundColor: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', cursor: 'pointer', transition: '0.3s' },
  cardImg: { width: '100%', height: '240px', objectFit: 'cover' },
  cardBody: { padding: '20px' },
  price: { fontSize: '20px', fontWeight: 'bold', color: '#2563eb' },
  cardTitle: { fontSize: '18px', margin: '10px 0' },
  cardIcons: { display: 'flex', gap: '15px', color: '#64748b', fontSize: '14px' },
  overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 },
  modal: { backgroundColor: '#fff', width: '90%', maxWidth: '600px', borderRadius: '20px', overflow: 'hidden', position: 'relative' },
  closeBtn: { position: 'absolute', top: '15px', right: '15px', background: '#fff', border: 'none', borderRadius: '50%', padding: '5px', cursor: 'pointer', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' },
  modalImg: { width: '100%', height: '300px', objectFit: 'cover' },
  modalContent: { padding: '30px' },
  modalTitle: { margin: 0, fontSize: '24px' },
  modalPrice: { fontSize: '22px', color: '#2563eb', fontWeight: 'bold', margin: '10px 0' },
  modalDesc: { color: '#64748b', lineHeight: '1.6' },
  modalSpecs: { display: 'flex', gap: '20px', margin: '20px 0', padding: '15px 0', borderTop: '1px solid #eee' },
  callBtn: { width: '100%', backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '15px', borderRadius: '10px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', justifyContent: 'center', gap: '10px' }
};