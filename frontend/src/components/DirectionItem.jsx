import React from 'react';
import {useNavigate} from 'react-router-dom';

const DirectionItem = ({title, imagePath, id, tags}) => {
    const navigate = useNavigate()
    const tags_string = tags.join(", ")
    return (
        <div>
            <a onClick={() => {
                navigate(`/direction/${id}`)
            }}
               className="group relative mb-2 block h-80 overflow-hidden rounded-lg bg-gray-100 lg:mb-3 shadow-lg cursor-pointer">
                <img
                    src={imagePath}
                    loading="lazy" alt={title}
                    className="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"/>

                <span
                    className="absolute left-0 bottom-0 rounded-tr-lg bg-ppbase px-3 py-1.5 text-sm text-white">{tags_string}</span>
            </a>

            <div>
                <a onClick={() => {
                    navigate(`/direction/${id}`)
                }}
                   className="hover:gray-800 mb-1 text-gray-500 transition duration-100 lg:text-lg cursor-pointer">{title}</a>
            </div>
        </div>
    );
};

export default DirectionItem;