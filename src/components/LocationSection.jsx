import React from 'react';

const LocationSection = () => {
    return (
        <section className="py-20 bg-gray-100">
            <div className="container mx-auto px-6">
                <div className="will-animate">
                    <h2 className="text-4xl font-bold text-center text-primary section-title">Lokasi Kami</h2>
                </div>
                <div className="mt-12 rounded-lg overflow-hidden shadow-2xl will-animate" style={{ transitionDelay: '150ms' }}>
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.6997427218536!2d106.89209531476885!3d-6.171414995532299!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f538562d989d%3A0x9cb48195822d0a0!2sHKBP%20Kayu%20Mas!5e0!3m2!1sen!2sid!4v1663411035232!5m2!1sen!2sid" 
                        width="100%" 
                        height="450" 
                        style={{ border: 0 }} 
                        allowFullScreen="" 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
        </section>
    );
};

export default LocationSection;