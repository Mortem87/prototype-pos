window.onload = function() {
    Arbol();
    SetMenu();
    CloseAccordion();
    OpenAccordion();
  };
  function OpenAccordion(){
    var arrow_up = document.getElementById('arrow_up');
    arrow_up.addEventListener('click', function (event) {
        arrow_up.style.display="none";
        var arrow_down = document.getElementById('arrow_down');
        arrow_down.style.display = null;
        
        var section_first = document.getElementById("first");
        section_first.style.display=null;

        var div_content = document.getElementById('div_content');
        div_content.style.height = "170px";//null;
      });
  }
  function CloseAccordion(){
    var arrow_down = document.getElementById('arrow_down');
    arrow_down.addEventListener('click', function (event) {
        arrow_down.style.display="none";
        var arrow_up = document.getElementById('arrow_up');
        arrow_up.style.display = null;

        var div_content = document.getElementById('div_content');
        div_content.style.height = "4em";
      });
  }
  function Arbol(){
    var tree = new Tree('one');
 
    tree._root.children.push(new Node('two'));
    tree._root.children[0].parent = tree;

    tree._root.children.push(new Node('three'));
    tree._root.children[1].parent = tree;

    tree._root.children.push(new Node('four'));
    tree._root.children[2].parent = tree;

    tree._root.children[0].children.push(new Node('five'));
    tree._root.children[0].children[0].parent = tree._root.children[0];

    tree._root.children[0].children.push(new Node('six'));
    tree._root.children[0].children[1].parent = tree._root.children[0];

    tree._root.children[2].children.push(new Node('seven'));
    tree._root.children[2].children[0].parent = tree._root.children[2];

    var element = 'four';

    tree.traverseBF(function(node) {
        console.log(node.data)
    });
    var currentTree = null;
    // tree is an example of a root node
    tree.contains(function(node){
      if (node.data === element) {
          console.log(node);
          currentTree = node;
      }
    }, tree.traverseBF);
    var profundidad = 0;
    while(currentTree.parent!=null){// || profundidad == 10){
      profundidad++;
      currentTree = currentTree.parent;
    }
    console.log('Profundidad de ' + element + ' es ' + profundidad);
  }

  function SetMenu(){
    

    var section_first;
    section_first = document.getElementById('first');
    section_first.appendChild(AddMenuElement('img/fruit.svg', 'Home', 'radio-0', 'home.html'));
    section_first.appendChild(AddMenuElement('img/person.svg', 'People', 'radio-1', 'people.html'));
    section_first.appendChild(AddMenuElement('img/fruit.svg', 'Products', 'radio-2', 'products.html'));
    section_first.appendChild(AddMenuElement('img/grape.svg', 'Sales', 'radio-3', 'sales.html'))
    section_first.appendChild(AddMenuElement('img/person.svg', 'Roles', 'radio-4', 'roles.html'));
    section_first.appendChild(AddMenuElement('img/person.svg', 'Stock', 'radio-5', 'home.html'));
    section_first.appendChild(AddMenuElement('img/person.svg', 'Recipes', 'radio-6', 'recipes.html'));
  }
function AddMenuElement(p_source, p_text, p_radio, p_page){
 
    var div_container;
    div_container = document.createElement('div');
    div_container.classList.add('container');
    
    var rd_four;
    rd_four = document.createElement('input');
    rd_four.type = 'radio';
    rd_four.name = 'group1';
    rd_four.id = p_radio;
    rd_four.addEventListener('click', 
    function(){
        var iframe = document.getElementById('ifrm_content');
        iframe.src = p_page;
        }, false
    );

    var lbl_radio_one;
    lbl_radio_one = document.createElement('label');
    lbl_radio_one.htmlFor = p_radio;

    var spn_rd;
    spn_rd = document.createElement('span');
    spn_rd.classList.add('radio');
    
    lbl_radio_one.appendChild(spn_rd);

    var div_head_person;
    div_head_person = document.createElement('div');
    div_head_person.classList.add('class-head-person');
    
    var div_menu_button;
    div_menu_button = document.createElement('div');
    div_menu_button.classList.add('menu-button');

    var img_person;
    img_person = document.createElement('img');
    img_person.classList.add('class-person');
    img_person.src = p_source;
    img_person.alt = 'person';

    div_menu_button.appendChild(img_person);

    var par_person_txt;
    par_person_txt = document.createElement('p');
    var txt_node;
    txt_node = document.createTextNode(p_text);
    par_person_txt.appendChild(txt_node);

    div_head_person.appendChild(div_menu_button);
    div_head_person.appendChild(par_person_txt);

    spn_rd.appendChild(div_head_person);

    div_container.appendChild(rd_four);
    div_container.appendChild(lbl_radio_one);

   return div_container;
}