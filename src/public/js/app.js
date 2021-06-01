document.addEventListener('DOMContentLoaded', () => {
       
    var evento = document.getElementById('evento');
    evento.addEventListener('click', () => {
        var count = 1;
        var proceso = setInterval(() => {
            document.documentElement.scrollTop += 10; 
            count++;
            if( count == 45 ){
                clearInterval(proceso);
            }
        }, 17); 
    })

});