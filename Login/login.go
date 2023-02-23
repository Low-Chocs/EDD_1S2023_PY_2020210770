package Login

import "fmt"

func Menu() {
	var option int8
	for {
		fmt.Println("************ MENU PRINCIPAL ************")
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
			fmt.Println("*   Estoy en la opcion 1      *")
		case 2:
			fmt.Println("*   Estoy en la opcion 2      *")
		case 3:
			fmt.Println("*   Estoy en la opcion 3      *")
		case 4:
			fmt.Println("*   Estoy en la opcion 4      *")
		case 5:
			fmt.Println("*   ¡Feliz día!      *")
			return
		default:
			fmt.Println("*   Opción no valida          *")

		}
	}

}
