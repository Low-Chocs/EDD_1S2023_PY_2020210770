var global_count = 1;

// CLASE NODO 
class Tnode {

    constructor(folderName) {
        this.folderName = folderName;
        this.files = [];
        this.children = []; // TODOS LOS NODOS HIJOS
        this.id = null; // PARA GENERAR LA GRÁFICA
    }
}


class Tree {
    constructor() {
        this.root = new Tnode('/');
        this.root.id = 0;
        this.size = 1; // Para generar los ids
    }

    insert(folderName, fatherPath) {
        let newNode = new Tnode(folderName);
        let fatherNode = this.getFolder(fatherPath);
        if (fatherNode) {
            let duplicateNode = fatherNode.children.find(node => node.folderName === folderName);
            if (duplicateNode) {
                alert("Ya existe un nodo con el mismo nombre se creara una copia");
                newNode.folderName += "(Copia Estructuras "+global_count+")";
                this.size += 1;
                newNode.id = this.size;
                fatherNode.children.push(newNode);
                global_count++;
                return;
            }
            this.size += 1;
            newNode.id = this.size;
            fatherNode.children.push(newNode);
        } else {
            alert("Ruta no existe");
        }
    }


    getFolder(path) {
        // Padre sea una '/'
        // console.log(path);
        if (path == this.root.folderName) {
            return this.root;
        } else {
            let temp = this.root;
            let folders = path.split('/');
            folders = folders.filter(str => str !== '');
            let folder = null;
            while (folders.length > 0) {
                let currentFolder = folders.shift()
                folder = temp.children.find(child => child.folderName == currentFolder);
                if (typeof folder == 'undefined' || folder == null) {
                    return null;
                }
                temp = folder;
            }
            return temp;
        }
    }



    deleteFolder(folderPath) {
        // Buscar el nodo de la carpeta a eliminar
        let nodeToDelete = folderPath;
        if (!nodeToDelete) {
            console.log("La carpeta no existe");
            return;
        }

        // Buscar el padre del nodo a eliminar
        let currentNode = this.getFolder(folderPath);

        // Eliminar el nodo del array de hijos del padre
        currentNode.children = [];
        let nuevaCadena = "";
        for (let i = folderPath.length - 1; i >= 0; i--) {
            if (folderPath[i] === '/') {
                break;
            }
            nuevaCadena += folderPath[i];
        }

        let nuevaCadena2 = "";
        let encontrado = false;

        for (let i = folderPath.length - 1; i >= 0; i--) {
            if (folderPath[i] === '/') {
                if (!encontrado) {
                    encontrado = true;
                } else {
                    break;
                }
            }
            if (encontrado) {
                if (folderPath[i] === ' ') {
                    break;
                }
                nuevaCadena2 = folderPath[i] + nuevaCadena;
            }
        }

        console.log(nuevaCadena2);
        let palabraInvertida = nuevaCadena2.split("").reverse().join("");
        let parentNode = this.getFolder(palabraInvertida);
        let palabraInvertida2 = nuevaCadena.split("").reverse().join("");
        console.log(nuevaCadena)
        let actual = parentNode.children.indexOf(palabraInvertida2);
        if (actual !== -1) {
            parentNode.splice(indice, 1);
          }

        // console.log(divToDelete);
        // console.log(prueba);
        // divToDelete.remove();

    }

    graph() {
        let nodes = "";
        let connections = "";

        let node = this.root;
        let queue = [];
        queue.push(node);
        while (queue.length !== 0) {
            let len = queue.length;
            for (let i = 0; i < len; i++) {
                let node = queue.shift();
                nodes += `S_${node.id}[label="${node.folderName}"];\n`;
                node.children.forEach(item => {
                    connections += `S_${node.id} -> S_${item.id};\n`
                    queue.push(item);
                });
            }
        }
        return 'node[shape="record"];\n' + nodes + '\n' + connections;
    }

    getHTML(path) {
        let node = this.getFolder(path);
        let code = "";
        node.children.map(child => {
            code += ` <div class="col-2 folder" onclick="go_to_file('${child.folderName}')" id="${path.replace('/', '') + child.folderName.replace('/', '')}">
                        <img class="file_images"src="Fase2/CSS/Images/file.png"/>
                        <p class="legend">${child.folderName}</p>
                    </div>`
        })
        // console.log(node.files)
        node.files.map(file => {
            if (file.type === 'text/plain') {
                let archivo = new Blob([file.content], file.type);
                const url = URL.createObjectURL(archivo);
                code += `
                        <div class="col-2 folder">
                        <img src="./imgs/file.png" width="100%"/>
                        <p class="h6 text-center">
                            <a href="${url}" download>
                                ${file.name}
                            </a>
                        </p>
                    </div>
                `
            } else {
                code += ` <div class="col-2 folder">
                        <img src="./imgs/file.png" width="100%"/>
                        <p class="h6 text-center">
                            <a href="${file.content}" download>
                                ${file.name}
                            </a>
                        </p>
                    </div>`
            }
        })
        return code;
    }
}


//BEGIN MOVIE AVL TREE
class student_node {
    constructor(_name, _carnet, _password, _root_file) {
        this.name = _name;
        this.carnet = _carnet;
        this.password = _password;
        this.root_file = _root_file;
        this.file_tree = new Tree();
        this.action_list = new Doubly_linked_list();
        this.left = null;
        this.right = null;
        this.height = 0;
    }
}

class student_avl_tree {
    constructor() {
        this.root = null;
    }

    insert(_name, _carnet, _password, _root_file) {
        let new_student = new student_node(_name, _carnet, _password, _root_file);

        if (this.root == null) {
            this.root = new_student;
            return;
        }
        //Calling the recursion function for insertion
        this.root = this.insert_node(this.root, new_student);
    }

    //Recursive function that inserts a node
    insert_node(actual_root, new_student) {

        //Base Case:
        if (actual_root == null) {
            actual_root = new_student;
            return actual_root;
        }
        //Traveling between childs:
        if (new_student.carnet < actual_root.carnet) {
            //Inserting the node recursively
            actual_root.left = this.insert_node(actual_root.left, new_student);
            if (this.height(actual_root.right) - this.height(actual_root.left) == -2) {
                //We are in a left situation, now we have to determinate if it is a simple or double rotation
                if (new_student.carnet < actual_root.left.carnet) {
                    //We have concluded that it is a simple rotation
                    actual_root = this.left_left_rotation(actual_root);
                } else {
                    //We have concluded that it is a double rotation
                    actual_root = this.left_right_rotation(actual_root);
                }
            }

        }

        if (new_student.carnet > actual_root.carnet) {
            //Inserting the node recursively
            actual_root.right = this.insert_node(actual_root.right, new_student);
            if (this.height(actual_root.right) - this.height(actual_root.left) == 2) {
                //We are in a right situation, now we have to determinate if it is a simple or double rotation
                if (new_student.carnet > actual_root.right.carnet) {
                    //We have concluded that it is a simple rotation
                    actual_root = this.right_right_rotation(actual_root);
                } else {
                    //We have concluded that it is a double rotation
                    actual_root = this.right_left_rotation(actual_root);
                }
            }
        }
        actual_root.height = this.max_height(this.height(actual_root.right), this.height(actual_root.left)) + 1;
        return actual_root;
    }

    //Getting the height of a simple node;
    //Cleaner looking code purposses
    height(node) {
        if (node == null) {
            return -1;
        }
        return node.height;
    }

    //Next we will make the comparison of the heights
    //Just for swapping purposses during rotations
    max_height(h1, h2) {
        if (h2 >= h1) {
            return h2;
        }
        return h1;
    }

    //Rotations:
    //Covering all the situations required to make an efficient rotation
    left_left_rotation(current_node) {
        let left_node = current_node.left;
        current_node.left = left_node.right;
        left_node.right = current_node;
        current_node.height = this.max_height(this.height(current_node.left), this.height(current_node.right)) + 1;
        left_node.height = this.max_height(current_node.height, this.height(current_node.left)) + 1;
        return left_node;

    }

    right_right_rotation(current_node) {
        let right_node = current_node.right;
        current_node.right = right_node.left;
        right_node.left = current_node;
        current_node.height = this.max_height(this.height(current_node.left), this.height(current_node.right)) + 1;
        right_node.height = this.max_height(current_node.height, this.height(current_node.right)) + 1;
        return right_node;
    }

    left_right_rotation(node) {
        node.left = this.right_right_rotation(node.left);
        let aux = this.left_left_rotation(node);
        return aux;
    }

    right_left_rotation(node) {
        node.right = this.left_left_rotation(node.right);;
        let aux = this.right_right_rotation(node);
        return aux;
    }

    pre_order(actual_root) {
        //Case base
        if (actual_root != null) {
            $('#pre_order_table tbody').append(
                `<tr>
                    <th>${actual_root.carnet}</th>
                    <th>${actual_root.name}</th>
                    <th>${actual_root.root_file}</th>
                </tr>`
            )
            this.pre_order(actual_root.left);
            this.pre_order(actual_root.right);
        }
    }

    in_order(actual_root) {
        //Case base
        if (actual_root != null) {
            this.in_order(actual_root.left);
            $('#in_order_table tbody').append(
                `<tr>
                    <th>${actual_root.carnet}</th>
                    <th>${actual_root.name}</th>
                    <th>${actual_root.root_file}</th>
                </tr>`
            )
            this.in_order(actual_root.right);
        }
    }

    reebot_tables() {
        $('#in_order_table tbody').html(
        );
        $('#pre_order_table tbody').html(
        );
        $('#post_order_table tbody').html(
        );


    }

    post_order(actual_root) {
        //Case base
        if (actual_root != null) {
            this.post_order(actual_root.left);
            this.post_order(actual_root.right);
            $('#post_order_table tbody').append(
                `<tr>
                    <th>${actual_root.carnet}</th>
                    <th>${actual_root.name}</th>
                    <th>${actual_root.root_file}</th>
                </tr>`
            )
        }
    }

    reverse_order(actual_root) {
        //Case base
        if (actual_root != null) {
            this.reverse_order(actual_root.right);
            console.log(actual_root.name);
            this.reverse_order(actual_root.left);
        }
    }

    find_student(_carnet) {
        if (this.root == null) {
            return "There is no element in movie tree"
        }

        let current_node = this.root;
        while (current_node != null) {
            if (current_node.carnet > _carnet) {
                current_node = current_node.left;
                continue;
            }
            if (current_node.carnet < _carnet) {
                current_node = current_node.right;
                continue;
            }

            return current_node;
        }
        return "NOT FOUND";
    }

    create_dot() {
        let text = "digraph AVL{label=\"Students\";\nnode [shape=box];\n";
        text += this.nodes_dot(this.root);
        text += this.linking_nodes_dot(this.root);
        text += "}";
        d3.select("#graph_image").graphviz()
            .renderDot(text)
        return text
    }

    //Creating nodes inorder way
    nodes_dot(actual_root) {
        let nodes = "\n";
        if (actual_root != null) {
            nodes += this.nodes_dot(actual_root.left);
            nodes += "n" + actual_root.carnet + "[label =\"Name: " + actual_root.name + " \n Carnet: " + actual_root.carnet + " \n Password: " + actual_root.password + " \n Root: " + actual_root.root_file + " \n Altura: " + actual_root.height + "\"]\n";
            nodes += this.nodes_dot(actual_root.right);
        }
        return nodes;
    }

    linking_nodes_dot(actual_root) {
        let link = "";
        if (actual_root != null) {
            link += this.linking_nodes_dot(actual_root.left)
            link += this.linking_nodes_dot(actual_root.right)
            if (actual_root.left != null) {
                link += "n" + actual_root.carnet + " -> n" + actual_root.left.carnet + "\n";
            }
            if (actual_root.right != null) {
                link += "n" + actual_root.carnet + " -> n" + actual_root.right.carnet + "\n";
            }
        }
        return link;

    }

}

class Action_node {
    constructor(action, date, hour) {
        this.action = action;
        this.date = date;
        this.hour = hour;
        this.prev = null;
        this.next = null;
    }
}

class Doubly_linked_list {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    insert(action, date, hour) {
        var new_action = new Action_node(action,date, hour);
        if (this.size == 0) {
            this.head = new_action;
            this.tail = new_action;
            this.size++;
            return;
        }
        this.tail.next = new_action;
        this.tail = new_action;
        this.head.prev = new_action;
        this.size++;
    }

    show(){
        var text = "digraph G {"
        text += "rankdir=\"LR\";"
        var action = this.head;
        var count = 0;
        for(var i = 0; i < this.size; i++){
            text += "\n n"+ count + "[shape=\"box\" label = \""+action.action+" \n Fecha: "+action.date+"  \n Hora: "+action.hour+" \"];";
            action = action.next;
            count++;
        }
        count = 0;
        for(var i = 0; i < this.size - 1; i++){
            text += "\nn"+ count + "-> n"+ (count + 1) + ";";
            count++;
        }
        text += "\nn"+0+"-> n"+ (this.size - 1 ) + ";";
        text += "\n}"

        return text;
    }
}
var student_tree = new student_avl_tree();
var current_student = new student_node();
//END MOVIE AVL TREE
function call_file_explorer() {
    document.getElementById("student_json").click();
    student_tree.pre_order();
}

//BEGIN: Json load for users
function load_user_interface() {
    var show_user_module = document.getElementById("show_student_info");
    var show_user_module1 = document.getElementById("show_student_info1");
    var load_json_module = document.getElementById("load_json_admin");
    var graph_div = document.getElementById('graph_image');

    load_json_module.style.display = "flex";
    show_user_module.style.display = "none";
    show_user_module1.style.display = "none";
    graph_div.style.display = "none";
}

function load_graph_interface() {
    var show_user_module = document.getElementById("show_student_info");
    var show_user_module1 = document.getElementById("show_student_info1");
    var load_json_module = document.getElementById("load_json_admin");
    var graph_div = document.getElementById('graph_image');

    load_json_module.style.display = "none";
    show_user_module.style.display = "none";
    show_user_module1.style.display = "none";
    graph_div.style.display = "block";
}

function show_user_interface() {
    var show_user_module = document.getElementById("show_student_info");
    var show_user_module1 = document.getElementById("show_student_info1");
    var load_json_module = document.getElementById("load_json_admin");
    var graph_div = document.getElementById('graph_image');

    load_json_module.style.display = "none";
    show_user_module.style.display = "flex";
    show_user_module1.style.display = "flex";
    graph_div.style.display = "none";
}
function pre_order_table() {
    var pre_table = document.getElementById("pre_order_table");
    var in_table = document.getElementById("in_order_table");
    var post_table = document.getElementById("post_order_table");

    pre_table.style.display = "block";
    in_table.style.display = "none";
    post_table.style.display = "none";
}
function in_order_table() {
    var pre_table = document.getElementById("pre_order_table");
    var in_table = document.getElementById("in_order_table");
    var post_table = document.getElementById("post_order_table");

    pre_table.style.display = "none";
    in_table.style.display = "block";
    post_table.style.display = "none";
}
function post_order_table() {
    var pre_table = document.getElementById("pre_order_table");
    var in_table = document.getElementById("in_order_table");
    var post_table = document.getElementById("post_order_table");

    pre_table.style.display = "none";
    in_table.style.display = "none";
    post_table.style.display = "block";
}
function load_user() {
    var file = document.getElementById("student_json").files[0];
    if (!file) {
        return;
    }
    let reader = new FileReader();
    reader.onload = function (e) {
        let content = e.target.result;

        const _data = JSON.parse(content);

        for (const i in _data) {
            for (j in _data[i]) {
                let data = _data[i][j];
                console.log(data.nombre, data.carnet, data.password, data.carpeta_raiz);
                student_tree.insert(data.nombre, data.carnet, data.password, data.carpeta_raiz);

            }
        }
        student_tree.pre_order(student_tree.root);
        student_tree.in_order(student_tree.root);
        student_tree.post_order(student_tree.root);
        console.log(student_tree.create_dot());
    };
    reader.readAsText(file);


}
//END: Json load for users


//Changes the password input to a text input and viceversa
function show_password() {
    password_check = document.getElementById('check_pass').checked;
    log_password = document.getElementById('pass_input');

    if (password_check) {
        log_password.setAttribute('type', 'text');
        return null;
    }
    log_password.setAttribute('type', 'password');
}

//Function to login
function log_in() {
    user = document.getElementById('user_input').value;
    password = document.getElementById('pass_input').value;
    //Checking if the user is an admin or not
    if (user == "admin" && password == "admin") {
        console.log("ADMIN");
        login_to_admin();
        return null;
    }
    object = student_tree.find_student(user);
    console.log(object);
    if (object != "NOT FOUND") {
        if (object.password == password) {
            current_student = object;
            login_to_user();
            return null;
        }
    }
    //In caseis incorrect we send an alert
    alert("Check the data");

}

//Admin module go
function login_to_admin() {
    var log = document.getElementById("part1");
    var admin_module = document.getElementById("part2");
    var user_module = document.getElementById("part3");
    admin_module.style.display = "block";
    user_module.style.display = "none";
    log.style.display = "none";
}

function admin_to_login() {
    var log = document.getElementById("part1");
    var admin_module = document.getElementById("part2");
    var user_module = document.getElementById("part3");
    var graph_tree = document.getElementById("part4");
    admin_module.style.display = "none";
    user_module.style.display = "none";
    log.style.display = "block";
    graph_tree.style.display = "none";
    
}

function login_to_user() {
    var log = document.getElementById("part1");
    var admin_module = document.getElementById("part2");
    var user_module = document.getElementById("part3");
    var graph_tree = document.getElementById("part4");
    var graph_div = document.getElementById('graph_image');
    admin_module.style.display = "none";
    user_module.style.display = "block";
    log.style.display = "none";
    graph_tree.style.display = "none";
    graph_div.style.display = "none";
    document.getElementById("h1_part3").innerHTML = "Bienvenido: " + current_student.carnet;
}

function user_to_login() {
    var log = document.getElementById("part1");
    var admin_module = document.getElementById("part2");
    var user_module = document.getElementById("part3");
    var graph_tree = document.getElementById("part4");
    admin_module.style.display = "none";
    user_module.style.display = "none";
    log.style.display = "block";
    graph_tree.style.display = "none";
}

function tree_graph_to_user() {
    var log = document.getElementById("part1");
    var admin_module = document.getElementById("part2");
    var user_module = document.getElementById("part3");
    var graph_tree = document.getElementById("part4");
    admin_module.style.display = "none";
    user_module.style.display = "block";
    log.style.display = "none";
    graph_tree.style.display = "none";
}

function user_to_tree_graph() {
    var log = document.getElementById("part1");
    var admin_module = document.getElementById("part2");
    var user_module = document.getElementById("part3");
    var graph_tree = document.getElementById("part4");
    admin_module.style.display = "none";
    user_module.style.display = "none";
    log.style.display = "none";
    graph_tree.style.display = "block";
    showTreeGraph();
}

function user_to_list() {
    var log = document.getElementById("part1");
    var admin_module = document.getElementById("part2");
    var user_module = document.getElementById("part3");
    var graph_tree = document.getElementById("part4");
    var graph_list = document.getElementById("part5");
    admin_module.style.display = "none";
    user_module.style.display = "none";
    log.style.display = "none";
    graph_tree.style.display = "none";
    graph_list.style.display = "block";
    showListGraph();
    console.log("HE ENTRADO")
}
function list_to_user() {
    var log = document.getElementById("part1");
    var admin_module = document.getElementById("part2");
    var user_module = document.getElementById("part3");
    var graph_tree = document.getElementById("part4");
    var graph_list = document.getElementById("part5");
    admin_module.style.display = "none";
    user_module.style.display = "block";
    log.style.display = "none";
    graph_tree.style.display = "none";
    graph_list.style.display = "none";
}

//Creating files
function create_file() {
    let folderName = document.getElementById('new_file').value;
    let path = document.getElementById("user_search").value;
    console.log(folderName, path);
    current_student.file_tree.insert(folderName, path);
    $("#file_manager").html(current_student.file_tree.getHTML(path));
    const date = new Date();
    const actual_date = date.toLocaleDateString();
    const actual_time = date.toLocaleTimeString();
    current_student.action_list.insert("Accion: Se creo carpeta: "+folderName, actual_date, actual_time);
    current_student.action_list.show();

}


function go_to_file(folderName) {
    let path = document.getElementById('user_search').value;
    let currentPath = path == '/' ? path + folderName : path + "/" + folderName;
    $('#user_search').val(currentPath);
    $('#file_manager').html(current_student.file_tree.getHTML(currentPath));
}

function go_to_initial() {
    document.getElementById('user_search').value = "/";
    $('#file_manager').html(current_student.file_tree.getHTML("/"))
}

function delete_folder() {
    current_student.file_tree.deleteFolder(document.getElementById("user_search").value);
    current_student.file_tree.getHTML("/");
    go_to_initial();
    current_student.action_list.insert("Accion: Se eliminio carpeta: "+document.getElementById("user_search").value, actual_date, actual_time);
    current_student.action_list.show();
}

function showTreeGraph() {
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = `digraph G { ${current_student.file_tree.graph()} }`
    $("#image_part4").attr("src", url + body);
}

function showListGraph(){
    let url = 'https://quickchart.io/graphviz?graph=' + current_student.action_list.show();
    $("#image_part5").attr("src", url); 
}