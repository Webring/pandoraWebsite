import React from 'react';
import {Result, Spin} from "antd";

const LoadingData = ({isLoading, error, children}) => {

    return (
        <div>
            {error ? <Result
                status="error"
                title="Ошибка загрузки!"
                subTitle="Перезагрузите страницу или попробуйте позже!"
            /> : (isLoading
                ? <div className="flex justify-center items-center w-full p-10">
                    <div className="flex flex-col">
                        <Spin size="large"/>
                        <div className="mt-2">
                            Загрузка
                        </div>
                    </div>
                </div>
                : <div>{children}</div>)
            }

        </div>
    );
};

export default LoadingData;