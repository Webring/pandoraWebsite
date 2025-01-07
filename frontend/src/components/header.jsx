import React from 'react';
import Logo from "./logo.jsx";
import HeaderElement from "./header_element.jsx";
import {Link} from "react-router-dom";


const Header = ({showMenu, openCallModal, items}) => {
    return (
        <header className="mx-auto max-w-screen-2xl flex items-center justify-between py-4 md:mb-14 px-4 md:px-8 sticky top-0 bg-white z-20">
            <Link to="/" className="inline-flex items-center gap-2.5 text-2xl font-bold text-black md:text-3xl"
               aria-label="logo">
                <Logo/>
                Пандора
            </Link>


            <nav className="hidden gap-12 xl:flex">
                {items.map((item) => <HeaderElement key={item.id} title={item.title} href={item.href}/>)}
            </nav>

            <div className="ml-8 hidden flex-col gap-2.5 sm:flex-row sm:justify-center xl:flex xl:justify-start">
                <button onClick={openCallModal}
                   className="inline-block rounded-lg bg-ppbase px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-ppdark focus-visible:ring active:bg-ppdark md:text-base">
                    Связаться с нами
                </button>
            </div>

            <button type="button" onClick={showMenu}
                    className="inline-flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm font-semibold text-black ring-indigo-300 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base xl:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd"
                          d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                          clipRule="evenodd"/>
                </svg>
            </button>
        </header>
    );
};

export default Header;