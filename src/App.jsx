import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, Home, Bed, Bath, Maximize, X, Phone, Plus, Minus, 
  Building2, Mail, MapPin, Star, ShieldCheck, Globe, Users, 
  ChevronRight, Instagram, Facebook, Twitter, MessageSquare
} from 'lucide-react';

// --- БАЗА ДАННЫХ ОБЪЕКТОВ ---
const DB = [
  { id: 1, title: "Villa de Lujo 'La Zagaleta'", price: 3500000, type: "Villa", mode: "Venta", rooms: 6, baths: 5, area: 850, city: "Marbella", tags: ["Pool", "Garden"], image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1000", desc: "Эксклюзивная вилла в самом закрытом поселке Европы. Панорамный вид на Гибралтар." },
  { id: 2, title: "Ático Moderno Serrano", price: 1250000, type: "Atico", mode: "Venta", rooms: 3, baths: 2, area: 160, city: "Madrid", tags: ["Terrace"], image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1000", desc: "Дизайнерский пентхаус на золотой миле Мадрида. Собственный лифт и терраса." },
  { id: 3, title: "Loft Industrial Poblenou", price: 2200, type: "Apartamento", mode: "Alquiler", rooms: 1, baths: 1, area: 90, city: "Barcelona", tags: ["Design"], image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1000", desc: "Стильный лофт в самом креативном районе Барселоны. Высокие потолки, кирпичные стены." },
  { id: 4, title: "Chalet Familiar Godella", price: 580000, type: "Chalet", mode: "Venta", rooms: 4, baths: 3, area: 220, city: "Valencia", tags: ["Quiet"], image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1000", desc: "Уютный семейный дом в пригороде Валенсии. Рядом лучшие международные школы." },
  { id: 5, title: "Piso Paseo de Gracia", price: 4500, type: "Apartamento", mode: "Alquiler", rooms: 3, baths: 2, area: 140, city: "Barcelona", tags: ["Luxury"], image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1000", desc: "Апартаменты премиум-класса с видом на дом Бальо. Консьерж 24/7." },
  { id: 6, title: "Apartamento Playa Postiguet", price: 1100, type: "Apartamento", mode: "Alquiler", rooms: 2, baths: 1, area: 65, city: "Alicante", tags: ["Beach"], image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1000", desc: "Первая линия моря. Просыпайтесь под шум волн. Полностью укомплектована." },
  { id: 7, title: "Finca Rústica Mallorca", price: 2100000, type: "Villa", mode: "Venta", rooms: 5, baths: 4, area: 400, city: "Mallorca", tags: ["Nature"], image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1000", desc: "Традиционная майоркинская финка с современным ремонтом среди оливковых рощ." },
  { id: 8, title: "Estudio Sol", price: 950, type: "Apartamento", mode: "Alquiler", rooms: 1, baths: 1, area: 40, city: "Madrid", tags: ["Center"], image: "https://images.unsplash.com/photo-1536376074432-bf132d67d7cc?w=1000", desc: "Компактная студия в самом сердце столицы. Идеально для одного человека или пары." },
  { id: 9, title: "Villa Blanca", price: 1850000, type: "Villa", mode: "Venta", rooms: 5, baths: 5, area: 550, city: "Ibiza", tags: ["Pool", "View"], image: "https://images.unsplash.com/photo-1575517111478-7f6afd0973bb?w=1000", desc: "Белоснежная вилла в стиле минимализм с видом на Эс Ведра." },
  { id: 10, title: "Piso Moderno Ruzafa", price: 1350, type: "Apartamento", mode: "Alquiler", rooms: 2, baths: 2, area: 95, city: "Valencia", tags: ["Trendy"], image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1000", desc: "Квартира в самом модном районе Валенсии. Рядом рынок Рузафа и лучшие бары." },
];

// --- ВСПОМОГАТЕЛЬНЫЕ КОМПОНЕНТЫ ---
const Navbar = ({ mode, setMode, scrollTo }) => (
  <nav style={styles.nav}>
    <div style={styles.containerWide}>
      <div style={styles.navFlex}>
        <div style={styles.logo} onClick={() => window.scrollTo(0,0)}>
          <Building2 size={32} color="#2563eb" />
          <span>INVEST<b style={{color:'#1e293b'}}>LIFE</b></span>
        </div>
        <div style={styles.navLinks}>
          <button onClick={() => scrollTo('catalog')} style={styles.linkBtn}>Каталог</button>
          <button onClick={() => scrollTo('about')} style={styles.linkBtn}>О нас</button>
          <button onClick={() => scrollTo('services')} style={styles.linkBtn}>Услуги</button>
          <button onClick={() => scrollTo('contacts')} style={styles.linkBtn}>Контакты</button>
        </div>
        <div style={styles.modeToggle}>
          <button 
            onClick={() => setMode('Venta')} 
            style={mode === 'Venta' ? styles.tabActive : styles.tab}
          >Продажа</button>
          <button 
            onClick={() => setMode('Alquiler')} 
            style={mode === 'Alquiler' ? styles.tabActive : styles.tab}
          >Аренда</button>
        </div>
      </div>
    </div>
  </nav>
);

const SectionTitle = ({ title, subtitle }) => (
  <div style={styles.sectionHeader}>
    <h2 style={styles.sectionTitle}>{title}</h2>
    <div style={styles.titleLine}></div>
    <p style={styles.sectionSubtitle}>{subtitle}</p>
  </div>
);

// --- ОСНОВНОЕ ПРИЛОЖЕНИЕ ---
export default function App() {
  const [mode, setMode] = useState('Venta');
  const [maxPrice, setMaxPrice] = useState(mode === 'Venta' ? 2000000 : 3000);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [searchCity, setSearchCity] = useState('');

  // Сброс цены при смене режима
  useEffect(() => {
    setMaxPrice(mode === 'Venta' ? 2000000 : 3000);
  }, [mode]);

  const filteredItems = useMemo(() => {
    return DB.filter(item => 
      item.mode === mode && 
      item.price <= maxPrice &&
      (searchCity === '' || item.city.toLowerCase().includes(searchCity.toLowerCase()))
    );
  }, [mode, maxPrice, searchCity]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const adjustPrice = (amount) => {
    setMaxPrice(prev => Math.max(0, prev + amount));
  };

  return (
    <div style={styles.app}>
      <Navbar mode={mode} setMode={setMode} scrollTo={scrollTo} />

      {/* HERO SECTION */}
      <header style={styles.hero}>
        <div style={styles.heroOverlay}></div>
        <div style={styles.container}>
          <div style={styles.heroContent}>
            <span style={styles.heroBadge}>Премиальная недвижимость в Испании</span>
            <h1 style={styles.heroH1}>Найдите место, где <br/> начинается ваша история</h1>
            
            <div style={styles.searchBar}>
              <div style={styles.searchItem}>
                <MapPin size={20} color="#2563eb" />
                <input 
                  placeholder="Город (Madrid, Barcelona...)" 
                  style={styles.searchInput}
                  value={searchCity}
                  onChange={(e) => setSearchCity(e.target.value)}
                />
              </div>
              <div style={styles.divider}></div>
              <div style={styles.searchItem}>
                <span style={styles.priceLabel}>До: <b>{maxPrice.toLocaleString()} €</b></span>
                <div style={styles.priceActions}>
                  <button onClick={() => adjustPrice(mode === 'Venta' ? -10000 : -1000)} style={styles.pBtn}><Minus size={14}/></button>
                  <button onClick={() => adjustPrice(mode === 'Venta' ? 10000 : 1000)} style={styles.pBtn}><Plus size={14}/></button>
                </div>
              </div>
              <button style={styles.mainSearchBtn} onClick={() => scrollTo('catalog')}>
                <Search size={20} /> Поиск
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* STATS */}
      <div style={styles.statsBar}>
        <div style={styles.containerWide}>
          <div style={styles.statsGrid}>
            <div style={styles.statItem}><b>15+</b> <span>Лет опыта</span></div>
            <div style={styles.statItem}><b>500+</b> <span>Объектов</span></div>
            <div style={styles.statItem}><b>100%</b> <span>Безопасность</span></div>
            <div style={styles.statItem}><b>24/7</b> <span>Поддержка</span></div>
          </div>
        </div>
      </div>

      {/* CATALOG SECTION */}
      <section id="catalog" style={styles.section}>
        <div style={styles.containerWide}>
          <SectionTitle 
            title={mode === 'Venta' ? "Каталог Продажи" : "Каталог Аренды"} 
            subtitle="Лучшие предложения, отобранные нашими экспертами вручную" 
          />
          
          <div style={styles.grid}>
            {filteredItems.map(item => (
              <div key={item.id} style={styles.card} onClick={() => setSelectedProperty(item)}>
                <div style={styles.imgWrapper}>
                  <img src={item.image} alt={item.title} style={styles.cardImg} />
                  <div style={styles.cardCity}>{item.city}</div>
                </div>
                <div style={styles.cardBody}>
                  <div style={styles.cardPrice}>{item.price.toLocaleString()} €{item.mode === 'Alquiler' && '/мес'}</div>
                  <h3 style={styles.cardTitle}>{item.title}</h3>
                  <div style={styles.cardIcons}>
                    <div style={styles.iconInfo}><Bed size={18}/> {item.rooms}</div>
                    <div style={styles.iconInfo}><Bath size={18}/> {item.baths}</div>
                    <div style={styles.iconInfo}><Maximize size={18}/> {item.area}м²</div>
                  </div>
                  <div style={styles.cardFooter}>
                    <button style={styles.detailsBtn}>Подробнее <ChevronRight size={16}/></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" style={{...styles.section, backgroundColor: '#fff'}}>
        <div style={styles.container}>
          <div style={styles.aboutFlex}>
            <div style={styles.aboutImg}>
              <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800" style={styles.roundImg} alt="office" />
              <div style={styles.experienceBadge}><b>18</b> лет в Испании</div>
            </div>
            <div style={styles.aboutText}>
              <SectionTitle title="InvestLife" subtitle="Ваш надежный партнер в мире недвижимости" />
              <p style={styles.p}>Мы не просто продаем квадратные метры. Мы помогаем найти дом вашей мечты в солнечной Испании. Наша команда берет на себя все юридические тонкости, чтобы вы могли наслаждаться процессом.</p>
              <ul style={styles.list}>
                <li><ShieldCheck color="#2563eb" /> Полное юридическое сопровождение</li>
                <li><Globe color="#2563eb" /> Подбор объектов по всей стране</li>
                <li><Users color="#2563eb" /> Индивидуальный подход к каждому клиенту</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" style={styles.section}>
        <div style={styles.containerWide}>
          <SectionTitle title="Наши услуги" subtitle="Мы делаем процесс покупки и аренды простым" />
          <div style={styles.servicesGrid}>
            <div style={styles.serviceCard}>
              <Home size={40} color="#2563eb" />
              <h3>Продажа</h3>
              <p>От подбора объекта до получения ключей и оформления ВНЖ.</p>
            </div>
            <div style={styles.serviceCard}>
              <MessageSquare size={40} color="#2563eb" />
              <h3>Консалтинг</h3>
              <p>Анализ рынка, оценка инвестиционной привлекательности объектов.</p>
            </div>
            <div style={styles.serviceCard}>
              <Mail size={40} color="#2563eb" />
              <h3>Управление</h3>
              <p>Сдадим вашу недвижимость в аренду и проследим за порядком.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACTS SECTION */}
      <section id="contacts" style={styles.contactSection}>
        <div style={styles.container}>
          <div style={styles.contactCard}>
            <div style={styles.contactInfo}>
              <h2>Свяжитесь с нами</h2>
              <p>Оставьте заявку, и наш менеджер перезвонит вам в течение 15 минут.</p>
              <div style={styles.infoLine}><Phone size={20}/> +34 900 123 456</div>
              <div style={styles.infoLine}><Mail size={20}/> info@investlife.es</div>
              <div style={styles.infoLine}><MapPin size={20}/> Calle de Velázquez, 100, Madrid</div>
            </div>
            <form style={styles.contactForm} onSubmit={e => e.preventDefault()}>
              <input style={styles.formInput} placeholder="Ваше имя" />
              <input style={styles.formInput} placeholder="Телефон или WhatsApp" />
              <textarea style={styles.formTextarea} placeholder="Ваше сообщение..."></textarea>
              <button style={styles.formBtn}>Отправить заявку</button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <div style={styles.containerWide}>
          <div style={styles.footerGrid}>
            <div>
              <div style={styles.logoWhite}>INVEST<span>LIFE</span></div>
              <p>Лучшая недвижимость в Испании от экспертов рынка.</p>
            </div>
            <div>
              <h4>Навигация</h4>
              <p onClick={() => scrollTo('catalog')}>Каталог</p>
              <p onClick={() => scrollTo('about')}>О компании</p>
            </div>
            <div>
              <h4>Соцсети</h4>
              <div style={styles.socials}>
                <Instagram size={20} /> <Facebook size={20} /> <Twitter size={20} />
              </div>
            </div>
          </div>
          <div style={styles.copyright}>© 2026 InvestLife S.L. Все права защищены.</div>
        </div>
      </footer>

      {/* MODAL */}
      {selectedProperty && (
        <div style={styles.overlay} onClick={() => setSelectedProperty(null)}>
          <div style={styles.modal} onClick={e => e.stopPropagation()}>
            <button style={styles.closeBtn} onClick={() => setSelectedProperty(null)}><X /></button>
            <div style={styles.modalBody}>
              <div style={styles.modalImgSide}>
                <img src={selectedProperty.image} style={styles.modalImage} alt="prop" />
              </div>
              <div style={styles.modalTextSide}>
                <span style={styles.modalBadge}>{selectedProperty.city} • {selectedProperty.type}</span>
                <h2 style={styles.modalTitle}>{selectedProperty.title}</h2>
                <div style={styles.modalPrice}>{selectedProperty.price.toLocaleString()} €</div>
                <p style={styles.modalDesc}>{selectedProperty.desc}</p>
                <div style={styles.modalSpecs}>
                  <div style={styles.spec}><Bed /> {selectedProperty.rooms} Комн.</div>
                  <div style={styles.spec}><Bath /> {selectedProperty.baths} Ванн.</div>
                  <div style={styles.spec}><Maximize /> {selectedProperty.area} м²</div>
                </div>
                <button style={styles.modalCallBtn}><Phone size={20}/> Забронировать просмотр</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- СТИЛИ (CSS-in-JS) ---
const styles = {
  app: { fontFamily: "'Plus Jakarta Sans', sans-serif", backgroundColor: '#f8fafc', color: '#1e293b' },
  container: { maxWidth: '1200px', margin: '0 auto', padding: '0 20px' },
  containerWide: { maxWidth: '1440px', margin: '0 auto', padding: '0 40px' },
  
  // NAV
  nav: { backgroundColor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 1000, borderBottom: '1px solid #e2e8f0', padding: '15px 0' },
  navFlex: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  logo: { display: 'flex', alignItems: 'center', gap: '10px', fontSize: '22px', fontWeight: '800', cursor: 'pointer', letterSpacing: '-1px' },
  navLinks: { display: 'flex', gap: '25px' },
  linkBtn: { background: 'none', border: 'none', fontSize: '15px', fontWeight: '600', color: '#64748b', cursor: 'pointer', transition: '0.2s' },
  modeToggle: { display: 'flex', backgroundColor: '#f1f5f9', borderRadius: '12px', padding: '4px' },
  tab: { padding: '8px 20px', border: 'none', borderRadius: '10px', cursor: 'pointer', fontSize: '14px', fontWeight: '600', color: '#64748b', transition: '0.3s' },
  tabActive: { padding: '8px 20px', border: 'none', borderRadius: '10px', cursor: 'pointer', fontSize: '14px', fontWeight: '700', backgroundColor: '#fff', color: '#2563eb', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' },

  // HERO
  hero: { height: '80vh', position: 'relative', display: 'flex', alignItems: 'center', backgroundImage: 'url(https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600)', backgroundSize: 'cover', backgroundPosition: 'center', color: '#fff' },
  heroOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.2))' },
  heroContent: { position: 'relative', zIndex: 1, maxWidth: '800px' },
  heroBadge: { backgroundColor: '#2563eb', padding: '6px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: 'bold' },
  heroH1: { fontSize: '64px', fontWeight: '850', margin: '20px 0', lineHeight: '1.1' },
  searchBar: { backgroundColor: '#fff', borderRadius: '20px', padding: '10px', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', marginTop: '40px' },
  searchItem: { flex: 1, display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 20px' },
  searchInput: { border: 'none', outline: 'none', fontSize: '16px', width: '100%' },
  divider: { width: '1px', height: '40px', backgroundColor: '#e2e8f0' },
  priceLabel: { color: '#64748b', fontSize: '13px' },
  priceActions: { display: 'flex', gap: '5px', marginLeft: '10px' },
  pBtn: { width: '28px', height: '28px', borderRadius: '50%', border: '1px solid #e2e8f0', backgroundColor: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  mainSearchBtn: { backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '15px 35px', borderRadius: '15px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' },

  // STATS
  statsBar: { backgroundColor: '#fff', padding: '30px 0', borderBottom: '1px solid #e2e8f0' },
  statsGrid: { display: 'flex', justifyContent: 'space-around' },
  statItem: { textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '5px' },

  // SECTIONS
  section: { padding: '100px 0' },
  sectionHeader: { textAlign: 'center', marginBottom: '60px' },
  sectionTitle: { fontSize: '36px', fontWeight: '800', margin: '0 0 15px 0' },
  titleLine: { width: '60px', height: '4px', backgroundColor: '#2563eb', margin: '0 auto 20px' },
  sectionSubtitle: { color: '#64748b', fontSize: '18px' },

  // GRID & CARDS
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '30px' },
  card: { backgroundColor: '#fff', borderRadius: '24px', overflow: 'hidden', border: '1px solid #e2e8f0', cursor: 'pointer', transition: '0.3s' },
  imgWrapper: { position: 'relative', height: '280px', overflow: 'hidden' },
  cardImg: { width: '100%', height: '100%', objectFit: 'cover', transition: '0.5s' },
  cardCity: { position: 'absolute', bottom: '15px', left: '15px', backgroundColor: 'rgba(255,255,255,0.9)', padding: '5px 12px', borderRadius: '10px', fontSize: '12px', fontWeight: 'bold' },
  cardBody: { padding: '25px' },
  cardPrice: { fontSize: '26px', fontWeight: '850', color: '#2563eb' },
  cardTitle: { fontSize: '20px', margin: '12px 0', fontWeight: '700' },
  cardIcons: { display: 'flex', gap: '20px', color: '#64748b', paddingBottom: '20px', borderBottom: '1px solid #f1f5f9' },
  iconInfo: { display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px' },
  cardFooter: { marginTop: '20px' },
  detailsBtn: { background: 'none', border: 'none', color: '#2563eb', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' },

  // ABOUT
  aboutFlex: { display: 'flex', alignItems: 'center', gap: '60px' },
  aboutImg: { flex: 1, position: 'relative' },
  roundImg: { width: '100%', borderRadius: '40px' },
  experienceBadge: { position: 'absolute', bottom: '-20px', right: '-20px', backgroundColor: '#2563eb', color: '#fff', padding: '30px', borderRadius: '50% 50% 50% 0', textAlign: 'center' },
  aboutText: { flex: 1.2 },
  p: { fontSize: '18px', lineHeight: '1.8', color: '#64748b' },
  list: { listStyle: 'none', padding: 0, marginTop: '30px' },

  // SERVICES
  servicesGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '30px' },
  serviceCard: { padding: '50px', backgroundColor: '#fff', borderRadius: '30px', textAlign: 'center', border: '1px solid #e2e8f0' },

  // CONTACT
  contactSection: { padding: '100px 0', background: 'linear-gradient(to bottom, #f8fafc, #e2e8f0)' },
  contactCard: { backgroundColor: '#1e293b', borderRadius: '40px', display: 'flex', overflow: 'hidden', color: '#fff' },
  contactInfo: { flex: 1, padding: '60px' },
  contactForm: { flex: 1, backgroundColor: '#fff', padding: '60px', display: 'flex', flexDirection: 'column', gap: '20px' },
  formInput: { padding: '18px', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '16px' },
  formTextarea: { padding: '18px', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '16px', height: '120px' },
  formBtn: { backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '18px', borderRadius: '12px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' },

  // FOOTER
  footer: { backgroundColor: '#0f172a', color: '#94a3b8', padding: '80px 0 40px' },
  footerGrid: { display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '100px', marginBottom: '60px' },
  logoWhite: { fontSize: '28px', fontWeight: '800', color: '#fff', marginBottom: '20px' },
  socials: { display: 'flex', gap: '20px', marginTop: '15px' },
  copyright: { borderTop: '1px solid #1e293b', paddingTop: '40px', textAlign: 'center' },

  // MODAL
  overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.9)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' },
  modal: { backgroundColor: '#fff', maxWidth: '1100px', width: '100%', borderRadius: '40px', overflow: 'hidden', position: 'relative' },
  modalBody: { display: 'flex', height: '700px' },
  modalImgSide: { flex: 1 },
  modalImage: { width: '100%', height: '100%', objectFit: 'cover' },
  modalTextSide: { flex: 0.8, padding: '60px', display: 'flex', flexDirection: 'column' },
  modalBadge: { color: '#2563eb', fontWeight: 'bold', textTransform: 'uppercase', fontSize: '14px' },
  modalTitle: { fontSize: '32px', margin: '15px 0' },
  modalPrice: { fontSize: '40px', fontWeight: '850', color: '#1e293b' },
  modalDesc: { fontSize: '18px', color: '#64748b', lineHeight: '1.7', margin: '30px 0' },
  modalSpecs: { display: 'flex', gap: '30px', padding: '30px 0', borderTop: '1px solid #e2e8f0' },
  spec: { display: 'flex', alignItems: 'center', gap: '10px', fontSize: '16px', fontWeight: '600' },
  modalCallBtn: { marginTop: 'auto', backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '20px', borderRadius: '20px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', justifyContent: 'center', gap: '10px' },
  closeBtn: { position: 'absolute', top: '25px', right: '25px', backgroundColor: '#fff', border: 'none', borderRadius: '50%', width: '50px', height: '50px', cursor: 'pointer', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }
};