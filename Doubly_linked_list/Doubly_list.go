package Doubly_linked_list

import (
	"encoding/json"
	"fmt"
	"os"
	"parte/archivo/Dot"
	"parte/archivo/Stack"
	"parte/archivo/Student"
	"strconv"
	"time"
)

type node struct {
	student  Student.Student
	binnacle Stack.Stack
	next     *node
	previous *node
}

func (nod *node) Set_student(new_student Student.Student) {
	nod.student = new_student
}

func (nod *node) Set_next(new_node *node) {
	nod.next = new_node
}

func (nod *node) Set_previous(new_node *node) {
	nod.previous = new_node
}

func (nod *node) Get_student() Student.Student {
	return nod.student
}

func (nod *node) Get_binnacle() Stack.Stack {
	return nod.binnacle
}

func (nod *node) Get_next() *node {
	return nod.next
}

func (nod *node) Get_previous() *node {
	return nod.previous
}

type Doubly_list struct {
	head *node
	foot *node
	size int
}

func (list *Doubly_list) is_not_repeated(new_student *node) bool {
	actual := list.head
	for i := 0; i < list.size; i++ {
		if actual.student.Get_carnet() == new_student.student.Get_carnet() {
			fmt.Println("SE HA REPETIDO EL CARNET, NO SE AGREGO")
			return false
		}
		actual = actual.next
	}
	return true
}

func (list *Doubly_list) Insert(new_student Student.Student) {
	var new_node node
	new_node.Set_student(new_student)
	if list.size == 0 {
		list.head = &new_node
		list.foot = &new_node
		list.size++
		return
	}

	if !list.is_not_repeated(&new_node) {
		fmt.Println("ESTUDIANTE REPETIDO")
		return
	}

	if new_node.student.Get_carnet() < list.head.student.Get_carnet() {
		new_node.next = list.head
		list.head.previous = &new_node
		list.head = &new_node
		list.size++
		return
	}
	if new_node.student.Get_carnet() > list.foot.student.Get_carnet() {
		new_node.previous = list.foot
		list.foot.next = &new_node
		list.foot = &new_node
		list.size++
		return
	}
	actual := list.head
	for i := 0; i < list.size; i++ {
		if actual.student.Get_carnet() > new_node.student.Get_carnet() {
			new_node.next = actual
			new_node.previous = actual.previous
			actual.previous.next = &new_node
			actual.previous = &new_node
			list.size++
			return
		}
		actual = actual.next
	}

	fmt.Println("SE AGREGO EXITOSAMENTE AL ESTUDIANTE")

}
func (list *Doubly_list) Insert2(new_student Student.Student) {
	var new_node node
	new_node.Set_student(new_student)
	if list.size == 0 {
		list.head = &new_node
		list.foot = &new_node
		list.size++
		return
	}

	if !list.is_not_repeated(&new_node) {
		fmt.Println("ESTUDIANTE REPETIDO")
		return
	}

	if new_node.student.Get_carnet() < list.head.student.Get_carnet() {
		new_node.next = list.head
		list.head.previous = &new_node
		list.head = &new_node
		list.size++
		return
	}
	if new_node.student.Get_carnet() > list.foot.student.Get_carnet() {
		new_node.previous = list.foot
		list.foot.next = &new_node
		list.foot = &new_node
		list.size++
		return
	}
	actual := list.head
	for i := 0; i < list.size; i++ {
		if actual.student.Get_carnet() > new_node.student.Get_carnet() {
			new_node.next = actual
			new_node.previous = actual.previous
			actual.previous.next = &new_node
			actual.previous = &new_node
			list.size++
			return
		}
		actual = actual.next
	}

	fmt.Println("SE AGREGO EXITOSAMENTE AL ESTUDIANTE")

}

func (list *Doubly_list) Show() {

	if list.size == 0 {
		fmt.Println("******************* NO HAY ESTUDIANTES PARA MOSTRAR *************************")
		return
	}

	fmt.Println("******************* LISTADO DE ESTUDIANTES *************************")
	actual := list.head
	for i := 0; i < list.size; i++ {
		fmt.Println("Nombre:", actual.student.Get_name(), actual.student.Get_last_name(), "Carnet:", actual.student.Get_carnet())
		fmt.Println(actual.Get_binnacle())
		fmt.Println("****************************************************************")
		actual = actual.next
	}
}

func (list *Doubly_list) Log(student_carnet int, student_pass string) bool {
	actual := list.head
	for i := 0; i < list.size; i++ {
		if actual.student.Get_carnet() == student_carnet && actual.student.Get_pass() == student_pass {
			fmt.Println("SE INICIO CORRECTAMENTE")
			actual.binnacle.Push(list.add_log())
			return true
		}

		actual = actual.next
	}
	fmt.Println("Revisa tus credenciales")
	return false
}

func (list *Doubly_list) add_log() Stack.Action {
	var new_log Stack.Action
	new_log.Date = time.Now().Format("02-01-2006")
	new_log.Time = time.Now().Format("15:04:05")
	new_log.Action = "SE INICIO SESIÓN"
	return new_log
}

func (list *Doubly_list) Create_json() {
	actual := list.head
	var people []JsonLoad
	for i := 0; i < list.size; i++ {
		var prueba JsonLoad = JsonLoad{
			Name:         actual.student.Get_name() + " " + actual.student.Get_last_name(),
			Carnet:       actual.student.Get_carnet(),
			Pass:         actual.student.Get_pass(),
			Carpeta_Raiz: "/",
		}
		people = append(people, prueba)
		actual = actual.next
	}

	jsonStr, err := json.MarshalIndent(people, "", "	")
	if err != nil {
		fmt.Println("Error:", err)
		return
	}
	fmt.Println(string(jsonStr))

	// Abre un archivo en modo de escritura
	archivo, err := os.Create("datos.json")
	if err != nil {
		panic(err)
	}
	defer archivo.Close()
	archivo.WriteString(string(jsonStr))

}

func (list *Doubly_list) Graph() {
	graph := "digraph G {\nPILA[style=invis, fillcolor=transparent, color=transparent];\nnode [shape=box];\n"
	actual := list.head
	for i := 0; i < list.size; i++ {
		graph += "U" + strconv.Itoa(i)
		graph += "["
		graph += "label = \""
		graph += "Nombre: " + actual.student.Get_name() + " " + actual.student.Get_last_name()
		graph += "\n"
		graph += "Carnet: " + strconv.Itoa(actual.student.Get_carnet())
		graph += "\n"
		graph += "Pass: " + actual.student.Get_pass()
		graph += "\""
		graph += "];"
		actual = actual.next
	}
	actual2 := list.head
	for i := 0; i < list.size-1; i++ {
		graph += "U" + strconv.Itoa(i) + " -> " + "U" + strconv.Itoa(i+1) + " [dir=both, color=black ] " + ";"
		graph += "\n"
		actual2 = actual2.next
	}
	actual3 := list.head
	graph += "{rank = same;"
	for i := 0; i < list.size; i++ {
		graph += "U" + strconv.Itoa(i)
		graph += " "
		actual3 = actual3.next
	}
	graph += "};\n"
	graph += "nodesep=0.5; \n ranksep= 0.5;\n"
	actual4 := list.head
	for i := 0; i < list.size; i++ {
		fmt.Println("HE ENTRADOOO")
		for j := 0; j < actual4.binnacle.Get_size(); j++ {
			graph += "U" + strconv.Itoa(i) + strconv.Itoa(j) + strconv.Itoa(0)
			graph += "["
			graph += "label = \" Se inicio sesión \n" + actual4.binnacle.Get_element(j).Date + " " + actual4.binnacle.Get_element(j).Time
			graph += "\""
			graph += "];"
			graph += "\n"
		}
		if actual4.binnacle.Get_size() == 1 {
			graph += "U" + strconv.Itoa(i) + " -> " + "U" + strconv.Itoa(i) + strconv.Itoa(0) + strconv.Itoa(0)
			graph += "\n"
		} else if actual4.binnacle.Get_size() > 1 {
			graph += "U" + strconv.Itoa(i) + " -> " + "U" + strconv.Itoa(i) + strconv.Itoa(0) + strconv.Itoa(0)
			graph += "\n"
			for k := 0; k < actual4.binnacle.Get_size()-1; k++ {
				graph += "U" + strconv.Itoa(i) + strconv.Itoa(k) + strconv.Itoa(0) + " -> " + "U" + strconv.Itoa(i) + strconv.Itoa(k+1) + strconv.Itoa(0)
				graph += "\n"
			}
		}
		actual4 = actual4.next
	}

	graph += "}"
	fmt.Print(graph)
	// Abre un archivo en modo de escritura
	archivo, err := os.Create("student.dot")
	if err != nil {
		panic(err)
	}
	defer archivo.Close()
	archivo.WriteString(string(graph))
	Dot.GeneratePNG("student.dot", "Archivo")
}

type JsonLoad struct {
	Name         string
	Carnet       int
	Pass         string
	Carpeta_Raiz string
}
