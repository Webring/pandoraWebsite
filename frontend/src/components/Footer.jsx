import React from 'react';
import SocialsIcons from "./socials_icons.jsx";
import {Link} from "react-router-dom";

const Footer = ({socials, navbarItems}) => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="mx-auto max-w-screen-2xl px-4 md:px-8">
            <div className="flex flex-col items-center justify-between gap-4 border-t border-b py-6 md:flex-row">
                <nav className="flex flex-wrap justify-center gap-x-4 gap-y-2 md:justify-start md:gap-6">
                    {navbarItems.map((item) =>
                        <Link key={item.id} to={item.href} className="text-gray-500 transition duration-100 hover:text-ppbase active:text-ppbase">{item.title}</Link>)}
                </nav>

                <SocialsIcons socials={socials}></SocialsIcons>
            </div>

            <div className="py-8 text-center text-sm text-gray-400">© {currentYear} - Танцевальный дом "Пандора". Все права
                защищены.
            </div>
        </footer>
    );
};

export default Footer;