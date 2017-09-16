//Создание счетов
$(document).on('click', '#new_account', function (event) {
//Проверка на существование счетов
    if (localStorage.getItem("myAccounts") == null) {
        var myAccounts = [ ];
    } else {
        var myAccounts = JSON.parse(localStorage.getItem("myAccounts"));
    }
//Создание нового счета
    function createAcc(nameAccount, sumAccount, currencyAccount) {
        this.nameAccount = nameAccount;
        this.sumAccount = sumAccount;
        this.currencyAccount = currencyAccount;
    }
    var nameAccount = document.getElementById('name_account').value;
    var sumAccount = document.getElementById('sum_account').value;
    var currencyAccount = document.querySelector('input[name=currency]:checked').value;

    var newAccount = new createAcc(nameAccount, sumAccount, currencyAccount);
    myAccounts.push(newAccount);
    var sObj = JSON.stringify(myAccounts);
    localStorage.setItem("myAccounts", sObj);
    var params = localStorage.myAccounts;
    $.ajax({
        type: "POST",
        url: "/json/accounts.json",
        data: params,
        dataType: "text",
        success: function(json){document.getElementById('form_validation').reset();}
    }); 
    document.location.reload(true);
});

//Таблица со счетами
$(document).ready(function(){
    var datatable_accounts = $('#table_accounts').DataTable({
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
            "url": "/json/accounts.json",
            "dataSrc": ""
        },
        "columnDefs": [
            {
                className: "dt-center",
                targets: "_all"
            }
        ],
        "columns": [
            { "data": "nameAccount" },
            { "data": "sumAccount" },
            { "data": "currencyAccount" },
            {
                "render": function (data, type, full, meta) {
                    return '<button type="button" data-id="' + full.nameAccount + '" data-target="#deleteWindow" data-toggle="modal" class="btn btn-default btn-circle waves-effect waves-circle waves-float deleteAccountBtn"><i class="material-icons">highlight_off</i></button>'
                }
            }
        ]
    });
//Удаление счета в таблице
    var row, row_data_acc;
    $(document).on('click', '.deleteAccountBtn', function (event) {
        event.preventDefault();
        row = this.closest('tr');
        row_data_acc = datatable_accounts.row(this.closest('tr')).data();
        var var1 = JSON.stringify(row_data_acc) + ',';
        var var2 =  ',' + JSON.stringify(row_data_acc);
        var var3 = JSON.stringify(row_data_acc);
        var result = localStorage.myAccounts.replace(var1, '');
        result = result.replace(var2, '');
        result = result.replace(var3, '');
        localStorage.setItem("myAccounts", result);
        var params = localStorage.myAccounts;
        $.ajax({
            type: "POST",
            url: "/json/accounts.json",
            data: params,
            dataType: "text"
        });
        document.location.reload(true);
    });
    $.ajax({
        type: "GET",
        url: "/json/accounts.json",
        success: function(json){
            var jsonOut = JSON.stringify(json);
            localStorage.setItem("myAccounts", jsonOut);
        }
    });
});