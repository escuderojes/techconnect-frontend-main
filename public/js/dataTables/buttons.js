document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            let row = event.target.closest('tr');
            // Aquí puedes agregar tu lógica para editar la fila seleccionada
            console.log('Edit row:', row);
        });
    });

    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            let row = event.target.closest('tr');
            // Aquí puedes agregar tu lógica para eliminar la fila seleccionada
            console.log('Delete row:', row);
        });
    });
});