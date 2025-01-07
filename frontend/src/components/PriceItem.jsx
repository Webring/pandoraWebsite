import React from 'react';

const PriceItem = ({title, description, prices}) => {
    return (
        <div className="flex flex-col overflow-hidden rounded-lg border sm:mt-8">
            <div className="h-2 bg-ppbase"></div>

            <div className="flex flex-1 flex-col p-6 pt-8">
                <div className="mb-2">
                    <div className="mb-2 text-center text-2xl font-bold text-gray-800">{title}</div>

                    <p className="mb-8 px-8 text-center text-gray-500">{description}</p>

                    <div className="space-y-4">

                        {prices.map((price) => <div key={price.id} className="flex items-center gap-2">


                            <span className="text-gray-600">{price.title} - {price.price} руб.</span>
                        </div>)}

                    </div>
                </div>

            </div>
        </div>
    );
};

export default PriceItem;