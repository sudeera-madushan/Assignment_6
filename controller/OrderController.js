
const cartData="CART";

function searchCusOrder(){
    let customerId=$('#customerIDOrder').val();
    let customersArr=JSON.parse(localStorage.getItem(cusData));
    let object=searchCusMethod(customersArr,customerId);
    if (object!==null){
        $('#customerNameOrder').val(object.name);
        $('#customerAddressOrder').val(object.address);
        $('#customerMobileOrder').val(object.mobile);
        $('#customerSalaryOrder').val(object.salary);
    }else {

        $('#customerNameOrder').val("");
        $('#customerAddressOrder').val("");
        $('#customerMobileOrder').val("");
        $('#customerSalaryOrder').val("");
        alert("Not Found")
    }

}

function searchCusMethod(arr,id){
    for (const arrElement of arr) {
        if (arrElement.customerID===id){
            return arrElement;
        }
    }
    return null;
}

function searchItemOrder(){
    let itemCode=$('#itemCodeOrder').val();
    let itemArr=JSON.parse(localStorage.getItem(itemData));
    let object=searchItemMethod(itemArr,itemCode);
    if (object!==null){
        $('#itemNameOrder').val(object.name);
        $('#itemPriceOrder').val(object.price);
        $('#itemQtyOnOrder').val(object.qty);
    }else {
        $('#itemNameOrder').val("");
        $('#itemPriceOrder').val("");
        $('#itemQtyOnOrder').val("");
        alert("Not Found");
    }
}

function searchItemMethod(arr,id){
    for (const arrElement of arr) {
        if (arrElement.itemCode===id){
            return arrElement;
        }
    }
    return null;
}

function reloadCartData(){
    let cart=JSON.parse(localStorage.getItem(cartData));
    cart.map((object,index) =>{
        var data = `
                <tr>
                    <th scope="row">${object.itemCode}</th>
                    <td>${object.name}</td>
                    <td>${object.price}</td>
                    <td>${object.qty}</td>
                    <td>${object.total}</td>

                    <td width="15%">
                        <button class="btn btn-success" >Edite</button>
                        <button class="btn btn-danger" ">Delete</button>
                    </td>
                </tr>`
        $('#tableCartBody').append(data);
    });
}


$('#searchCusOrder').click(searchCusOrder);
$('#searchItemOrder').click(searchItemOrder);


reloadCartData();