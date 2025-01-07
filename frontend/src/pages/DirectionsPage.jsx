import React, {useEffect, useState} from 'react';
import DirectionItem from "../components/DirectionItem.jsx";
import {useFetching} from "../hooks/useFetching.jsx";
import DirectionsService from "../API/DirectionsService.js";
import LoadingData from "../components/LoadingData.jsx";
import PageWrapper from "../components/PageWrapper.jsx";

const DirectionsPage = ({openCallModal}) => {
    const [directions, setDirections] = useState([]);

    const [fetchDirections, isLoadingDirections, loadingDirectionsError] = useFetching(async () => {
        const directionsList = await DirectionsService.getAll()
        setDirections(directionsList);
    });

    useEffect(() => {
        fetchDirections();
    }, []);

    return (
            <PageWrapper title="Направления подготовки">
                <div className="mb-10 md:mb-16">
                    <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">Направления</h2>

                    <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg">У нас есть направления на любой вкус: от классики до современных стилей</p>
                </div>

                <LoadingData isLoading={isLoadingDirections} error={loadingDirectionsError} >
                    <div className="grid gap-x-4 gap-y-8 sm:grid-cols-2 md:gap-x-6 lg:grid-cols-3 xl:grid-cols-4">
                        {directions.map((direction) =>
                            <DirectionItem key={direction.id}
                                           id={direction.id}
                                           tags={direction.tags}
                                           title={direction.name}
                                           imagePath={direction.image}/>)}
                    </div>
                </LoadingData>


                <div className="flex flex-col overflow-hidden rounded-lg bg-gray-900 sm:flex-row md:h-80 mt-6">
                    <div className="flex w-full flex-col p-4 sm:w-1/2 sm:p-8 lg:w-2/5">
                        <h2 className="mb-4 text-xl font-bold text-white md:text-2xl lg:text-4xl">Не можешь<br/>выбрать
                            направление?</h2>

                        <p className="mb-8 max-w-md text-gray-400">Свяжитесь с нами и наш менеджер поможет с выбором
                            подходящего направления!</p>

                        <div className="mt-auto">
                            <button onClick={openCallModal}
                               className="inline-block rounded-lg bg-white px-8 py-3 text-center text-sm font-semibold text-gray-800 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-100 focus-visible:ring active:bg-gray-200 md:text-base">
                                Оставить заявку
                            </button>
                        </div>
                    </div>

                    <div className="order-first h-48 w-full bg-gray-700 sm:order-none sm:h-auto sm:w-1/2 lg:w-3/5">
                        <img
                            src="/direction_problem.png"
                            loading="lazy" alt="Photo by Dom Hill"
                            className="h-full w-full object-cover object-center"/>
                    </div>
                </div>
            </PageWrapper>
    );
};

export default DirectionsPage;