
const itemData="ITEMS";
let loadItemData= function (){
    let pre_data=localStorage.getItem(itemData);
    let item_data_arr=JSON.parse(pre_data);

    if (item_data_arr) {
        $('#tableItemBody').empty();
        item_data_arr.map((result, index) => {
            var data = `
                <tr>
                    <th scope="row">${result.itemCode}</th>
                    <td>${result.name}</td>
                    <td>${result.qty}</td>
                    <td>${result.price}</td>
                    <td width="15%">
                        <button class="btn btn-success"  onclick="showNewItem(${index},true)">Edite</button>
                        <button class="btn btn-danger" onclick="deleteItem(${index})">Delete</button>
                    </td>
                </tr>`
            $('#tableItemBody').append(data);

        })

    }
    closeNewItem();
}
function showNewItem(id,boo){
    if (boo){
        let item=JSON.parse(localStorage.getItem(itemData));
        $('#itemCodeI').val(item[id].itemCode);
        $('#itemNameI').val(item[id].name);
        $('#itemQTYI').val(item[id].qty);
        $('#itemPriceI').val(item[id].price);
    }else {
        $('#itemCodeI').val("");
        $('#itemNameI').val("");
        $('#itemQTYI').val("");
        $('#itemPriceI').val("");
    }
    $('#newItemForm').css({
        visibility: "visible",
        top:"50%",
        transform: "translate(-50%,-50%)scale(1)",
    })
}

function deleteItem(i){
    let items=JSON.parse(localStorage.getItem(itemData));
    items.splice(i,1);
    console.log(i)
    localStorage.setItem(itemData,JSON.stringify(items));
    loadItemData();
}

function addToItemArray(){
    let pre_data = localStorage.getItem(itemData);
    let data_arr=[];
    if(pre_data) {
        data_arr = JSON.parse(pre_data);
    }
    let item={
        itemCode : $('#itemCodeI').val(),
        name : $('#itemNameI').val(),
        qty : $('#itemQTYI').val(),
        price : $('#itemPriceI').val()
    }
    let index =checkItemRecent(data_arr,item.itemCode);
    if (index!=-1) {
        item.name = $('#itemNameI').val(),
            item.qty = $('#itemQTYI').val(),
            item.price = $('#itemPriceI').val()
        data_arr.splice(index,1,item)
    }else {
        data_arr.unshift(item);
    }
    localStorage.setItem(itemData, JSON.stringify(data_arr));
    loadItemData();
}

function checkItemRecent(arr,id){
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].itemCode===id) {
            console.log(true);
            return i;
        }
    }
    return -1;
}



function closeNewItem(){
    $('#newItemForm').css({
        transform: "translate(-50%,-50%)scale(0.1)",
        top:"0%",
        // transition: "transform 0.1s,top 0.1s",
        visibility: "hidden"
    })
}


$('#btnNewItem').click(showNewItem);
$('#btnCancelNewItem').click(closeNewItem);
$('#btnSaveNewItem').click(addToItemArray);


loadItemData();