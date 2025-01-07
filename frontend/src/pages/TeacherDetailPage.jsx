import React, {useEffect, useState} from 'react';
import PageWrapper from "../components/PageWrapper.jsx";
import {useParams} from "react-router-dom";
import {useFetching} from "../hooks/useFetching.jsx";
import TeachersService from "../API/TeachersService.js";
import LoadingData from "../components/LoadingData.jsx";
import BaseDetailView from "../components/BaseDetailView.jsx";

const TeacherDetailPage = () => {

    const [Teacher, setTeacher] = useState([]);

    const params = useParams();

    const [fetchTeacher, isLoadingTeacher, loadingTeacherError] = useFetching(async () => {
        const TeacherInfo = await TeachersService.getById(params.id)
        document.title = TeacherInfo.name;
        setTeacher(TeacherInfo);
    });

    useEffect(() => {
        fetchTeacher();
    }, []);

    return (
        <PageWrapper>
            <LoadingData isLoading={isLoadingTeacher} error={loadingTeacherError}>
                <BaseDetailView title={Teacher.name} image={Teacher.avatar} description={Teacher.description} />
            </LoadingData>
        </PageWrapper>
    );
};

export default TeacherDetailPage;