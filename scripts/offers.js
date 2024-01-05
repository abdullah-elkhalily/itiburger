// _____________________________Sale Menu_____________________________
const addItem = document.querySelectorAll('.add-item');
let burgerName,burgerPrice;

addItem.forEach((btn)=> btn.addEventListener('click',(evt)=>{
    const contentBurger = evt.target.parentElement;
     burgerName = contentBurger.getElementsByClassName('hs1')[0].innerHTML;
     burgerPrice = contentBurger.getElementsByClassName('hs2')[0].innerHTML;
    
    showMenu();
}))



const qty = document.querySelector('#qty');
const cartMenu = document.getElementById('cart-menu');
const invoiceModal = document.getElementById('invoiceModal');
const invoice = document.getElementById('invoice');

const plus = () => qty.value = +qty.value + 1;  // زيادة الكمية
const minus = () => qty.value = qty.value >= 1 ? --qty.value : 0;  //لا يسمح بطرح اقل من صفر 

const closeMenu = ()=> cartMenu.classList.remove('visbile')
const closeInvoice = () => invoiceModal.classList.remove('visbile-invoice')
const showMenu = () =>{

    let newPosition = document.documentElement.scrollTop + cartMenu.offsetHeight/2;
    cartMenu.style.top =  newPosition + 'px';

     document.getElementById('menuBurgerPrice').textContent = burgerPrice
     document.getElementById('menuBurgerName').textContent = burgerName
     qty.value = 1;

    setTimeout(()=>cartMenu.classList.add('visbile'),150)
}

// _____________________________Invoice_____________________________
const cancelInvoice = ()=>{
    const confim = confirm('هل انت متأكد من حذف الفاتورة')
    if(confim){
        sessionStorage.removeItem('inovice')
        invoice.innerHTML = `<th>اسم الصنف</th><th>السعر</th><th>الكمية</th><th>الاجمالى</th>`;
    }
}

const showInvoice = () => {

    let newPosition = document.documentElement.scrollTop + invoiceModal.offsetHeight/2;
    invoiceModal.style.top =  newPosition + 'px';
    getSessionItems();
    setTimeout(()=>invoiceModal.classList.add('visbile-invoice'),150);
    
}



const getSessionItems =()=>{
    
    inovice.orders = [];

    const obj = sessionStorage.getItem("inovice");
    if(obj){
        inovice.orders = JSON.parse(obj).orders;
        let total = 0;
        invoice.innerHTML  = `<th>اسم الصنف</th><th>السعر</th><th>الكمية</th><th>الاجمالى</th>`;
        inovice.orders.forEach((order)=>{
      
            invoice.innerHTML += `
            <tr>
            <td>
            ${order.burgerName}
            </td>
            <td>
            ${order.burgerPrice}
            </td>
            <td>
            ${order.burgerQty}
            </td>
            <td>
            ${+order.burgerQty *  Number(order.burgerPrice.replace("$","").replace(",","."))}
            </td>
            </tr>`
            total += (+order.burgerQty *  Number(order.burgerPrice.replace("$","").replace(",",".")))
        })

        invoice.innerHTML += `<tr><td class='total-td'> الاجمالى : </td> <td class='total-td'> ${total} </td> `
    }

    if(inovice.orders.length == 0){ invoice.innerHTML = `<tr><td>لا يوجد اصناف لعرضها </td></tr>` }
}




const inovice = {
 orders:[]
}

function saveInvoice(){

    inovice.orders = [];
    const data = sessionStorage.getItem("inovice");
    if(data){inovice.orders = JSON.parse(data).orders}
    


    const currentInvoice = {
        "burgerName":burgerName,
        "burgerPrice":burgerPrice,
        "burgerQty":qty.value
};

    inovice.orders.push(currentInvoice)


 
    sessionStorage.setItem("inovice", JSON.stringify(inovice));
    closeMenu();
}


