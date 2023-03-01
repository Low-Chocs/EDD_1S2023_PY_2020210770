package Dot

import (
	"fmt"
	"os"
	"os/exec"
	"strings"
)

func GeneratePNG(fileName string, path string) {
	path2, _ := exec.LookPath("dot")
	cmd, err := exec.Command(path2, "dot", "-Tpng", fileName).Output()
	if err != nil {
		fmt.Print(err)
	}
	mode := int(0777)
	os.WriteFile(strings.Replace(fileName, ".dot", ".png", -1), cmd, os.FileMode(mode))
}
