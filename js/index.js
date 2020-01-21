window.onload = function(e){ 
    //crear();
    
}
function crear(){
    var list = [  
        { "col_1": "val_11", "col_3": "val_13" }, 
        { "col_2": "val_22", "col_3": "val_23" }, 
        { "col_1": "val_31", "col_3": "val_33" } 
    ]; 
    var col = 4;//document.getElementById('cols').value;
    var filas = 4;//document.getElementById('rows').value;
    var tabla="<table border='1'>";
    for(i=0;i<filas;i++){
    tabla+='<tr>';
    for(j=0;j<col;j++){
        if(i==0){
            if(j==0){
                tabla+='<th> ' + 'Nombre del Producto' +'</th>';
            }else if(j==1){
                tabla+='<th> ' + 'Cantidad' +'</th>';
            }else if(j==2){
                tabla+='<th> ' + 'Precio Unitario' +'</th>';
            }else if(j==3){
                tabla+='<th> ' + 'SubTotal' +'</th>';
            }else{
                tabla+='<th> ' + 'celda:(' + i +', '+ j +')</th>';
            }
        }else{
            tabla+='<td> ' + 'celda:(' + i +', '+ j +')</td>';
        }
    
    }
    tabla+='</tr>';
    }
    tabla+='</table>';
    document.getElementById('resultado').innerHTML=tabla;
}
function crear2(){
    document.getElementById('resultado').innerHTML='';
}

// Builds the HTML Table out of myList json data from Ivy restful service.
function buildHtmlTable(arr) {
    _table_.id = "tb_products"
  var table = _table_.cloneNode(false),
    columns = addAllColumnHeaders(arr, table);
  for (var i = 0, maxi = arr.length; i < maxi; ++i) {
    var tr = _tr_.cloneNode(false);
    for (var j = 0, maxj = columns.length; j < maxj; ++j) {
      var td = _td_.cloneNode(false);
      cellValue = arr[i][columns[j]];
      td.appendChild(document.createTextNode(arr[i][columns[j]] || ''));
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  return table;
}

// Adds a header row to the table and returns the set of columns.
// Need to do union of keys from all records as some records may not contain
// all records
function addAllColumnHeaders(arr, table) {
  var columnSet = [],
    tr = _tr_.cloneNode(false);
  for (var i = 0, l = arr.length; i < l; i++) {
    for (var key in arr[i]) {
      if (arr[i].hasOwnProperty(key) && columnSet.indexOf(key) === -1) {
        columnSet.push(key);
        var th = _th_.cloneNode(false);
        th.appendChild(document.createTextNode(key));
        tr.appendChild(th);
      }
    }
  }
  table.appendChild(tr);
  return columnSet;
}
var _table_ = document.createElement('table'),
  _tr_ = document.createElement('tr'),
  _th_ = document.createElement('th'),
  _td_ = document.createElement('td');