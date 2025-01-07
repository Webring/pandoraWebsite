import React from 'react';
import {Tag} from "antd";

const BaseDetailView = ({title, image, additional, description}) => {
    return (
        <>
            <div className="mb-10 md:mb-16">
                <h2 className="text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">{title}</h2>
                <div className="flex justify-center my-4">
                    <img src={image} alt={title}
                         className="object-cover aspect-video object-center overflow-hidden rounded"/>
                </div>
                {additional}
            </div>

            <div dangerouslySetInnerHTML={{__html: description}} className="mt-2"></div>
        </>
    );
};

export default BaseDetailView;