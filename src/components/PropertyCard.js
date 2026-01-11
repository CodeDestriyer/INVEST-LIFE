import React from 'react';
import { Bed, Bath, Maximize, Heart } from 'lucide-react';

export const PropertyCard = ({ item }) => {
  return (
    <div style={cardStyles.card}>
      <div style={cardStyles.imageContainer}>
        <img src={item.image} alt={item.title} style={cardStyles.image} />
        <div style={cardStyles.badge}>{item.city}</div>
        <button style={cardStyles.favBtn}><Heart size={18} /></button>
      </div>
      <div style={cardStyles.content}>
        <div style={cardStyles.price}>{item.price.toLocaleString()} €</div>
        <h3 style={cardStyles.title}>{item.title}</h3>
        <div style={cardStyles.specs}>
          <span><Bed size={16}/> {item.rooms}</span>
          <span><Bath size={16}/> {item.baths}</span>
          <span><Maximize size={16}/> {item.area} м²</span>
        </div>
      </div>
    </div>
  );
};

const cardStyles = {
  card: { background: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', transition: '0.3s' },
  imageContainer: { position: 'relative', height: '200px' },
  image: { width: '100%', height: '100%', objectFit: 'cover' },
  badge: { position: 'absolute', bottom: '10px', left: '10px', background: '#fff', padding: '4px 10px', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold' },
  favBtn: { position: 'absolute', top: '10px', right: '10px', border: 'none', background: '#fff', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  content: { padding: '16px' },
  price: { fontSize: '20px', fontWeight: '800', color: '#2563eb' },
  title: { fontSize: '16px', margin: '8px 0', color: '#1e293b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
  specs: { display: 'flex', gap: '15px', color: '#64748b', fontSize: '14px', borderTop: '1px solid #f1f5f9', paddingTop: '12px' }
};