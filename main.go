package main

import (
	"embed"
	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	// if !amAdmin() {
	// 	runMeElevated()
	// }
	// Create an instance of the app structure
	app := NewApp()
	// Create application with options
	err := wails.Run(&options.App{
		Title:  "prestamos",
		Width:  1024,
		Height: 734,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		Bind: []interface{}{
			app,
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}

// func runMeElevated() {
// 	verb := "runas"
// 	exe, _ := os.Executable()
// 	cwd, _ := os.Getwd()
// 	args := strings.Join(os.Args[1:], " ")

// 	verbPtr, _ := syscall.UTF16PtrFromString(verb)
// 	exePtr, _ := syscall.UTF16PtrFromString(exe)
// 	cwdPtr, _ := syscall.UTF16PtrFromString(cwd)
// 	argPtr, _ := syscall.UTF16PtrFromString(args)

// 	var showCmd int32 = 1 //SW_NORMAL

// 	err := windows.ShellExecute(0, verbPtr, exePtr, argPtr, cwdPtr, showCmd)
// 	if err != nil {
// 		fmt.Println(err)
// 	}
// }

// func amAdmin() bool {
// 	_, err := os.Open("\\\\.\\PHYSICALDRIVE0")
// 	if err != nil {
// 		fmt.Println("admin no")
// 		return false
// 	}
// 	fmt.Println("admin yes")
// 	return true
// }
