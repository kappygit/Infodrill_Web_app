import React from 'react';
import './TickerSection.css';

const CLIENTS = [
  {
    id: 'raghani',
    name: 'Raghani Topmost Agent',
    image: '/images/clients/raghani.png',
    className: 'client-logo-img--raghani',
  },
  {
    id: 'keisha',
    name: 'Keisha Greens Private Limited',
    image: '/images/clients/keisha.png',
    className: 'client-logo-img--keisha',
  },
  {
    id: 'bikaner-elite',
    name: 'Bikaner Elite',
    image: '/images/clients/bikaner-elite.png',
    className: 'client-logo-img--badge client-logo-img--bikaner',
  },
  {
    id: 'ugam',
    name: 'Ugam Beam Science Pvt Ltd',
    image: '/images/clients/ugam.png',
    className: 'client-logo-img--badge client-logo-img--ugam',
  },
  {
    id: 'umiya-jari',
    name: 'Umiya Jari',
    image: '/images/clients/umiya-jari.png',
    className: 'client-logo-img--umiya',
  },
];

export function TickerSection() {
  // 2 cycles per track half ensures continuous seamless looping without gaps on any screen width
  const trackItems = [...CLIENTS, ...CLIENTS];

  return (
    <section className="ticker-section" aria-label="Our Valuable Clients">
      <div className="ticker-container">
        {/* Section Heading */}
        <h2 className="ticker-heading">Our Valuable Clients</h2>

        {/* Marquee viewport with smooth edge-fading masks */}
        <div className="ticker-marquee-viewport">
          <div className="ticker-track">
            {/* Primary Track Set */}
            {trackItems.map((client, idx) => (
              <div key={`client-set1-${client.id}-${idx}`} className="ticker-item">
                <div className="client-logo-card" title={client.name}>
                  <img
                    src={client.image}
                    alt={client.name}
                    loading="lazy"
                    className={`client-logo-img ${client.className || ''}`}
                  />
                </div>
              </div>
            ))}
            {/* Duplicate Track Set for Seamless Infinite Right-to-Left Loop */}
            {trackItems.map((client, idx) => (
              <div key={`client-set2-${client.id}-${idx}`} className="ticker-item" aria-hidden="true">
                <div className="client-logo-card" title={client.name}>
                  <img
                    src={client.image}
                    alt={client.name}
                    loading="lazy"
                    className={`client-logo-img ${client.className || ''}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TickerSection;
