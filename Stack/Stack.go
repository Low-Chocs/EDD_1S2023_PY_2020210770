package Stack

import (
	"fmt"
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

func (stack *Stack) Push(new_Action Action) {
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
	fmt.Print(graph)
}
