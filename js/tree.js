/*Node
data stores a value.
parent points to a node's parent.
children points to the next node in the list.
Tree
_root points to the root node of a tree.
traverseDF(callback) traverses nodes of a tree with DFS.
traverseBF(callback) traverses nodes of a tree with BFS.
contains(data, traversal) searches for a node in a tree.
add(data, toData, traverse) adds a node to a tree.
remove(child, parent) removes a node in a tree. 
*/
function Node(data) {
    this.data = data;
    this.parent = null;
    this.children = [];
}
 
function Tree(data) {
    var node = new Node(data);
    this._root = node;
}
 
Tree.prototype.traverseDF = function(callback) {
 
    // this is a recurse and immediately-invoking function
    (function recurse(currentNode) {
        // step 2
        for (var i = 0, length = currentNode.children.length; i < length; i++) {
            // step 3
            recurse(currentNode.children[i]);
        }
 
        // step 4
        callback(currentNode);
 
        // step 1
    })(this._root);
 
};
 
Tree.prototype.traverseBF = function(callback) {
    var queue = new Queue();
 
    queue.enqueue(this._root);
 
    currentTree = queue.dequeue();
    var contador = 0;
    while(currentTree!='Underflow'){
        
        for (var i = 0, length = currentTree.children.length; i < length; i++) {
            contador++;
            queue.enqueue(currentTree.children[i]);
        }
 
        callback(currentTree);
        currentTree = queue.dequeue();
    }
    console.log('Contador:' + contador);
};
function nivelElemRecursivo(currentTree, elem, nivel){
    var tempo=0;
    if(currentTree==null){
        return -1;
    }else if(currentTree.data == elem){
        return nivel;
    }else{
        for (var i = 0, length = currentTree.children.length; i < length; i++) {
            tempo=nivelElemRecursivo(currentTree.children[i], elem, nivel + 1);
            if(tempo!=-1){
                return tempo;
            }
            return -1;
        }
    }
}
Tree.prototype.contains = function(callback, traversal) {
    traversal.call(this, callback);
};
 
Tree.prototype.add = function(data, toData, traversal) {
    var child = new Node(data),
        parent = null,
        callback = function(node) {
            if (node.data === toData) {
                parent = node;
            }
        };
 
    this.contains(callback, traversal);
 
    if (parent) {
        parent.children.push(child);
        child.parent = parent;
    } else {
        throw new Error('Cannot add node to a non-existent parent.');
    }
};
 
Tree.prototype.remove = function(data, fromData, traversal) {
    var tree = this,
        parent = null,
        childToRemove = null,
        index;
 
    var callback = function(node) {
        if (node.data === fromData) {
            parent = node;
        }
    };
 
    this.contains(callback, traversal);
 
    if (parent) {
        index = findIndex(parent.children, data);
 
        if (index === undefined) {
            throw new Error('Node to remove does not exist.');
        } else {
            childToRemove = parent.children.splice(index, 1);
        }
    } else {
        throw new Error('Parent does not exist.');
    }
 
    return childToRemove;
};
 
function findIndex(arr, data) {
    var index;
 
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].data === data) {
            index = i;
        }
    }
 
    return index;
}
/*public int nivelElemRecursivo(Nodo nodo.string elem, int nivel){
    int tempo=0;
    if(nodo==null){
        return -1;
    }else if(nodo.getDato().equals(elem)){
        return nivel;
    }else{
        for(int i=0; i< nodo.nohijos; i++){
            tempo=nivelElemRecursivo(nodo.hijos[i].elem.nivel+1);
            if(tempo!=-1){
                return tempo;
            }
            return -1;
        }
    }
}
*/

