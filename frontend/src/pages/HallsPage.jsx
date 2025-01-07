import React, {useEffect, useState} from 'react';
import PageWrapper from "../components/PageWrapper.jsx";
import LoadingData from "../components/LoadingData.jsx";
import {useFetching} from "../hooks/useFetching.jsx";
import HallsService from "../API/HallsService.js";
import HallItem from "../components/HallItem.jsx";


const HallsPage = () => {
    const [halls, setHalls] = useState([]);

    const [fetchHalls, isLoadingHalls, loadingHallsError] = useFetching(async () => {
        const hallsList = await HallsService.getAll()
        setHalls(hallsList);
    });

    useEffect(() => {
        fetchHalls();
    }, []);
    return (
        <PageWrapper title="Залы">
            <div className="mb-10 md:mb-16">
                <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">Залы</h2>

                <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg">
                    Наши современные тренировочные залы – идеальное место для ваших занятий, с возможностью аренды
                </p>
            </div>

            <LoadingData isLoading={isLoadingHalls} error={loadingHallsError}>
                <div className="grid gap-x-4 gap-y-8 sm:grid-cols-2 md:gap-x-6 lg:grid-cols-3 xl:grid-cols-4">
                    {halls.map((hall) =>
                        <HallItem key={hall.id} hallObj={hall} />)}
                </div>
            </LoadingData>

        </PageWrapper>

    );
};

export default HallsPage;