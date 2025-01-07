import React, {useEffect, useState} from 'react';
import {useFetching} from "../hooks/useFetching.jsx";
import DirectionsService from "../API/DirectionsService.js";
import {useParams} from "react-router-dom";
import {Tag} from "antd";
import LoadingData from "../components/LoadingData.jsx";
import PageWrapper from "../components/PageWrapper.jsx";

const DirectionDetailPage = () => {

    const [directionData, setDirectionData] = useState([]);

    const params = useParams();

    const [fetchDirection, isLoadingDirectionData, loadingDirectionDataError] = useFetching(async () => {
        const DirectionInfo = await DirectionsService.getById(params.id)
        setDirectionData(DirectionInfo);
    });

    useEffect(() => {
        fetchDirection();
    }, []);

    return (
        <PageWrapper>
            <LoadingData isLoading={isLoadingDirectionData} error={loadingDirectionDataError}>
                <div className="mb-10 md:mb-16">
                    <h2 className="text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">{directionData.name}</h2>
                    <div className="flex justify-center my-4">
                        <img src={directionData.image} alt={directionData.title}
                             className="object-cover aspect-video object-center overflow-hidden rounded"/>
                    </div>
                    {directionData.tags? directionData.tags.map((tag) => <Tag key={tag.id} bordered={false} color="#9b59b6">
                        {tag.title}
                    </Tag>) : ""}
                </div>

                <div dangerouslySetInnerHTML={{__html: directionData.description}} className="mt-2"></div>
            </LoadingData>
        </PageWrapper>
    );
};

export default DirectionDetailPage;