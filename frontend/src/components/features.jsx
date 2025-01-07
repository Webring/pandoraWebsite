import React from 'react';
import Feature from "./feature.jsx";

const Features = ({items}) => {
    return (
        <section id="features-section">
            <div className="mb-10 md:mb-16">
                <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">Наши
                    преимущества</h2>
            </div>

            <div className="grid gap-12 sm:grid-cols-2 xl:grid-cols-3 xl:gap-16">
                {items.map((item) => <Feature key={item.id}
                                              title={item.title}
                                              description={item.description}
                                              icon={item.icon}/>)}
            </div>
        </section>
    );
};

export default Features;