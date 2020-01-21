function addRow(p_head, p_one, p_two, p_three, p_tipo){
     
    //begin head
    var product_head;
    product_head = document.createElement('div');
    product_head.id = 'div_apple_header';
    product_head.classList.add('Rtable-cell');

    if(p_tipo=='impar'){
        product_head.classList.add('Rtable-cell--head');
    }else{
        product_head.classList.add('Rtable-cell--head-par');
    }
    //product_head.classList.add('Rtable-cell--head');

    var header = document.createElement('h3');
    var text = document.createTextNode(p_head);
    header.appendChild(text);

    product_head.appendChild(header);

    var products = document.getElementById('div_products');
    
    products.appendChild(product_head);
    //end head

    //begin product_detail_one

    var product_detail_one;

    product_detail_one = document.createElement('div');

    //product_detail_one.id = 'div_product_detail_one';

    product_detail_one.classList.add('Rtable-cell');

    if(p_tipo=='impar'){
        product_detail_one.classList.add('Rtable-cell-product-name');
    }else{
        product_detail_one.classList.add('Rtable-cell-product-name-par');
    }
    

    var parraph = document.createElement('p');

    text = document.createTextNode(p_one);

    parraph.appendChild(text);

    product_detail_one.appendChild(parraph);

    products.appendChild(product_detail_one);

    //end product_detail_one

    //begin product_detail_two

    var product_detail_two;

    product_detail_two = document.createElement('div');

    //product_detail_two.id = 'div_product_detail_two';

    product_detail_two.classList.add('Rtable-cell');

    if(p_tipo=='impar'){
        product_detail_two.classList.add('Rtable-cell--quantity');
    }else{
        product_detail_two.classList.add('Rtable-cell--quantity-par');
    }

    var parraph = document.createElement('p');
    text = document.createTextNode(p_two);
    parraph.appendChild(text);
    
    product_detail_two.appendChild(parraph);
    products.appendChild(product_detail_two);

    //end product_detail_two

    //begin product_detail_three

    var product_detail_three;

    product_detail_three = document.createElement('div');

    //product_detail_three.id = 'div_product_detail_three';

    product_detail_three.classList.add('Rtable-cell');

    if(p_tipo=='impar'){
        product_detail_three.classList.add('Rtable-cell--unit-price');
    }else{
        product_detail_three.classList.add('Rtable-cell--unit-price-par');
    }

    var parraph = document.createElement('p');
    text = document.createTextNode(p_three);
    parraph.appendChild(text);
    
    product_detail_three.appendChild(parraph);
    products.appendChild(product_detail_three);

    //end product_detail_three

    //begin foot
    /*var product_foot;
    product_foot = document.createElement('div');
    //product_foot.id = 'div_apple_header';
    product_foot.classList.add('Rtable-cell');
    product_foot.classList.add('Rtable-cell--foot');

    var foot = document.createElement('strong');
    text = document.createTextNode(p_foot);
    foot.appendChild(text);

    product_foot.appendChild(foot);
    
    products.appendChild(product_foot);
    */
    //end foot
console.log('You are in addRow');
/*<div class="Rtable-cell Rtable-cell--head"><h3>Eddard Stark</h3></div>
  <div class="Rtable-cell">Has a sword named Ice</div>
  <div class="Rtable-cell">No direwolf</div>
  <div class="Rtable-cell Rtable-cell--foot"><strong>Lord of Winterfell</strong></div>
*/
}
window.onload = function(){ 

    //addRow('Rossmar Akar', 'Has a sword named Ice', 'No direwolf', 'Knows All');


    
buildHtmlTable([
    {"product_name" : "tomate", "unit_measure": "kilogram", "unit_price" : 50, "quantity" : 3},
    {"product_name" : "cebolla", "unit_measure": "kilogram", "unit_price" : 25, "quantity" : 7},
    {"product_name" : "pera", "unit_measure": "kilogram", "unit_price" : 10, "quantity" : 10},
    {"product_name" : "manzana", "unit_measure": "kilogram", "unit_price" : 19.90, "quantity" : 0.630},
    {"product_name" : "naranja", "unit_measure": "kilogram", "unit_price" : 45.6, "quantity" : 0.500},
    {"product_name" : "zanahoria", "unit_measure": "kilogram", "unit_price" : 15.90, "quantity" : 0.305},
    {"product_name" : "brocoli", "unit_measure": "piece", "unit_price" : 39.90, "quantity" : 1},
    {"product_name" : "calabacita", "unit_measure": "kilogram", "unit_price" : 39.90, "quantity" : 0.200}, 
]);
    


} 
 
function buildHtmlTable(arr) {
    var format = new Intl.NumberFormat('en-INR', { 
        style: 'currency', 
        currency: 'MXN', 
        minimumFractionDigits: 2, 
    }); 
  for (var i = 0, maxi = arr.length; i < maxi; ++i) {

    var quantity = arr[i]['quantity'];
    var unit_price = arr[i]['unit_price'];
    var total_price = quantity * unit_price;
    var p_tipo = (i%2)? 'par' : 'impar';
    console.log(p_tipo);
    var p_head = arr[i]['product_name'];
    var p_one = format.format(total_price);//arr[i]['unit_measure'];
    var p_two = Number(quantity).toFixed(4);
    var p_three = format.format(unit_price); 
    addRow(p_head, p_one, p_two, p_three, p_tipo);
  }
}