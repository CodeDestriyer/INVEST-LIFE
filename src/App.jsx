import './App.css'
import React, { useState, useEffect } from 'react';

// Стили CSS
const styles = `
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Header */
.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem 0;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo-icon {
  width: 40px;
  height: 40px;
  background: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.header-nav {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: opacity 0.3s;
  cursor: pointer;
}

.nav-link:hover {
  opacity: 0.8;
}

.contact-btn {
  background: white;
  color: #667eea;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
}

.contact-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

/* Filter */
.filter {
  background: white;
  padding: 2rem;
  margin: 2rem 0;
  border-radius: 15px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.1);
}

.filter-title {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #333;
  font-weight: 600;
}

.filter-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.filter-group {
  display: flex;
  flex-direction: column;
}

.filter-label {
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #555;
}

.filter-select, .filter-input {
  padding: 0.8rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
  background: white;
}

.filter-select:focus, .filter-input:focus {
  outline: none;
  border-color: #667eea;
}

.filter-buttons {
  display: flex;
  gap: 1rem;
}

.reset-btn {
  padding: 0.8rem 2rem;
  background: #f1f1f1;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.3s;
}

.reset-btn:hover {
  background: #e0e0e0;
}

/* Catalog */
.catalog {
  margin: 2rem 0;
}

.catalog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.catalog-title {
  font-size: 1.8rem;
  color: #333;
  font-weight: 600;
}

.results-count {
  color: #666;
  font-size: 1.1rem;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

/* Card */
.card {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 35px rgba(0,0,0,0.15);
}

.card-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.card-badge {
  position: absolute;
  top: 15px;
  right: 15px;
  background: #667eea;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.9rem;
}

.card-content {
  padding: 1.5rem;
}

.card-price {
  font-size: 1.8rem;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 0.5rem;
}

.card-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #333;
}

.card-address {
  color: #666;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 5px;
}

.card-features {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.feature {
  display: flex;
  align-items: center;
  gap: 5px;
  color: #555;
  font-size: 0.95rem;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid #e0e0e0;
}

.card-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.7rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: opacity 0.3s;
}

.card-btn:hover {
  opacity: 0.9;
}

.favorite-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  transition: transform 0.3s;
}

.favorite-btn:hover {
  transform: scale(1.2);
}

.no-results {
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 15px;
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
}

.no-results h3 {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1rem;
}

.no-results p {
  color: #666;
  font-size: 1.1rem;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal {
  background: white;
  border-radius: 20px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  animation: modalAppear 0.3s ease;
}

@keyframes modalAppear {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.modal-header {
  position: relative;
  padding: 2rem;
  border-bottom: 1px solid #e0e0e0;
}

.modal-close {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: #f1f1f1;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s;
}

.modal-close:hover {
  background: #e0e0e0;
}

.modal-badge {
  display: inline-block;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 600;
  margin-bottom: 1rem;
}

.modal-title {
  font-size: 2rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.modal-price {
  font-size: 2.5rem;
  font-weight: 700;
  color: #667eea;
}

.modal-body {
  padding: 2rem;
}

.modal-section {
  margin-bottom: 2rem;
}

.modal-section-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 10px;
}

.modal-features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.modal-feature {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.modal-feature-icon {
  font-size: 1.5rem;
}

.modal-feature-text {
  display: flex;
  flex-direction: column;
}

.modal-feature-label {
  font-size: 0.85rem;
  color: #666;
}

.modal-feature-value {
  font-weight: 600;
  color: #333;
}

.modal-description {
  color: #555;
  line-height: 1.6;
  font-size: 1.05rem;
}

.modal-amenities {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.amenity-tag {
  background: #e8f0fe;
  color: #667eea;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 500;
  font-size: 0.95rem;
}

.modal-footer {
  padding: 2rem;
  border-top: 1px solid #e0e0e0;
  display: flex;
  gap: 1rem;
}

.modal-btn {
  flex: 1;
  padding: 1rem;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  font-size: 1.05rem;
  cursor: pointer;
  transition: transform 0.3s;
}

.modal-btn:hover {
  transform: translateY(-2px);
}

.modal-btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.modal-btn-secondary {
  background: #f1f1f1;
  color: #333;
}

@media (max-width: 768px) {
  .header-nav {
    gap: 1rem;
  }
  
  .nav-link {
    display: none;
  }
  
  .filter-grid {
    grid-template-columns: 1fr;
  }
  
  .cards-grid {
    grid-template-columns: 1fr;
  }
}
`;

// Header Component
const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <div className="logo-icon">🏠</div>
            InvestLife
          </div>
          <nav className="header-nav">
            <a href="#" className="nav-link">Каталог</a>
            <a href="#" className="nav-link">О компании</a>
            <a href="#" className="nav-link">Услуги</a>
            <button className="contact-btn">Связаться</button>
          </nav>
        </div>
      </div>
    </header>
  );
};

// Filter Component
const Filter = ({ filters, setFilters, onReset }) => {
  const handleChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="container">
      <div className="filter">
        <h2 className="filter-title">Найдите свою недвижимость</h2>
        <div className="filter-grid">
          <div className="filter-group">
            <label className="filter-label">Тип недвижимости</label>
            <select 
              className="filter-select"
              value={filters.type}
              onChange={(e) => handleChange('type', e.target.value)}
            >
              <option value="">Все типы</option>
              <option value="Квартира">Квартира</option>
              <option value="Дом">Дом</option>
              <option value="Таунхаус">Таунхаус</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label className="filter-label">Количество комнат</label>
            <select 
              className="filter-select"
              value={filters.rooms}
              onChange={(e) => handleChange('rooms', e.target.value)}
            >
              <option value="">Любое</option>
              <option value="1">1 комната</option>
              <option value="2">2 комнаты</option>
              <option value="3">3 комнаты</option>
              <option value="4">4+ комнаты</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label className="filter-label">Цена от (₽)</label>
            <input 
              type="number" 
              className="filter-input"
              placeholder="От"
              step="100000"
              value={filters.priceFrom}
              onChange={(e) => handleChange('priceFrom', e.target.value)}
            />
          </div>
          
          <div className="filter-group">
            <label className="filter-label">Цена до (₽)</label>
            <input 
              type="number" 
              className="filter-input"
              placeholder="До"
              step="100000"
              value={filters.priceTo}
              onChange={(e) => handleChange('priceTo', e.target.value)}
            />
          </div>
        </div>
        <div className="filter-buttons">
          <button className="reset-btn" onClick={onReset}>Сбросить фильтры</button>
        </div>
      </div>
    </div>
  );
};

// Card Component
const Card = ({ property, onFavorite, isFavorite, onShowDetails }) => {
  return (
    <div className="card">
      <div style={{ position: 'relative' }}>
        <div className="card-image" />
        <div className="card-badge">{property.type}</div>
      </div>
      <div className="card-content">
        <div className="card-price">{property.price.toLocaleString('ru-RU')} ₽</div>
        <h3 className="card-title">{property.title}</h3>
        <div className="card-address">📍 {property.address}</div>
        <div className="card-features">
          <div className="feature">🛏️ {property.rooms} комн.</div>
          <div className="feature">📐 {property.area} м²</div>
          <div className="feature">🏢 {property.floor} этаж</div>
        </div>
        <div className="card-footer">
          <button className="card-btn" onClick={() => onShowDetails(property)}>Подробнее</button>
          <button 
            className="favorite-btn"
            onClick={() => onFavorite(property.id)}
          >
            {isFavorite ? '❤️' : '🤍'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Catalog Component
const Catalog = ({ properties, favorites, onFavorite, onShowDetails }) => {
  return (
    <div className="container">
      <div className="catalog">
        <div className="catalog-header">
          <h2 className="catalog-title">Наши предложения</h2>
          <div className="results-count">Найдено: {properties.length} объектов</div>
        </div>
        {properties.length > 0 ? (
          <div className="cards-grid">
            {properties.map(property => (
              <Card 
                key={property.id} 
                property={property}
                onFavorite={onFavorite}
                isFavorite={favorites.includes(property.id)}
                onShowDetails={onShowDetails}
              />
            ))}
          </div>
        ) : (
          <div className="no-results">
            <h3>Ничего не найдено</h3>
            <p>Попробуйте изменить параметры поиска</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Property Modal Component
const PropertyModal = ({ property, onClose, onFavorite, isFavorite }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <button className="modal-close" onClick={onClose}>✕</button>
          <div className="modal-badge">{property.type}</div>
          <h2 className="modal-title">{property.title}</h2>
          <div className="modal-price">{property.price.toLocaleString('ru-RU')} ₽</div>
        </div>
        
        <div className="modal-body">
          <div className="modal-section">
            <h3 className="modal-section-title">📍 Адрес</h3>
            <p className="modal-description">{property.address}</p>
          </div>

          <div className="modal-section">
            <h3 className="modal-section-title">🏠 Основные характеристики</h3>
            <div className="modal-features-grid">
              <div className="modal-feature">
                <div className="modal-feature-icon">🛏️</div>
                <div className="modal-feature-text">
                  <span className="modal-feature-label">Комнат</span>
                  <span className="modal-feature-value">{property.rooms}</span>
                </div>
              </div>
              <div className="modal-feature">
                <div className="modal-feature-icon">📐</div>
                <div className="modal-feature-text">
                  <span className="modal-feature-label">Площадь</span>
                  <span className="modal-feature-value">{property.area} м²</span>
                </div>
              </div>
              <div className="modal-feature">
                <div className="modal-feature-icon">🏢</div>
                <div className="modal-feature-text">
                  <span className="modal-feature-label">Этаж</span>
                  <span className="modal-feature-value">{property.floor} из {property.totalFloors}</span>
                </div>
              </div>
              <div className="modal-feature">
                <div className="modal-feature-icon">📅</div>
                <div className="modal-feature-text">
                  <span className="modal-feature-label">Год постройки</span>
                  <span className="modal-feature-value">{property.yearBuilt}</span>
                </div>
              </div>
              <div className="modal-feature">
                <div className="modal-feature-icon">🎨</div>
                <div className="modal-feature-text">
                  <span className="modal-feature-label">Ремонт</span>
                  <span className="modal-feature-value">{property.renovation}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-section">
            <h3 className="modal-section-title">📝 Описание</h3>
            <p className="modal-description">{property.description}</p>
          </div>

          <div className="modal-section">
            <h3 className="modal-section-title">✨ Удобства</h3>
            <div className="modal-amenities">
              {property.amenities.map((amenity, index) => (
                <span key={index} className="amenity-tag">{amenity}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="modal-btn modal-btn-primary">Связаться с агентом</button>
          <button 
            className="modal-btn modal-btn-secondary"
            onClick={() => onFavorite(property.id)}
          >
            {isFavorite ? '❤️ В избранном' : '🤍 В избранное'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [properties] = useState([
    { 
      id: 1, 
      type: 'Квартира', 
      title: 'Современная квартира в центре', 
      address: 'ул. Ленина, 45', 
      rooms: 2, 
      area: 65, 
      floor: 5,
      totalFloors: 12,
      price: 8500000,
      yearBuilt: 2021,
      renovation: 'Евроремонт',
      description: 'Прекрасная двухкомнатная квартира в центре города с современным ремонтом. Квартира полностью готова к проживанию, установлена вся необходимая техника и мебель.',
      amenities: ['Парковка', 'Лифт', 'Охрана', 'Детская площадка', 'Консьерж']
    },
    { 
      id: 2, 
      type: 'Дом', 
      title: 'Уютный дом с садом', 
      address: 'пос. Солнечный, 12', 
      rooms: 4, 
      area: 150, 
      floor: 2,
      totalFloors: 2,
      price: 12000000,
      yearBuilt: 2019,
      renovation: 'Чистовая отделка',
      description: 'Просторный загородный дом с большим садом и террасой. Идеально подходит для семьи. Развитая инфраструктура, рядом школа и детский сад.',
      amenities: ['Гараж', 'Сад', 'Терраса', 'Баня', 'Барбекю зона', 'Видеонаблюдение']
    },
    { 
      id: 3, 
      type: 'Квартира', 
      title: 'Просторная 3-комнатная', 
      address: 'пр. Мира, 78', 
      rooms: 3, 
      area: 85, 
      floor: 8,
      totalFloors: 16,
      price: 9800000,
      yearBuilt: 2020,
      renovation: 'Дизайнерский ремонт',
      description: 'Великолепная трехкомнатная квартира с панорамными окнами и видом на парк. Выполнен дизайнерский ремонт с использованием качественных материалов.',
      amenities: ['Подземная парковка', 'Фитнес-зал', 'Консьерж', 'Детская комната', 'Видеонаблюдение']
    },
    { 
      id: 4, 
      type: 'Таунхаус', 
      title: 'Таунхаус в новом ЖК', 
      address: 'ЖК Европейский, 5', 
      rooms: 3, 
      area: 120, 
      floor: 3,
      totalFloors: 3,
      price: 11500000,
      yearBuilt: 2022,
      renovation: 'Без отделки',
      description: 'Современный таунхаус в престижном жилом комплексе. Собственный двор, два санузла, возможность обустройства по своему вкусу.',
      amenities: ['Собственный двор', 'Парковка на 2 машины', 'Охрана', 'Детская площадка', 'Спортплощадка']
    },
    { 
      id: 5, 
      type: 'Квартира', 
      title: 'Студия в новостройке', 
      address: 'ул. Гагарина, 23', 
      rooms: 1, 
      area: 35, 
      floor: 12,
      totalFloors: 25,
      price: 5200000,
      yearBuilt: 2023,
      renovation: 'Предчистовая отделка',
      description: 'Компактная студия в новом доме бизнес-класса. Отличный вариант для молодой семьи или для инвестиций. Развитая инфраструктура района.',
      amenities: ['Лифт', 'Консьерж', 'Подземная парковка', 'Видеонаблюдение']
    },
    { 
      id: 6, 
      type: 'Дом', 
      title: 'Коттедж у озера', 
      address: 'пос. Лесной, 8', 
      rooms: 5, 
      area: 200, 
      floor: 2,
      totalFloors: 2,
      price: 15000000,
      yearBuilt: 2018,
      renovation: 'Премиум ремонт',
      description: 'Роскошный коттедж на берегу озера с собственным причалом. Премиальная отделка, встроенная техника, система умный дом. Живописный вид из окон.',
      amenities: ['Гараж на 3 машины', 'Причал', 'Баня', 'Бассейн', 'Ландшафтный дизайн', 'Система умный дом']
    },
  ]);

  const [filters, setFilters] = useState({
    type: '',
    rooms: '',
    priceFrom: '',
    priceTo: ''
  });

  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [favorites, setFavorites] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);

  useEffect(() => {
    let result = properties;

    if (filters.type) {
      result = result.filter(p => p.type === filters.type);
    }

    if (filters.rooms) {
      result = result.filter(p => p.rooms === parseInt(filters.rooms));
    }

    if (filters.priceFrom) {
      result = result.filter(p => p.price >= parseInt(filters.priceFrom));
    }

    if (filters.priceTo) {
      result = result.filter(p => p.price <= parseInt(filters.priceTo));
    }

    setFilteredProperties(result);
  }, [filters, properties]);

  const handleReset = () => {
    setFilters({
      type: '',
      rooms: '',
      priceFrom: '',
      priceTo: ''
    });
  };

  const handleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fId => fId !== id)
        : [...prev, id]
    );
  };

  const handleShowDetails = (property) => {
    setSelectedProperty(property);
  };

  const handleCloseModal = () => {
    setSelectedProperty(null);
  };

  return (
    <>
      <style>{styles}</style>
      <Header />
      <Filter filters={filters} setFilters={setFilters} onReset={handleReset} />
      <Catalog 
        properties={filteredProperties} 
        favorites={favorites}
        onFavorite={handleFavorite}
        onShowDetails={handleShowDetails}
      />
      {selectedProperty && (
        <PropertyModal 
          property={selectedProperty} 
          onClose={handleCloseModal}
          onFavorite={handleFavorite}
          isFavorite={favorites.includes(selectedProperty.id)}
        />
      )}
    </>
  );
};

export default App;