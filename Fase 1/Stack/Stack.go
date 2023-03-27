package Stack

import (
	"fmt"
	"os"
	"parte/archivo/Dot"
	"strconv"
)

type Action struct {
	Action            string
	Student_name      string
	Student_last_name string
	Student_carnet    int
	Date              string
	Time              string
	next              *Action
}

type Stack struct {
	head *Action
	size int
}

func (stack *Stack) Get_head() *Action {
	return stack.head
}

func (stack *Stack) Get_size() int {
	return stack.size
}
func (stack *Stack) Get_element(value int) *Action {
	actual := stack.head
	for i := 0; i < stack.size; i++ {
		if value == i {
			return stack.head
		}

		actual = actual.next
	}
	return stack.head
}

func (stack *Stack) Push(new_Action Action) {
	fmt.Println("X2")
	if stack.size == 0 {
		stack.head = &new_Action
		stack.size++
		return
	}
	new_Action.next = stack.head
	stack.head = &new_Action
	stack.size++
}

func (stack *Stack) Pop() {
	if stack.size == 0 {
		stack.head = nil
		stack.size--
		return
	}
	stack.head = stack.head.next
	stack.size--
}

func (stack *Stack) Show() {
	actual := stack.head
	for i := 0; i < stack.size; i++ {
		fmt.Println(actual)
		actual = actual.next
	}
}

func (stack *Stack) Graph() {
	graph := "digraph G {\nPILA[style=invis, fillcolor=transparent, color=transparent];\nnode [shape=box];\n"
	actual := stack.head
	for i := 0; i < stack.size; i++ {
		graph += "U" + strconv.Itoa(i)
		graph += "["
		graph += "label = \""
		graph += actual.Action
		graph += "\n"
		graph += actual.Student_name
		graph += "\n"
		graph += actual.Student_last_name
		graph += "\n"
		graph += actual.Date
		graph += "\n"
		graph += actual.Time
		graph += "\n"
		graph += "\""
		graph += "];"
		actual = actual.next
	}
	actual2 := stack.head
	for i := 0; i < stack.size-1; i++ {
		graph += "U" + strconv.Itoa(i) + " -> " + "U" + strconv.Itoa(i+1) + ";"
		graph += "\n"
		actual2 = actual2.next
	}

	graph += "}"
	// Abre un archivo en modo de escritura
	archivo, err := os.Create("admin_stack.dot")
	if err != nil {
		panic(err)
	}
	defer archivo.Close()
	archivo.WriteString(string(graph))
	Dot.GeneratePNG("admin_stack.dot", "Archivo")
	fmt.Print(graph)
}
