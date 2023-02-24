package Login

import (
	"fmt"
	"parte/archivo/Doubly_linked_list"
	"parte/archivo/Queque"
	"parte/archivo/Student"
)

var Waiting_queuqe Queque.Queque
var Student_list Doubly_linked_list.Doubly_list

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
			pending_students()
		case 2:
			Student_list.Show()
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
	Waiting_queuqe.Insert(new_student)
	fmt.Println("Se ha agregado el estudiante a la cola")
	fmt.Println()

}

func pending_students() {
	var option int8
	for {
		fmt.Println()
		fmt.Println("******* ESTUDIANTES PENDIENTES:", Waiting_queuqe.Get_quantity(), "*******")
		fmt.Println("*                                      *")
		if Waiting_queuqe.Get_quantity() > 0 {
			fmt.Println("ESTUDIANTE:", Waiting_queuqe.Get_first().Get_name(), "", Waiting_queuqe.Get_first().Get_last_name(), "", Waiting_queuqe.Get_first().Get_carnet())
		}
		fmt.Println("*                                      *")
		fmt.Println("*   1. Aceptar estudiante              *")
		fmt.Println("*   2. Rechazar estudiante             *")
		fmt.Println("*   3. Volver al menú                  *")
		fmt.Println("*ESTUDIANTES CON MISMO CARNET NO SON AGREGADOS*")
		fmt.Println("****************************************")
		fmt.Print("Escribe un valor: ")
		fmt.Scanln(&option)

		switch option {
		case 1:
			Waiting_queuqe.Pop()
			if Waiting_queuqe.Get_quantity() > 0 {
				Student_list.Insert(Waiting_queuqe.Get_first())
			}

		case 2:
			Waiting_queuqe.Pop()
			if Waiting_queuqe.Get_quantity() > 0 {
				fmt.Println("SE RECHAZO AL ESTUDIANTE")
			}
		case 3:
			fmt.Println("*   ¡REGRESANDO!              *")
			return
		default:
			fmt.Println("*   Opción no valida          *")

		}
	}
}
