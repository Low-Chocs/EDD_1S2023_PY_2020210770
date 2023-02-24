package Stack

import "fmt"

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
