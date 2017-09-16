//Валидация - создание счетов
$(function () {
    $('#form_validation').validate({
        rules: {
            'name': {
                required: true
            },
            'number': {
                required: true
            },
            'currency': {
                required: true
            }
        },
        messages: {
            "name": {
                required: "Обязательно для заполнения"
            },
            "number": {
                required: "Обязательно для заполнения",
                number: "Пожалуйста, введите число"
            },
            "currency": {
                required: "Обязательно для выбора"
            }
        },
        highlight: function (input) {
            $(input).parents('.form-line').addClass('error');
        },
        unhighlight: function (input) {
            $(input).parents('.form-line').removeClass('error');
        },
        errorPlacement: function (error, element) {
            $(element).parents('.form-group').append(error);
        }
    });
});

//Валидация - доход
$(function () {
    $('#form_validation_income').validate({
        rules: {
            'date': {
                required: true
            },
            'number': {
                required: true
            },
            'category': {
                required: true
            },
            'accSel': {
                required: true
            }
        },
        messages: {
            "date": {
                required: "Обязательно для заполнения"
            },
            "category": {
                required: "Обязательно для заполнения"
            },
            "accSel": {
                required: "Обязательно для заполнения / Создайте счет, если нет доступных"
            },
            "number": {
                required: "Обязательно для заполнения",
                number: "Пожалуйста, введите число",
                min: $.validator.format( "Пожалуйста, введите значение больше {0}." )
            }

        },
        highlight: function (input) {
            $(input).parents('.form-line').addClass('error');
        },
        unhighlight: function (input) {
            $(input).parents('.form-line').removeClass('error');
        },
        errorPlacement: function (error, element) {
            $(element).parents('.form-group').append(error);
        }
    });
});

//Валидация - расход
$(function () {
    $('#form_validation_spending').validate({
        rules: {
            'date': {
                required: true
            },
            'number': {
                required: true
            },
            'category': {
                required: true
            },
            'accSel': {
                required: true
            }
        },
        messages: {
            "date": {
                required: "Обязательно для заполнения"
            },
            "category": {
                required: "Обязательно для заполнения"
            },
            "accSel": {
                required: "Обязательно для заполнения / Создайте счет, если нет доступных"
            },
            "number": {
                required: "Обязательно для заполнения",
                number: "Пожалуйста, введите число",
                max: $.validator.format( "Пожалуйста, введите значение меньше {0}." )
            }
        },
        highlight: function (input) {
            $(input).parents('.form-line').addClass('error');
        },
        unhighlight: function (input) {
            $(input).parents('.form-line').removeClass('error');
        },
        errorPlacement: function (error, element) {
            $(element).parents('.form-group').append(error);
        }
    });
});