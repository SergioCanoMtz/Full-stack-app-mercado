document.addEventListener('DOMContentLoaded', function(){
    var ver = document.getElementById('ver');
    var opc = document.getElementById('opc');
    window.onscroll = ()=> reducciondeHeader();

    function reducciondeHeader() {       
        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
            document.getElementById("derecha").className = "derecha";
            document.getElementById("abajo").className = "abajo";
            document.getElementById("logo").className = "pequeno";
            document.getElementById("minimo").className = ' minimo';
        } else{
            document.getElementById("derecha").className = "back";
            document.getElementById("abajo").className = "regreso";
            document.getElementById("logo").className = "";
            document.getElementById("minimo").className = "";
        }
    }
    
    ver.addEventListener('click', () => {
        opc.classList.toggle('show');
    })
});