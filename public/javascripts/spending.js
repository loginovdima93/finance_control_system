//Cоздание расходов
$(document).on('click', '#new_spending', function (event) {
//Проверка на существование расходов
    $.getJSON( "/json/accounts.json", {}, function(data) {
        if (localStorage.getItem("mySpending") == null) {
            var mySpending = [ ];
        } else {
            var mySpending = JSON.parse(localStorage.getItem("mySpending"));
        }
//Проверка на существование данных журнала операций
        if (localStorage.getItem("myJournal") == null) {
            var myJournal = [ ];
        } else {
            var myJournal = JSON.parse(localStorage.getItem("myJournal"));
        }
//Создание нового расхода
        function createSpending(date, category, accSel, sum, comment) {
            this.date = date;
            this.category = category;
            this.accSel = accSel;
            this.sum = sum;
            this.comment = comment;
        }
        var date = document.getElementById('spending_date').value;
        var category = document.getElementById('spending_category').value;
        var accSel = document.getElementById('spending_acc').value;
        var sum1 = document.getElementById('spending_sum').value;
        var comment = document.getElementById('spending_comment').value;

        if((date != "") && (category != "") && (accSel != "") && (sum1 != "")){
            var itemsV = [];
            var items = [];
            $.each(data, function (i, item) {
                if (item.nameAccount == accSel) {
                    var v = item.currencyAccount;
                    itemsV.push(v);
                    var n = parseFloat(item.sumAccount);
                    items.push(n);
                }
            });

            var money = items[0] + parseFloat(sum1);
            var old = '"'+JSON.stringify(items[0])+'"';
            var oldjson = JSON.stringify(localStorage.myAccounts);
            var normal_oldjson = oldjson.replace(/\\/g, '');
            var new_money = '"'+money.toString()+'"';
            var sObj_r = normal_oldjson.replace(old, new_money);
            var sObj_n = sObj_r.replace('"[', '[');
            var sObj_new = sObj_n.replace(']"', ']');
            localStorage.removeItem('myAccounts');
            localStorage.setItem("myAccounts", sObj_new);
            var newAcc_sum = localStorage.myAccounts;

            $.ajax({
                type: "POST",
                url: "/json/accounts.json",
                data: newAcc_sum,
                dataType: "text"
            });
            var sum = sum1 + ' ' + itemsV;
            var newSpending = new createSpending(date, category, accSel, sum, comment);
            mySpending.push(newSpending);
            myJournal.push(newSpending);
            var sObj = JSON.stringify(mySpending);
            var sObjmj = JSON.stringify(myJournal);
            localStorage.setItem("mySpending", sObj);
            localStorage.setItem("myJournal", sObjmj);
            var params = localStorage.mySpending;
            var paramsO = localStorage.myJournal;
            $.ajax({
                type: "POST",
                url: "/json/journal.json",
                data: paramsO,
                dataType: "text"
            });
            $.ajax({
                type: "POST",
                url: "/json/spending.json",
                data: params,
                dataType: "text",
                success: function(json){document.getElementById('form_validation_spending').reset();}
            });
            document.location.reload(true);
        }
    });
});

//Таблица с расходами
$(document).ready(function(){
    var datatable_spending = $('#table_myspending').DataTable({
        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "Все"]],
        "language": {
            "lengthMenu": "Показывать по _MENU_",
            "sSearch": "Поиск:",
            "zeroRecords": "Ничего не найдено",
            "emptyTable": "В таблице нет данных",
            "info": "Всего _TOTAL_. Показаны с _START_ по _END_.",
            "infoEmpty": "Всего 0. Показаны с 0 по 0.",
            "loadingRecords": "Загрузка...",
            "paginate": {
                "first": "Первая",
                "last": "Последняя",
                "next": "Следующая",
                "previous": "Предыдущая"
            }
        },
        "ajax": {
            "url": "/json/spending.json",
            "dataSrc": ""
        },
        "columnDefs": [
            {
                className: "dt-center",
                targets: "_all"
            }
        ],
        "columns": [
            {"data": "accSel"},
            {"data": "category"},
            {"data": "date"},
            {"data": "sum"},
            {"data": "comment"},
            {
                "render": function (data, type, full, meta) {
                    return '<button type="button" data-id="' + full.accSel + '" data-target="#deleteWindow" data-toggle="modal" class="btn btn-default btn-circle waves-effect waves-circle waves-float deleteSpendingBtn"><i class="material-icons">highlight_off</i></button>'
                }
            }
        ]
    });
//Удаление расхода в таблице
    var row, row_data_acc;
    $(document).on('click', '.deleteSpendingBtn', function (event) {
        event.preventDefault();
        row = this.closest('tr');
        row_data_acc = datatable_spending.row(this.closest('tr')).data();
        $.getJSON( "/json/accounts.json", {}, function(data) {
            var items = [];
            $.each(data, function (i, item) {
                if (item.nameAccount == row_data_acc.accSel) {
                    var n = parseFloat(item.sumAccount);
                    items.push(n);
                }
            });
            sum1 = row_data_acc.sum.split(' ')[0];

            var money = items[0] - parseFloat(sum1);
            var old = '"'+JSON.stringify(items[0])+'"';
            var oldjson = JSON.stringify(localStorage.myAccounts);
            var normal_oldjson = oldjson.replace(/\\/g, '');
            var new_money = '"'+money.toString()+'"';
            var sObj_r = normal_oldjson.replace(old, new_money);
            var sObj_n = sObj_r.replace('"[', '[');
            var sObj_new = sObj_n.replace(']"', ']');
            localStorage.removeItem('myAccounts');
            localStorage.setItem("myAccounts", sObj_new);
            var newAcc_sum = localStorage.myAccounts;
            $.ajax({
                type: "POST",
                url: "/json/accounts.json",
                data: newAcc_sum,
                dataType: "text"
            });
            var var1 = JSON.stringify(row_data_acc) + ',';
            var var2 =  ','+ JSON.stringify(row_data_acc);
            var var3 = JSON.stringify(row_data_acc);
            var step1 = localStorage.mySpending.replace(var1, '');
            var step2 = step1.replace(var2, '');
            var step3 = step2.replace(var3, '');
            var incomeLs = localStorage.getItem("myIncome");
            if (incomeLs == "[]"){var newJournal = step3} else if (step3 == "[]"){var newJournal = incomeLs}  else {var newJournal = step3 + incomeLs}
            localStorage.setItem("mySpending", step3);
            localStorage.setItem("myJournal", newJournal);
            var params = localStorage.mySpending;
            var paramsO = localStorage.myJournal;
            $.ajax({
                type: "POST",
                url: "/json/journal.json",
                data: paramsO,
                dataType: "text"
            });
            $.ajax({
                type: "POST",
                url: "/json/spending.json",
                data: params,
                dataType: "text"
            });
            document.location.reload(true);
        });
    });
    $.ajax({
        type: "GET",
        url: "/json/spending.json",
        success: function(json){
            var jsonOut = JSON.stringify(json);
            localStorage.setItem("mySpending", jsonOut);
        }
    });
});