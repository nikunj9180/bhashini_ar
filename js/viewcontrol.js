const cont1 = document.getElementById('threeview');
const cont2 = document.getElementById('arview');
const b1=document.getElementById('btn1');
const b2=document.getElementById('btn2');

cont1.classList.add("active");

b1.addEventListener('click',()=>{
    cont1.classList.add("active")
    cont2.classList.remove("active");
});
b2.addEventListener('click',()=>{
    cont2.classList.add("active")
    cont1.classList.remove("active");
});