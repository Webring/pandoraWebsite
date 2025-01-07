import React, { useState } from 'react';
import { Form, Input } from 'antd';

const formatPhoneNumber = (value) => {
    // Убираем все символы, кроме цифр
    const numbers = value.replace(/\D/g, '').substring(1); // убираем 7, чтобы не дублировать префикс +7

    // Формируем номер с форматом +7 (XXX) XXX-XX-XX
    const formattedNumber = numbers.replace(
        /^(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})$/,
        (_, p1, p2, p3, p4) =>
            `+7${p1 ? ` (${p1})` : ''}${p2 ? ` ${p2}` : ''}${p3 ? `-${p3}` : ''}${p4 ? `-${p4}` : ''}`
    );

    return formattedNumber;
};

const PhoneInputForm = () => {
    const [phone, setPhone] = useState('+7 (');

    const handleChange = (e) => {
        const input = e.target.value;

        // Проверяем, что префикс "+7" не удаляется и не изменяется
        if (!input.startsWith('+7')) {
            return;
        }

        // Форматируем и обновляем состояние
        const formattedValue = formatPhoneNumber(input);
        setPhone(formattedValue);
    };

    return (
            <Form.Item
                label="Номер телефона"
                name="phone"
                rules={[
                    { required: true, message: 'Пожалуйста, введите номер телефона' },
                    { pattern: /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, message: 'Введите корректный номер телефона' },
                ]}
            >
                <Input
                    value={phone}
                    onChange={handleChange}
                    placeholder="+7 (XXX) XXX-XX-XX"
                    maxLength={18} // Ограничение на количество символов
                    style={{ width: '100%' }}
                />
            </Form.Item>
    );
};

export default PhoneInputForm;
