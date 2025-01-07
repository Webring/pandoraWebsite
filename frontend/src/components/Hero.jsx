import React from 'react';
import SocialsIcons from "./socials_icons.jsx";

const Hero = ({socials}) => {
    return (
        <section className="px-4 md:px-8 mb-8 md:mb-16">
            <div className="mb-8 flex flex-wrap justify-between md:mb-8">
                <div className="mb-6 flex w-full flex-col justify-center sm:mb-12 lg:mb-0 lg:w-1/3 lg:pb-24 lg:pt-48">
                    <h1 className="mb-4 text-4xl font-bold text-black sm:text-5xl md:mb-8 md:text-6xl">Танцуй вместе с нами!</h1>

                    <p className="max-w-md leading-relaxed text-gray-500 xl:text-lg">Учим танцам с любовью</p>
                </div>

                <div className="mb-12 flex w-full md:mb-16 lg:w-2/3">
                    <div
                        className="relative left-12 top-12 z-10 -ml-12 overflow-hidden rounded-lg bg-gray-100 shadow-lg md:left-16 md:top-16 lg:ml-0">
                        <img
                            src="/hero_photo_1.png"
                            loading="lazy"
                            className="h-full w-full object-cover object-center"/>
                    </div>

                    <div className="overflow-hidden rounded-lg bg-gray-100 shadow-lg">
                        <img
                            src="/hero_photo_2.png"
                            loading="lazy"
                            className="h-full w-full object-cover object-center"/>
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-center justify-end gap-8 md:flex-row">
                <div className="flex items-center justify-center gap-4 lg:justify-start">
                    <span
                        className="text-sm font-semibold uppercase tracking-widest text-gray-400 sm:text-base">Наши соцсети</span>
                    <span className="h-px w-12 bg-gray-200"></span>

                    <SocialsIcons socials={socials}/>
                </div>
            </div>
        </section>
    );
};

export default Hero;