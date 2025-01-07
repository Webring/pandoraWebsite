import re

from rest_framework import serializers

from callback.models import Callback


class CallbackFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = Callback
        fields = '__all__'

    def validate_phone_number(self, value):
        # Проверка, что номер начинается с +7
        if not value.startswith('+7'):
            raise serializers.ValidationError("Номер телефона должен начинаться с '+7'.")

        # Регулярное выражение для проверки формата номера (11 цифр после +7)
        phone_regex = r'^\+7\d{10}$'
        if not re.match(phone_regex, value):
            raise serializers.ValidationError("Номер телефона должен содержать 11 цифр после '+7'.")

        return value

    def validate_name(self, value):
        # Проверка, что имя содержит хотя бы 2 буквы
        if len(value) < 2:
            raise serializers.ValidationError("Имя должно содержать хотя бы 2 буквы.")

        # Дополнительно, можно проверить, что в имени только буквы (не числа и символы)
        if not value.isalpha():
            raise serializers.ValidationError("Имя должно содержать только буквы.")

        return value

    def validate(self, data):
        if 'phone_number' in data:
            phone_number = data['phone_number']
            if not phone_number.startswith('+7'):
                raise serializers.ValidationError({"phone_number": "Номер телефона должен начинаться с '+7'."})
            if not re.match(r'^\+7\d{10}$', phone_number):
                raise serializers.ValidationError(
                    {"phone_number": "Номер телефона должен содержать 11 цифр после '+7'."})

        if 'name' in data:
            name = data['name']
            if len(name) < 2:
                raise serializers.ValidationError({"name": "Имя должно содержать хотя бы 2 буквы."})
            if not name.isalpha():
                raise serializers.ValidationError({"name": "Имя должно содержать только буквы."})

        return data