import React from 'react';
import {ConfigProvider, FloatButton} from "antd";
import {PhoneOutlined} from "@ant-design/icons";

const FloatingCallButton = ({onClick}) => {
    return (
        <ConfigProvider theme={{
            components: {
                FloatButton: {
                    colorPrimary: "#0ba84e",
                    colorPrimaryHover: "#088a3f"
                },
            },
        }}>
            <FloatButton disabled className="animate-slowPing xl:hidden" icon={<PhoneOutlined/>} type="primary"/>
            <FloatButton tooltip="Связаться с нами" className="xl:hidden" icon={<PhoneOutlined/>} type="primary"
                         onClick={onClick}/>
        </ConfigProvider>
    );
};

export default FloatingCallButton;