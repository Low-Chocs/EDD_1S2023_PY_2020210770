package Doubly_linked_list

import (
	"fmt"
	"parte/archivo/Student"
)

type node struct {
	student  Student.Student
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

	if list.is_not_repeated(&new_node) {
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

	}

	fmt.Println("SE AGREGO EXITOSAMENTE AL ESTUDIANTE")

}

func (list *Doubly_list) Show() {
	actual := list.head
	for i := 0; i < list.size; i++ {
		fmt.Println(actual)
		actual = actual.next
	}
}
