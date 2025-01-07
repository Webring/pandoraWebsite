import React, {useEffect, useState} from 'react';
import LoadingData from "../components/LoadingData.jsx";
import {useFetching} from "../hooks/useFetching.jsx";
import PageWrapper from "../components/PageWrapper.jsx";
import TimetableService from "../API/TimetableService.js";
import Schedule from "../components/Schedule.jsx";
import {Alert} from "antd";

const TimetablePage = () => {
    const [timetable, setTimetable] = useState([]);
    const [announcments, setAnnouncments] = useState([]);


    const [fetchAnnouncments, isLoadingAnnouncments, loadingAnnouncmentsError] = useFetching(async () => {
        const newAnnouncments = await TimetableService.getAnnouncment()
        setAnnouncments(newAnnouncments);
    });

    const [fetchTimetable, isLoadingTimetable, loadingTimetableError] = useFetching(async () => {
        const schedule = await TimetableService.getSchedule()
        setTimetable(schedule);
    });

    useEffect(() => {
        fetchTimetable();
        fetchAnnouncments();
    }, []);

    return (
        <PageWrapper title="Расписание">
            <LoadingData isLoading={isLoadingTimetable && isLoadingAnnouncments}
                         error={loadingTimetableError + loadingAnnouncmentsError}>
                <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-8 lg:text-3xl xl:mb-12">Расписание</h2>
                {announcments.map((announcment) =>
                    <Alert key={announcment.id}
                           message={announcment.text}
                           type="info"
                           className="mb-4 bg-pplight border-ppbase" />
                )}
                <Schedule timetable={timetable}></Schedule>
            </LoadingData>
        </PageWrapper>
    );
};

export default TimetablePage;