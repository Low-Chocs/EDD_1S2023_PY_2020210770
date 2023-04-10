//BEGIN MOVIE AVL TREE
class student_node {
    constructor(_name, _carnet, _password, _root_file) {
        this.name = _name;
        this.carnet = _carnet;
        this.password = _password;
        this.root_file = _root_file;
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
    constructor(action, name, date, hour) {
      this.action = action;
      this.name = name;
      this.date = date;
      this.hour = hour;
      this.prev = null;
      this.next = null;
    }
}

class Doubly_linked_list{
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    insert(action, name, date, hour){
        new_action = new Action_node(action, name, date, hour);
        if(this.length == 0){
            this.head = new_action;
            this.tail = new_action;
        }
    }
}
var student_tree = new student_avl_tree();
student_tree.insert("John", 1, 1, "/");
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
    if(object != "NOT FOUND"){
        if(object.password == password){
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

    admin_module.style.display = "none";
    user_module.style.display = "none";
    log.style.display = "block";
}

function login_to_user(){
    var log = document.getElementById("part1");
    var admin_module = document.getElementById("part2");
    var user_module = document.getElementById("part3");

    admin_module.style.display = "none";
    user_module.style.display = "block";
    log.style.display = "none";
}

function user_to_login(){
    var log = document.getElementById("part1");
    var admin_module = document.getElementById("part2");
    var user_module = document.getElementById("part3");

    admin_module.style.display = "none";
    user_module.style.display = "none";
    log.style.display = "block";
}

