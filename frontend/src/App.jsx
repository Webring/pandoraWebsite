import Header from "./components/header.jsx";
import "./tailwind.css"
import {Drawer} from "antd";
import React, {useEffect, useState} from "react";
import Footer from "./components/Footer.jsx";
import TeachersPage from "./pages/TeachersPage.jsx";
import ModalCall from "./components/modal_call.jsx";
import DirectionsPage from "./pages/DirectionsPage.jsx";
import HeaderElement from "./components/header_element.jsx";
import FloatingCallButton from "./components/floating_call_button.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HallsPage from "./pages/HallsPage.jsx";
import DirectionDetailPage from "./pages/DirectionDetailPage.jsx";
import PricesPage from "./pages/PricesPage.jsx";
import CustomPage from "./pages/CustomPage.jsx";
import Error404Page from "./pages/Error404Page.jsx";
import MainPage from "./pages/MainPage.jsx";
import CustomPagesListPage from "./pages/CustomPagesListPage.jsx";
import TeacherDetailPage from "./pages/TeacherDetailPage.jsx";
import TimetablePage from "./pages/TimetablePage.jsx";
import {useFetching} from "./hooks/useFetching.jsx";
import SocialsService from "./API/SocialsService.js";
import HallDetailPage from "./pages/HallDetailPage.jsx";

const navbar_items = [
    {
        "id": 1,
        "title": "Цены",
        "href": "/prices",
    },
    {
        "id": 2,
        "title": "Направления",
        "href": "/directions",
    },
    {
        "id": 3,
        "title": "Расписание",
        "href": "/timetable",
    },
    {
        "id": 4,
        "title": "Тренеры",
        "href": "/teachers",
    },
    {
        "id": 5,
        "title": "Залы",
        "href": "/halls",
    },
    {
        "id": 6,
        "title": "О нас",
        "href": "/page/1",
    },
]

const default_socials = [
    {
        "id": 1,
        "title": "Телефон",
        "internal_link": "+79960716306",
        "direct_link": "tel:+79960716306",
        "icon": "telephone-fill"
    }
]


function App() {
    const [open, setOpen] = useState(false);

    const [isModalCallOpen, setIsModalCallOpen] = useState(false);

    const [socials, setSocials] = useState(default_socials);

    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    const [fetchSocials, isLoadingSocial, loadingSocialsError] = useFetching(async () => {
        const socialsInfo = await SocialsService.getAll()
        setSocials(socialsInfo);
    });

    useEffect(() => {
        fetchSocials();
    }, []);

    return (
        <div className="bg-white">
            <BrowserRouter>
                <Drawer title='Танцевальный дом "Пандора"' onClose={onClose} open={open}>
                    <nav className="gap-8 flex flex-col">
                        {navbar_items.map((item) =>
                            <HeaderElement
                                key={item.id}
                                title={item.title}
                                href={item.href}/>)}
                    </nav>
                </Drawer>

                <Header showMenu={showDrawer}
                        openCallModal={() => {
                            setIsModalCallOpen(true)
                        }}
                        items={navbar_items}/>

                <Routes>
                    <Route path="/" element={
                        <MainPage socials={socials}/>
                    }/>
                    <Route path="/direction/:id" element={<DirectionDetailPage/>}/>

                    <Route path="/directions" element={<DirectionsPage openCallModal={() => {
                        setIsModalCallOpen(true)
                    }}/>}/>
                    <Route path="/teachers" element={<TeachersPage/>}/>
                    <Route path="/teacher/:id" element={<TeacherDetailPage/>}/>
                    <Route path="/halls" element={<HallsPage/>}/>
                    <Route path="/hall/:id" element={<HallDetailPage/>}/>
                    <Route path="/timetable" element={<TimetablePage/>}/>
                    <Route path="/prices" element={<PricesPage/>}/>
                    <Route path="/pages" element={<CustomPagesListPage/>}/>
                    <Route path="/page/:id" element={<CustomPage/>}/>
                    <Route path="*" element={<Error404Page/>}></Route>
                </Routes>
                <Footer socials={socials} navbarItems={navbar_items}/>
            </BrowserRouter>


            <FloatingCallButton onClick={setIsModalCallOpen}/>
            <ModalCall
                open={isModalCallOpen}
                handleOk={() => {
                    setIsModalCallOpen(false)
                }}
                handleCancel={() => {
                    setIsModalCallOpen(false)
                }}
                socials={socials}
            />

        </div>
    )
}

export default App
