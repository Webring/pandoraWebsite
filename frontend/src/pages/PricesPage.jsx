import React, {useEffect, useState} from 'react';
import PriceItem from "../components/PriceItem.jsx";
import LoadingData from "../components/LoadingData.jsx";
import {useFetching} from "../hooks/useFetching.jsx";
import PriceService from "../API/PriceService.js";
import PageWrapper from "../components/PageWrapper.jsx";
import RuleItem from "../components/RuleItem.jsx";

const PricesPage = () => {
    const [prices, setPrices] = useState([]);

    const [fetchPrices, isLoadingPrices, loadingPricesError] = useFetching(async () => {
        const DirectionInfo = await PriceService.getAll()
        setPrices(DirectionInfo);
    });

    useEffect(() => {
        fetchPrices();
    }, []);

    return (
        <PageWrapper title="Прайслист">
            <LoadingData isLoading={isLoadingPrices} error={loadingPricesError}>
                <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-8 lg:text-3xl xl:mb-12">Цены</h2>

                <div className="mb-6 grid gap-6 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 lg:gap-8">
                    {prices.map((price) => <PriceItem key={price.id} title={price.title}
                                                      description={price.description} prices={price.prices}/>)}
                </div>
            </LoadingData>

            <div>
                <h2 className="mb-2 text-lg font-semibold text-gray-900">Правила пользования абониментами: </h2>
                <ul className="max-w-xl space-y-1 text-gray-600 list-disc list-inside">
                    <li>
                        Действует 30 дней(календарный месяц)
                    </li>
                    <li>
                        Распространяется на все направления
                    </li>
                    <li>
                        Продляется не более, чем на 14 календарных дней, и только при наличии медицинцской справки или
                        билетов (для отпуска или командировки) с Ф.И. клиента
                    </li>
                </ul>
            </div>
        </PageWrapper>
    );
};

export default PricesPage;