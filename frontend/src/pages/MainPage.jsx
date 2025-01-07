import React, {useEffect} from 'react';
import Hero from "../components/Hero.jsx";
import Features from "../components/features.jsx";
import PageWrapper from "../components/PageWrapper.jsx";

const features = [
    {
        id: 1,
        title: "Общий абонемент на все направления",
        icon: "ticket",
        description: "Единый абонемент для посещения любых занятий — выбирайте и пробуйте разные танцевальные стили"
    },
    {
        id: 2,
        title: "Удобное расположение",
        icon: "geo-alt",
        description: "Мы находимся рядом с метро «Речной вокзал», поэтому к нам легко добраться с любой точки города"
    },
    {
        id: 3,
        title: "Семейная атмосфера",
        icon: "heart",
        description: "Дружелюбная и поддерживающая среда, где каждый чувствует себя как дома"
    },
    {
        id: 4,
        title: "Крутые педагоги",
        icon: "star",
        description: "Наши опытные педагоги помогут раскрыть ваш танцевальный потенциал и достигнуть высоких результатов"
    },
    {
        id: 5,
        title: "Забота о вашем здоровье",
        icon: "activity",
        description: "Сохраняем баланс между эффективной нагрузкой и вниманием к вашим физическим возможностям и самочувствию"
    },
    {
        id: 6,
        title: "Учим с нуля",
        icon: "lightbulb",
        description: "Наши методики идеально подходят для тех, кто делает свои первые шаги в танцах"
    }
]

const MainPage = ({socials}) => {
    return (
        <PageWrapper title="Пандора | Танцевальный дом">
            <Hero socials={socials}/>
            <Features items={features}/>
        </PageWrapper>
    );
};

export default MainPage;