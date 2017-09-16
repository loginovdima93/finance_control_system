$(document).ready(function () {
//Получение доступных счетов
    $.getJSON("/json/accounts.json", {}, function (data) {
        $.each(data, function (i, item) {
            $('.accountSelector').append('<option>' + item.nameAccount + '</option>');
        });
    });

//Таблица с курсом валют в меню (необходимо подключение к интернету)
    $(document).ready(function () {
        $.ajax({
            type: "GET",
            url: "https://query.yahooapis.com/v1/public/yql?q=select+*+from+yahoo.finance.xchange+where+pair+=+%22USDRUB,EURRUB,USDEUR%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=",
            success: function (json) {
                var USDRUB = json.query.results.rate[0].Rate;
                var EURRUB = json.query.results.rate[1].Rate;
                var USDEUR = json.query.results.rate[2].Rate;
                var myRate = [USDRUB, EURRUB, USDEUR];
                localStorage.setItem("myRate", JSON.stringify(myRate));
                $('#currency_rate').append('<div class="card"><div class="body table-responsive"><table class="table"><thead><tr><th>Валюта</th><th>Курс</th></tr></thead><tbody><tr><th>USD</th><th>' + USDRUB + ' RUB</th></tr><tr><th>EUR</th><th>' + EURRUB + ' RUB</th></tr><tr><th>USD</th><th>' + USDEUR + ' EUR</th></tr></tbody></table></div></div>');
            }
        });

//Подсчет всех доступных средств
        $.getJSON("/json/accounts.json", {}, function (data) {
            var itemsUSD = [];
            var itemsEUR = [];
            var itemsRUB = [];
            $.each(data, function (i, item) {
                if (item.currencyAccount == "USD") {
                    var n = parseFloat(item.sumAccount);
                    itemsUSD.push(n)
                }
            });
            $.each(data, function (i, item) {
                if (item.currencyAccount == "EUR") {
                    var n = parseFloat(item.sumAccount);
                    itemsEUR.push(n)
                }
            });
            $.each(data, function (i, item) {
                if (item.currencyAccount == "RUB") {
                    var n = parseFloat(item.sumAccount);
                    itemsRUB.push(n)
                }
            });
            var sumUSD = 0;
            var sumEUR = 0;
            var sumRUB = 0;
            for (var i = 0; i < itemsUSD.length; i++) {
                sumUSD = sumUSD + itemsUSD[i];
            }
            for (var i = 0; i < itemsEUR.length; i++) {
                sumEUR = sumEUR + itemsEUR[i];
            }
            for (var i = 0; i < itemsRUB.length; i++) {
                sumRUB = sumRUB + itemsRUB[i];
            }
            $('#totalMoney').append('<div class="card"><div class="header bg-indigo"><h2>Доступные средства по отдельным валютам</h2></div><div class="body table-responsive"><table class="table"><thead><tr><th></th><th></th></tr></thead><tbody><tr><th>' + sumRUB + '</th><th>RUB</th></tr><tr><th>' + sumUSD + '</th><th>USD</th></tr><tr><th>' + sumEUR + '</th><th>EUR</th></tr></tbody></table></div></div>');

//Пересчет всех средств в единой валюте (курс валют получаем из интернета)
            if (localStorage.getItem("myRate") != null) {
                var currency_r = JSON.parse(localStorage.getItem("myRate"));
                var USDRUB = parseFloat(currency_r[0]);
                var EURRUB = parseFloat(currency_r[1]);
                var RUB = (sumRUB + sumUSD * USDRUB + sumEUR * EURRUB).toFixed(2);
                var USD = (RUB / USDRUB).toFixed(2);
                var EUR = (RUB / EURRUB).toFixed(2);
                $('#totalSum').append('<div class="card"><div class="header bg-indigo"><h2>Сумма доступных средств в одной валюте</h2></div><div class="body table-responsive"><table class="table"><thead><tr><th></th><th></th></tr></thead><tbody><tr><th>' + RUB + '</th><th>RUB</th></tr><tr><th>' + USD + '</th><th>USD</th></tr><tr><th>' + EUR + '</th><th>EUR</th></tr></tbody></table></div></div>');
            }
        });
    });

//Календарь для выбора даты в формах доходов/расходов
    $('.date').bootstrapMaterialDatePicker({
        time: false,
        clearButton: true
    });
});