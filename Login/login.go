package Login

import (
	"fmt"
	"strconv"
)

func Login() {
	var user string
	var pass string
	for {
		fmt.Println()
		fmt.Println("*************** SIGN UP ****************")
		fmt.Println("*   Si deseas salir ingresa:           *")
		fmt.Println("*   User: EXIT                         *")
		fmt.Println("*   Pass: EXIT                         *")
		fmt.Println("****************************************")
		fmt.Print("User: ")
		fmt.Scanln(&user)
		fmt.Print("Pass: ")
		fmt.Scanln(&pass)

		if user == "admin" && pass == "admin" {
			Menu()
		}
		if user == "EXIT" && pass == "EXIT" {
			return
		}
		num, err := strconv.Atoi(user)
		if err != nil {
			fmt.Println("INGRESASTE MAL LAS CREDENCIALES")
			continue
		}
		Student_list.Log(int(num), pass)
	}
}
