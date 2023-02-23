package Login

import (
	"fmt"
	"parte/archivo/Queque"
	"parte/archivo/Student"
)

var Waiting_queuqe Queque.Queque

func Menu() {
	var option int8
	for {
		fmt.Println()
		fmt.Println("********** MENU ADMINISTRADOR **********")
		fmt.Println("*   1. Ver Estudiantes Pendientes      *")
		fmt.Println("*   2. Ver Estudiantes en el Sistema   *")
		fmt.Println("*   3. Registrar Nuevo Estudiantes     *")
		fmt.Println("*   4. Carga Masiva de Estudiantes     *")
		fmt.Println("*   5. Salir                           *")
		fmt.Println("****************************************")
		fmt.Print("Escribe un valor: ")
		fmt.Scanln(&option)
		switch option {
		case 1:
			fmt.Println("*   Estoy en la opcion 1      * ")
		case 2:
			fmt.Println("*   Estoy en la opcion 2      *")
		case 3:
			fmt.Println("*   Estoy en la opcion 3      *")
			new_student()
		case 4:
			fmt.Println("*   Estoy en la opcion 4      *")
			Waiting_queuqe.Pop()
			Waiting_queuqe.Show()
		case 5:
			fmt.Println("*   ¡REGRESANDO!              *")
			return
		default:
			fmt.Println("*   Opción no valida          *")

		}
	}
}

func new_student() {
	//BEGIN: ASSIGMENT OF STUDENT VARIABLES
	var student_name string
	var student_last_name string
	var student_pass string
	var student_carnet int
	fmt.Println()
	fmt.Println("********* Registro de estudiantes *********")
	fmt.Print("Student name: ")
	fmt.Scanln(&student_name)
	fmt.Print("Student last_name: ")
	fmt.Scanln(&student_last_name)
	fmt.Print("Student carnet: ")
	fmt.Scanln(&student_carnet)
	fmt.Print("Student pass: ")
	fmt.Scanln(&student_pass)
	//END: ASSIGMENT OF STUDENT VARIABLES

	var new_student Student.Student
	new_student.Set_name(student_name)
	new_student.Set_last_name(student_last_name)
	new_student.Set_pass(student_pass)
	new_student.Set_carnet(student_carnet)
	fmt.Println(new_student)
	Waiting_queuqe.Insert(new_student)
	Waiting_queuqe.Show()
}
