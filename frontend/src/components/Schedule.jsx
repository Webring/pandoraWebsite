import React, {useState} from 'react';

const Schedule = ({timetable}) => {


    const daysOfWeek = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];

    const [selectedDirection, setSelectedDirection] = useState("");

    // Извлечение уникальных направлений из timetable (добавлена проверка на наличие timetable)
    const directions = timetable
        ? [
            ...new Set(
                Object.values(timetable)
                    .flat()
                    .map((lesson) => lesson.direction.name)
            ),
        ]
        : [];

    // Обработчик изменения выбранного направления
    const handleDirectionChange = (e) => {
        setSelectedDirection(e.target.value);
    };

    return (
        <div className="flex flex-col space-y-4">
            {/* Dropdown для выбора направления */}
            <div className="flex justify-start">
                <select
                    value={selectedDirection}
                    onChange={handleDirectionChange}
                    className="px-4 py-2 border border-gray-300 rounded-md"
                >
                    <option value="">Все направления</option>
                    {directions.map((direction, index) => (
                        <option key={index} value={direction}>
                            {direction}
                        </option>
                    ))}
                </select>
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full bg-white ">
                    <thead>
                    <tr>
                        <th className="px-4 py-2 border-y-2 border-y-gray-700 text-left">
                            День
                        </th>
                        <th className="px-4 py-2 border-y-2 border-y-gray-700 text-left">
                            Время
                        </th>
                        <th className="px-4 py-2 border-y-2 border-y-gray-700 text-left">
                            Направление
                        </th>
                        <th className="px-4 py-2 border-y-2 border-y-gray-700 text-left">
                            Преподаватели
                        </th>
                        <th className="px-4 py-2 border-y-2 border-y-gray-700 text-left">
                            Зал
                        </th>
                        <th className="px-4 py-2 border-y-2 border-y-gray-700 text-left">
                            Примечание
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {daysOfWeek.map((day, dayIndex) => (
                        <React.Fragment key={dayIndex}>
                            {timetable[dayIndex] &&
                            timetable[dayIndex].some(
                                (lesson) =>
                                    !selectedDirection ||
                                    lesson.direction.name === selectedDirection
                            ) ? (
                                timetable[dayIndex]
                                    .filter(
                                        (lesson) =>
                                            !selectedDirection ||
                                            lesson.direction.name === selectedDirection
                                    )
                                    .map((lesson, lessonIndex) => (
                                        <tr key={lesson.id} className="">
                                            {lessonIndex === 0 && (
                                                <td
                                                    rowSpan={timetable[dayIndex].length}
                                                    className="px-4 py-4 font-bold border-y-2 border-y-gray-700"
                                                >
                                                    {day}
                                                </td>
                                            )}
                                            <td className={"px-4 py-4 " + ["border-b-2 border-b-gray-700", "border-b border-b-gray-300"][Number(lessonIndex < (timetable[dayIndex].length - 1))]}>
                                                {lesson.start_time} - {lesson.end_time}
                                            </td>
                                            <td className={"px-4 py-4 " + ["border-b-2 border-b-gray-700", "border-b border-b-gray-300"][Number(lessonIndex < (timetable[dayIndex].length - 1))]}>
                                                {lesson.direction.name}
                                            </td>
                                            <td className={"px-4 py-4 " + ["border-b-2 border-b-gray-700", "border-b border-b-gray-300"][Number(lessonIndex < (timetable[dayIndex].length - 1))]}>
                                                {lesson.teachers
                                                    .map((teacher) => teacher.name)
                                                    .join(", ")}
                                            </td>
                                            <td className={"px-4 py-4 " + ["border-b-2 border-b-gray-700", "border-b border-b-gray-300"][Number(lessonIndex < (timetable[dayIndex].length - 1))]}>
                                                {lesson.hall.title} (
                                                {lesson.hall.hall_center.address})
                                            </td>
                                            <td className={"px-4 py-4 " + ["border-b-2 border-b-gray-700", "border-b border-b-gray-300"][Number(lessonIndex < (timetable[dayIndex].length - 1))]}>
                                                {lesson.remark}
                                            </td>
                                        </tr>
                                    ))
                            ) : (
                                <></>
                            )}
                        </React.Fragment>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards */}
            <div className="block md:hidden space-y-4">
                {daysOfWeek.map((day, dayIndex) => (
                    <div key={dayIndex}>
                        <h2 className="text-lg font-semibold text-gray-700 mb-2">{day}</h2>
                        {timetable[dayIndex] &&
                        timetable[dayIndex].some(
                            (lesson) =>
                                !selectedDirection ||
                                lesson.direction.name === selectedDirection
                        ) ? (
                            timetable[dayIndex]
                                .filter(
                                    (lesson) =>
                                        !selectedDirection ||
                                        lesson.direction.name === selectedDirection
                                )
                                .map((lesson) => (
                                    <div
                                        key={lesson.id}
                                        className="bg-white p-4 border border-gray-200 rounded-lg shadow-sm mb-2"
                                    >
                                        <p className="text-sm font-semibold text-gray-600">
                                            Время:{" "}
                                            <span className="font-normal">
                                                {lesson.start_time} - {lesson.end_time}
                                            </span>
                                        </p>
                                        <p className="text-sm font-semibold text-gray-600">
                                            Направление:{" "}
                                            <span className="font-normal">
                                                {lesson.direction.name}
                                            </span>
                                        </p>
                                        <p className="text-sm font-semibold text-gray-600">
                                            Преподаватели:{" "}
                                            <span className="font-normal">
                                                {lesson.teachers
                                                    .map((teacher) => teacher.name)
                                                    .join(", ")}
                                            </span>
                                        </p>
                                        <p className="text-sm font-semibold text-gray-600">
                                            Зал:{" "}
                                            <span className="font-normal">
                                                {lesson.hall.title} (
                                                {lesson.hall.hall_center.address})
                                            </span>
                                        </p>
                                        {lesson.remark && <p className="text-sm font-semibold text-gray-600">
                                            Примечание:{" "}
                                            <span className="font-normal">
                                                {lesson.remark}
                                            </span>
                                        </p>}

                                    </div>
                                ))
                        ) : (
                            <p className="text-gray-500">Нет занятий</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Schedule;