import React, {useState} from 'react';
import {Button, Col, ConfigProvider, Form, Input, message, Modal, Row} from "antd";
import {baseApiUrl} from "../API/BaseApiUrl.js";

const ModalCall = ({open, handleOk, handleCancel, socials}) => {

    const [form] = Form.useForm();
    const [phone, setPhone] = useState('');
    const [messageApi, contextHolder] = message.useMessage();

    const onFinish = async (values) => {
        // Отправка данных на сервер
        try {
            const response = await fetch(baseApiUrl + '/api/v1/callback-form/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            const data = await response.json();


            if (response.ok) {
                form.resetFields();
                messageApi.success("Форма успешно отправлена! Ожидайте звонка!");
                handleOk();
            } else {
                const errorFields = Object.entries(data).map(([field, errors]) => ({
                    name: field,
                    errors: errors,
                }));
                form.setFields(errorFields);
                messageApi.error("Ошибка заполнения формы!");
            }
        } catch (error) {
            messageApi.error("Ошибка отправки формы! Нет связи с сервером!");
        }
    };

    return (
        <ConfigProvider theme={{
            token: {
                colorPrimary: '#9b59b6', // Установите ваш цвет для primary
            },
        }}>
            <Modal
                title="Контакты"
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null} // Убираем стандартные кнопки
            >
                {contextHolder}
                <div className="font-medium mb-2">Вы можете сами связаться с нами любым удобным способом:</div>
                <Row gutter={[16, 16]} style={{ marginBottom: '20px' }}>
                    {socials.map(contact => {
                        return (
                            <Col span={24} key={contact.id}>
                                <Row className="mt-2">
                                    <Col span={2}>
                                        <svg className="bi w-6 h-6 text-ppbase" width="32" height="32" fill="currentColor">
                                            <use xlinkHref={`/socials.svg#${contact.icon}`}/>
                                        </svg>
                                    </Col>
                                    <Col span={22}>
                                        <a href={contact.direct_link} className="hover:text-ppbase">{contact.title}: {contact.internal_link}</a>
                                    </Col>
                                </Row>
                            </Col>
                        );
                    })}
                </Row>

                <div className="font-medium mb-2 mt-8">
                    Также, Вы можете оставить свои контактные данные, и наш менеджер свяжется с вами в ближайшее время.
                </div>
                <Form form={form} onFinish={onFinish} layout="vertical">
                    <Form.Item
                        label="Ваше имя"
                        name="name"
                        rules={[{required: true, message: 'Пожалуйста, введите ваше имя!'}]}
                    >
                        <Input placeholder="Введите ваше имя"/>
                    </Form.Item>

                    <Form.Item
                        label="Номер телефона"
                        name="phone_number"
                        rules={[
                            {required: true, message: 'Пожалуйста, введите ваш номер телефона!'},
                            {pattern: /^\+7\d{10}$/, message: 'Номер телефона в формате +7 ...'},
                        ]}
                    >
                        <Input
                            value={phone}
                            onChange={(e) => setPhone(e.target.value.replace(/[^\d]/g, ''))} // Оставляем только цифры
                            placeholder="Введите ваш номер телефона"
                            maxLength={15}
                        />
                    </Form.Item>

                    <Button type="primary" htmlType="submit" block className="mt-1">
                        Отправить
                    </Button>
                </Form>
            </Modal>
        </ConfigProvider>
    );
};

export default ModalCall;