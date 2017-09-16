//отрисовка таблицы журнала операций
$(document).ready(function(){
    var datatable_journal = $('#journal_table').DataTable({
        dom: 'Bfrtip',
        buttons: [
            {
                extend: 'excel',
                text: 'Excel'
            },
            {
                extend: 'pdf',
                text: 'PDF'
            },
            {
                extend: 'print',
                text: 'Печать'
            }
            ],
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
            "url": "/json/journal.json",
            "dataSrc": ""
        },
       "columnDefs": [
            {
                className: "dt-center",
                targets: "_all"
            }
       ],
       "columns": [
           { "data": "accSel" },
           { "data": "category" },
           { "data": "date" },
           { "data": "sum" },
           { "data": "comment" }
        ]
    });  
});