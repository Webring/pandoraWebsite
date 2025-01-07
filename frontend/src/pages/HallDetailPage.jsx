import React, {useEffect, useState} from 'react';
import PageWrapper from "../components/PageWrapper.jsx";
import {useParams} from "react-router-dom";
import {useFetching} from "../hooks/useFetching.jsx";
import LoadingData from "../components/LoadingData.jsx";
import HallService from "../API/HallsService.js";
import {ConfigProvider, Image, Space} from "antd";
import {ZoomInOutlined, ZoomOutOutlined} from "@ant-design/icons";

const HallDetailPage = () => {

    const [hall, setHall] = useState({});
    const [current, setCurrent] = React.useState(0);
    const [imageLabels, setImageLabels] = React.useState([]);


    const params = useParams();

    const [fetchHall, isLoadingHall, loadingHallError] = useFetching(async () => {
        const hallInfo = await HallService.getById(params.id)
        setHall(hallInfo);
        setImageLabels(hallInfo.photos.concat(hallInfo.hall_center.photos).map(photo => photo.description));
        document.title = hallInfo.title;
    });

    useEffect(() => {
        fetchHall();
    }, []);

    return (
        <PageWrapper>
            <LoadingData isLoading={isLoadingHall} error={loadingHallError}>
                {loadingHallError}
                {hall.photos && hall.photos.length &&<div className="mb-10 md:mb-16">
                    <h2 className="text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">{hall.title} на {hall.hall_center.address} ({hall.square} м²)</h2>

                        <div className="flex justify-center my-4">
                        <ConfigProvider
                            locale={{
                                Image: {
                                    preview: 'Предпросмотр',
                                    next: 'Следующее',
                                    previous: 'Предыдущее'
                                }
                            }}
                        >
                             <Image.PreviewGroup
                                items={hall.photos.concat(hall.hall_center.photos).map(photo => photo.image)}
                                preview={{
                                    toolbarRender: (
                                        _,
                                        {
                                            transform: { scale },
                                            actions: {

                                                onZoomOut,
                                                onZoomIn,
                                            },
                                        },
                                    ) => (
                                        <div>
                                            <div className="text-center text-xl">
                                                {imageLabels[current]}
                                            </div>
                                            <Space
                                                size="large"
                                                className="rounded-lg bg-gray-700 bg-opacity-50 p-4 mt-4 flex items-center justify-center space-x-6"
                                            >
                                                <ZoomOutOutlined
                                                    className={`text-2xl ${scale === 1 ? 'text-gray-400' : 'text-white cursor-pointer'}`}
                                                    onClick={onZoomOut}
                                                    disabled={scale === 1}
                                                />
                                                <ZoomInOutlined
                                                    className={`text-2xl ${scale === 50 ? 'text-gray-400' : 'text-white cursor-pointer'}`}
                                                    onClick={onZoomIn}
                                                    disabled={scale === 50}
                                                />
                                            </Space>
                                        </div>

                                    ),
                                    onChange: (index) => {
                                        setCurrent(index);
                                    },
                                }}
                            >
                                <Image
                                    className="object-cover aspect-video object-center overflow-hidden rounded"
                                    src={hall.photos[0].image}
                                />
                            </Image.PreviewGroup>
                        </ConfigProvider>
                            <div className="text-center text-gray-800">

                            </div>

                    </div>
                </div>}

                {hall.description && <div dangerouslySetInnerHTML={{__html: hall.description}} className="mt-2"></div>}
                {hall.hall_center &&
                    <div dangerouslySetInnerHTML={{__html: hall.hall_center.description}} className="mt-2"></div>
                }
            </LoadingData>
        </PageWrapper>
    );
};

export default HallDetailPage;