package Student

type Student struct {
	name      string
	last_name string
	password  string
	carnet    int
}

func (student *Student) Get_name() string {
	return student.name
}
func (student *Student) Get_last_name() string {
	return student.last_name
}
func (student *Student) Get_pass() string {
	return student.password
}
func (student *Student) Get_carnet() int {
	return student.carnet
}

func (student *Student) Set_name(new_name string) {
	student.name = new_name
}
func (student *Student) Set_last_name(new_last_name string) {
	student.last_name = new_last_name
}
func (student *Student) Set_pass(new_pass string) {
	student.password = new_pass
}
func (student *Student) Set_carnet(new_carnet int) {
	student.carnet = new_carnet
}
