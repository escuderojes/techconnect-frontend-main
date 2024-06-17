
$(document).ready(function () {
    $('#dataTables-example').dataTable({
        language: {
            search: "Buscar por nombre: ", // Cambiar el texto del placeholder en la barra de búsqueda
            lengthMenu: "Cantidad _MENU_ " // Cambiar el texto del combobox
        }
    });
});
