
const cusData="DATA";
import {Customer} from "../model/Customer.js";
let deleteCustomer=function (i){
    let customers=JSON.parse(localStorage.getItem(cusData));
    customers.splice(i,1);
    localStorage.setItem(cusData,JSON.stringify(customers));
    loadCustomerData();
}

function addToCustomerArray(){
    let pre_data = localStorage.getItem(cusData);
    let data_arr=[];
    if(pre_data) {
        data_arr = JSON.parse(pre_data);
    }
    let customer={
        customerID : $('#customerIDC').val(),
        name : $('#customerNameC').val(),
        address : $('#customerAddressC').val(),
        mobile : $('#customerMobileC').val(),
        salary : $('#customerSalaryC').val()
    }
    let index =checkCusResentId(data_arr,customer.customerID);
    if (index!=-1) {
        customer.name = $('#customerNameC').val(),
            customer.address = $('#customerAddressC').val(),
            customer.mobile = $('#customerMobileC').val(),
            customer.salary = $('#customerSalaryC').val()
        data_arr.splice(index,1,customer)
    }else {
        console.log("+++++++++")
        data_arr.unshift(customer);
    }
    localStorage.setItem(cusData, JSON.stringify(data_arr));
    loadCustomerData();
}
function addToCartArray(){
    let pre_data = localStorage.getItem(cartData);
    let data_arr=[];
    if(pre_data) {
        data_arr = JSON.parse(pre_data);
    }
    let itemCode = $('#itemCodeOrder').val();
    let itemName = $('#itemNameOrder').val();
    let itemQty = $('#itemQuentityOrder').val();
    let itemPrice = $('#itemPriceOrder').val();
    if (itemCode && itemName && itemQty && itemPrice) {
        let index = checkItemRecent(data_arr, itemCode);
        if (-1 !== index) {
            data_arr[index].name=itemName;
        } else {
        }
        let cart = {
            itemCode: itemCode,
            name: itemName,
            price: itemPrice,
            qty: itemQty,
            total: itemQty * itemPrice
        }
        data_arr.unshift(cart);
    }
    localStorage.setItem(cartData, JSON.stringify(data_arr));
    reloadCartData();

}
function checkCusResentId(arr,id){
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].customerID===id) {
            return i;
        }
    }
    return -1;
}
function viewCustomersForm(){
    $('#homeSection').css("display","none")
    $('#customerSection').css("display","inherit")
    $('#itemSection').css("display","none")
    $('#orderSection').css("display","none")
}
function loadCustomerData(){
    console.log("run wenoo")
    let pre_data=localStorage.getItem(cusData);
    let customer_data_arr=JSON.parse(pre_data);

    if (customer_data_arr) {
        $('#tableCustomerBody').empty();
        let indext=0;
        customer_data_arr.map((result, index) => {


            var data = `
                <tr>
                    <th scope="row">${result.customerID}</th>
                    <td>${result.name}</td>
                    <td>${result.address}</td>
                    <td>${result.mobile}</td>
                    <td>${result.salary}</td>
                    <td width="15%">
                        <button class="btn btn-success" id="btn-delete" /*onclick="showNewCustomer(${index},true)*/">Edite</button>
                        <button class="btn btn-danger" onclick="deleteCustomer(${index})">Delete</button>
                    </td>
                </tr>`
            $('#tableCustomerBody').append(data);

        })

    }

    closeNewCustomer();
}


function closeNewCustomer(){
    $('#newCustomerForm').css({
        transform: "translate(-50%,-50%)scale(0.1)",
        top:"0%",
        // transition: "transform 0.1s,top 0.1s",
        visibility: "hidden"
    })
}

function showNewCustomer(id,boo) {
    if (boo){

        let customerArr=JSON.parse(localStorage.getItem("DATA"));
        $('#customerIDC').val(customerArr[id].customerID);
        $('#customerNameC').val(customerArr[id].name);
        $('#customerAddressC').val(customerArr[id].address);
        $('#customerMobileC').val(customerArr[id].mobile);
        $('#customerSalaryC').val(customerArr[id].salary);
    }else {
        $('#customerIDC').val(id);
        $('#customerNameC').val("");
        $('#customerAddressC').val("");
        $('#customerMobileC').val("");
        $('#customerSalaryC').val("");
    }
    $('#newCustomerForm').css({
        visibility: "visible",
        top:"50%",
        transform: "translate(-50%,-50%)scale(1)",
    })
}


$('#customer-table').on('click','button',(e) =>{
    let id = e.target.id;
    let text = $(e.target).closest('tr').find('th').eq(0).text();
    console.log(text)
})
$('#btnSaveNewCustomer').click(addToCustomerArray);
$('#btnNewCustomer').click(function () {showNewCustomer(0,false)});
$('#btnCanceNewCustomer').click(closeNewCustomer);
$('#btnViewCustomers').click(viewCustomersForm);
$('#navViewCustomer ').click(viewCustomersForm);
$('#addToCartBtn').click(addToCartArray);
$('#btn').click(addToCartArray);
loadCustomerData();
