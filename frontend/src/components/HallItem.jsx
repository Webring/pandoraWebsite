import React from 'react';
import {useNavigate} from 'react-router-dom';

const HallItem = ({hallObj}) => {
    const navigate = useNavigate()
    const image = hallObj.photos[0].image
    return (
        <div>
            <a onClick={() => {
                navigate(`/hall/${hallObj.id}`)
            }}
               className="group relative mb-2 block h-80 overflow-hidden rounded-lg bg-gray-100 lg:mb-3 shadow-lg cursor-pointer">
                <img
                    src={image}
                    loading="lazy" alt={hallObj.title}
                    className="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"/>

                <span
                    className="absolute left-0 bottom-0 rounded-tr-lg bg-ppbase px-3 py-1.5 text-sm text-white">Площадь {hallObj.square} м²</span>
            </a>

            <div>
                <a onClick={() => {
                    navigate(`/hall/${hallObj.id}`)
                }}
                   className="hover:gray-800 mb-1 text-gray-500 transition duration-100 lg:text-lg cursor-pointer">{hallObj.title}</a>
            </div>
        </div>
    );
};

export default HallItem;