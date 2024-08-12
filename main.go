package main

import (
	"html/template"
	"net/http"
)

var tlp = template.Must(template.ParseFiles("index.html"))

func indexHandler(w http.ResponseWriter, r *http.Request) {
	tlp.Execute(w, nil)
}

func main()  {
	port := "3000"

	fs := http.FileServer(http.Dir("assets"))


	mux := http.NewServeMux()
	mux.Handle("/assets/", http.StripPrefix("/assets", fs))
	mux.HandleFunc("/", indexHandler)
	
	http.ListenAndServe(":"+port, mux)
}