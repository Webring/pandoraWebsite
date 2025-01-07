import React, {useEffect} from 'react';
import PageWrapper from "../components/PageWrapper.jsx";
import {Link} from "react-router-dom";

const Error404Page = () => {
    return (
        <PageWrapper className="flex justify-center items-center" title="Страница не существует">
            <div className="grid gap-8 sm:grid-cols-2">
                <div className="flex flex-col items-center justify-center sm:items-start md:py-24 lg:py-32">
                    <p className="mb-4 text-sm font-bold uppercase text-ppbase md:text-base">Ошибка 404</p>
                    <h1 className="mb-2 text-center text-2xl font-bold text-gray-800 sm:text-left md:text-3xl">Страница
                        не найдена</h1>

                    <p className="mb-8 text-center text-gray-500 sm:text-left md:text-lg">Страница, которую вы искали,
                        не существует</p>

                    <Link to="/"
                       className="inline-block rounded-lg bg-gray-200 px-8 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base">Вернуться на главную</Link>
                </div>

                <div className="relative h-80 overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-auto">
                    <img
                        src="/404.png"
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover object-center"/>
                </div>
            </div>
        </PageWrapper>
    );
};

export default Error404Page;