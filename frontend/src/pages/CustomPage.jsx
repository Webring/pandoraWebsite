import React, {useEffect, useState} from 'react';
import PageWrapper from "../components/PageWrapper.jsx";
import {useParams} from "react-router-dom";
import {useFetching} from "../hooks/useFetching.jsx";
import LoadingData from "../components/LoadingData.jsx";
import CustomPageService from "../API/CustomPageService.js";

const CustomPage = () => {

    const [PageData, setPageData] = useState([]);

    const params = useParams();

    const [fetchPageData, isLoadingPageData, PageDataError] = useFetching(async () => {
        const PageInfo = await CustomPageService.getById(params.id)
        document.title = PageInfo.title;
        setPageData(PageInfo);
    });

    useEffect(() => {
        fetchPageData();
    }, []);

    return (
        <PageWrapper>
            <LoadingData isLoading={isLoadingPageData} error={PageDataError}>
                <div className="mb-5 md:mb-8">
                    <h2 className="text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">{PageData.title}</h2>
                    <div className="flex justify-center my-4">
                        <img src={PageData.image} alt={PageData.title}
                             className="object-cover aspect-video object-center overflow-hidden rounded"/>
                    </div>
                </div>

                <div dangerouslySetInnerHTML={{__html: PageData.content}} ></div>
            </LoadingData>
        </PageWrapper>
    );
};

export default CustomPage;