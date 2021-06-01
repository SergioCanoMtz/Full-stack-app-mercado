function closeModal(){
    var body = document.getElementsByTagName('body')[0];
    var header = document.getElementsByTagName('header')[0];
    var active = document.getElementById('active');
    var pie = document.getElementById('pie');

    document.getElementById('modal').style= 'display: none;';
    body.style.overflow = '';
    header.style.background = '#fff';
    active.classList.add('active'); 
    pie.classList.remove('pie-hidden');
 }    
 
 function openModal(index){
     var active = document.getElementById('active');
     var item = document.getElementsByName('item');
     var pie = document.getElementById('pie');

     var body = document.getElementsByTagName('body')[0];
     var header = document.getElementsByTagName('header')[0];
     var name = item[index].getElementsByTagName('H3')[0].innerHTML;
     var image = item[index].getElementsByTagName('IMG')[0].src;
     var before = item[index].getElementsByTagName('P')[0].innerHTML;
    
     document.getElementById('modal').style= 'display: block;';
     document.getElementById('product').innerHTML = name;
     document.getElementById('image').src = image;
     document.getElementById('antes').innerHTML = before;
     body.style.overflow = 'hidden';
     header.style.background = 'rgba(255,255,255,.2)';
     active.classList.remove('active');
     pie.classList.add('pie-hidden');

 }