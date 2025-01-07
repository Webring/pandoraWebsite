import React from 'react';

const Feature = ({title, description, icon}) => {
    return (
        <div className="flex flex-col items-center">
            <div className="mb-2 flex h-12 w-12 items-center justify-center text-ppbase sm:mb-4 md:h-14 md:w-14">
                <svg className="h-full w-full" width="32" height="32" fill="currentColor">
                    <use xlinkHref={`bootstrap-icons.svg#${icon}`}/>
                </svg>
            </div>

            <h3 className="mb-2 text-center text-lg font-semibold md:text-xl">{title}</h3>
            <p className="mb-2 text-center text-gray-500">{description}</p>
        </div>
    );
};

export default Feature;