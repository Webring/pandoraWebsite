import React, {useEffect, useState} from 'react';
import TeacherCard from "../components/TeacherCard.jsx";
import {Result, Spin} from "antd";
import TeachersService from "../API/TeachersService.js";
import {useFetching} from "../hooks/useFetching.jsx";
import PageWrapper from "../components/PageWrapper.jsx";
import LoadingData from "../components/LoadingData.jsx";

const TeachersPage = () => {
    const [teachers, setTeachers] = useState([]);

    const [fetchTeachers, isLoadingTeachers, loadingTeacherError] = useFetching(async () => {
        const teachersList = await TeachersService.getAll()
        setTeachers(teachersList);
    });

    useEffect(() => {
        fetchTeachers();
    }, []);

    return (
        <PageWrapper title="Тренеры">
            <div className="mb-10 md:mb-16">
                <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">Наши
                    преподаватели</h2>

                <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg">
                    Наши тренеры используют уникальные методики, адаптированные для новичков. Мы поможем вам уверенно
                    начать путь в мире танцев!
                </p>
            </div>
            <LoadingData isLoading={isLoadingTeachers} error={loadingTeacherError}>
                <div className="grid gap-x-4 gap-y-8 sm:grid-cols-2 md:gap-x-6 lg:grid-cols-3 xl:grid-cols-4">
                    {teachers.map((teacher) =>
                        <TeacherCard
                            key={teacher.id}
                            id={teacher.id}
                            name={teacher.name}
                            directions={teacher.directions}
                            image={teacher.avatar}/>)}

                </div>
            </LoadingData>
        </PageWrapper>
    );
};

export default TeachersPage;