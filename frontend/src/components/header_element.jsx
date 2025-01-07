import React from 'react';
import {Link} from "react-router-dom";

const HeaderElement = ({title, href}) => {
    return (
        <div>
            <Link to={href}
                  className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-ppbase active:text-ppbase">{title}</Link>
        </div>
    );
};

export default HeaderElement;