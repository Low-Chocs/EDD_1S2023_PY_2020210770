package Queque

import (
	"fmt"
	"parte/archivo/Student"
)

type node struct {
	student Student.Student
	next    *node
}

func (nod *node) Set_student(new_student Student.Student) {
	nod.student = new_student
}

func (nod *node) Get_student() Student.Student {
	return nod.student
}

func (nod *node) Get_next() *node {
	return nod.next
}

func (nod *node) Set_next(new_node *node) {
	nod.next = new_node
}

type Queque struct {
	first    *node
	last     *node
	quantity int
}

func (queque *Queque) Insert(new_student Student.Student) {
	var new_node node
	new_node.Set_student(new_student)
	if queque.first == nil {
		queque.first = &new_node
		queque.last = &new_node
		queque.quantity++
		return
	}
	queque.last.Set_next(&new_node)
	queque.last = &new_node
	queque.quantity++
}

func (queque Queque) Show() {
	if queque.quantity == 0 {
		fmt.Println("Nothing to show")
		return
	}

	aux := queque.first
	for i := 0; i < queque.quantity; i++ {
		fmt.Println(aux)
		aux = aux.next
	}
}

func (queque *Queque) Pop() {
	if queque.quantity == 0 {
		fmt.Println("Nothing to do")
		return
	}
	if queque.first.next == nil {
		queque.first = nil
		queque.last = nil
		queque.quantity--
		return
	}
	queque.first = queque.first.next
	queque.quantity--
}

func (queque *Queque) Get_quantity() int {
	return queque.quantity
}

func (queque *Queque) Get_first() Student.Student {
	return queque.first.student
}
