import React from 'react';
import {Link} from "react-router-dom";

const TeacherCard = ({name, directions, image, id}) => {
    return (
        <div>
            <Link to={`/teacher/${id}`}>
                <div className="mb-2 h-48 overflow-hidden rounded-lg bg-gray-100 shadow-lg sm:mb-4 sm:h-60 md:h-80">
                    <img
                        src={image}
                        loading="lazy" alt={name}
                        className="h-full w-full object-cover object-center transition duration-200 hover:scale-110"/>
                </div>

                <div>
                    <div className="font-bold md:text-lg">{name}</div>
                    <p className="mb-3 text-sm text-gray-500 md:mb-4 md:text-base">{directions.join(", ")}</p>
                </div>
            </Link>

        </div>
    );
};

export default TeacherCard;