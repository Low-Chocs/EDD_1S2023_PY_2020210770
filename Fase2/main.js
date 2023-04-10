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
        if (new_student.name < actual_root.name) {
            //Inserting the node recursively
            actual_root.left = this.insert_node(actual_root.left, new_student);
            if (this.height(actual_root.right) - this.height(actual_root.left) == -2) {
                //We are in a left situation, now we have to determinate if it is a simple or double rotation
                if (new_student.name < actual_root.left.name) {
                    //We have concluded that it is a simple rotation
                    actual_root = this.left_left_rotation(actual_root);
                } else {
                    //We have concluded that it is a double rotation
                    actual_root = this.left_right_rotation(actual_root);
                }
            }

        }

        if (new_student.name > actual_root.name) {
            //Inserting the node recursively
            actual_root.right = this.insert_node(actual_root.right, new_student);
            if (this.height(actual_root.right) - this.height(actual_root.left) == 2) {
                //We are in a right situation, now we have to determinate if it is a simple or double rotation
                if (new_student.name > actual_root.right.name) {
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
            console.log(actual_root.name);
            this.pre_order(actual_root.left);
            this.pre_order(actual_root.right);
        }
    }

    in_order(actual_root) {
        //Case base
        if (actual_root != null) {
            this.in_order(actual_root.left);
            console.log(actual_root.name);
            this.in_order(actual_root.right);
        }
    }

    post_order(actual_root) {
        //Case base
        if (actual_root != null) {
            this.post_order(actual_root.left);
            this.post_order(actual_root.right);
            console.log(actual_root.name);
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

    find_movie(_name) {
        if (this.root == null) {
            return "There is no element in movie tree"
        }

        let current_node = this.root;
        while (current_node != null) {
            if (current_node.name > _name) {
                current_node = current_node.left;
                continue;
            }
            if (current_node.name < _name) {
                current_node = current_node.right;
                continue;
            }

            return current_node;
        }
        return "NOT FOUND";
    }

    create_dot() {
        let text = "digraph AVL{label=\"Clients\";\nnode [shape=box];\n";
        text += this.nodes_dot(this.root);
        text += "\n";
        text += this.linking_nodes_dot(this.root);
        text += "\n}";
        console.log(text)
    }
    //Creating nodes inorder way
    nodes_dot(actual_root) {
        let nodes = "\n";
        if (actual_root != null) {
            nodes += this.nodes_dot(actual_root.left);
            nodes += "n" + actual_root.name + "[label =\"Name: " + actual_root.name + " \n Carnet: " + actual_root.carnet + " \n Password: " + actual_root.password + " \n Root: " + actual_root.root_file + " \n Altura: " + actual_root.height + "\"]\n";
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
                link += "n" + actual_root.name + "-> n" + actual_root.left.name + "\n";
            }
            if (actual_root.right != null) {
                link += "n" + actual_root.name + "-> n" + actual_root.right.name + "\n";
            }
        }
        return link;

    }
}
//END MOVIE AVL TREE
function call_file_explorer(){
    document.getElementById("student_json").click();
    load_user();
}

//BEGIN: Json load for users
function load_user() {
    var file = document.getElementByIds("student_json").files[0];
    if (!file) {
        return;
    }
    let reader = new FileReader();
    reader.onload = function (e) {
        let content = e.target.result;

        const _data = JSON.parse(content);

        for (const i in _data) {
            let data = _data[i];
            //Checking if the username is in use
            if (!false) {
                continue;
            }
        }
        
    };
    reader.readAsText(file);
}
//END: Json load for users


//Changes the password input to a text input and viceversa
function show_password() {
    password_check = document.getElementByname('check_pass').checked;
    log_password = document.getElementByname('pass_input');

    if (password_check) {
        log_password.setAttribute('type', 'text');
        return null;
    }

    log_password.setAttribute('type', 'password');
}

//Function to login
function log_in(){
    user = document.getElementById('user_input').value;
    password = document.getElementById('pass_input').value;
    //Checking if the user is an admin or not
    if (user == "admin" && password == "admin"){
        console.log("ADMIN");
        login_to_admin();
        return null;
    }
    //In caseis incorrect we send an alert
    alert("Check the data");

}

//Admin module go
function login_to_admin() {
    var log = document.getElementById("part1");
    var admin_module = document.getElementById("part2");

    admin_module.style.display = "block";
    log.style.display = "none";
}

function admin_to_login() {
    var log = document.getElementById("part1");
    var admin_module = document.getElementById("part2");

    admin_module.style.display = "none";
    log.style.display = "block";
}