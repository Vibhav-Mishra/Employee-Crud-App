import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms"
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'crudApp';
  Alldata:any[] = [];
  addForm=new FormGroup({
    name: new FormControl(""),
    email: new FormControl(""),
    designation: new FormControl(""),
    salary: new FormControl(""),
  })
  isEdit=false
  index= -1
  constructor() {
    this.getAllEmployee();
  }
  addEmployee() {
    console.log(this.addForm.value)
    if(!this.addForm.value.name  || !this.addForm.value.email  || !this.addForm.value.salary  || !this.addForm.value.designation ) {
      alert("Please fill all fields")
      return;
    }

    if(this.isEdit==false) {
    this.Alldata.push({...this.addForm.value});
    localStorage.setItem("crud", JSON.stringify(this.Alldata))
  }else {
      if(this.index !== -1) {
        this.Alldata[this.index] = this.addForm.value;
    localStorage.setItem("crud", JSON.stringify(this.Alldata))
        this.index = -1;
        this.isEdit = false
      }
  }
  this.addForm.reset()
  }
  
  getAllEmployee() {
    let getData = localStorage.getItem("crud");
    if(getData) {
      this.Alldata = JSON.parse(getData)
    }
  }
  
  deleteEmployee(index:number) {
    this.Alldata.splice(index, 1)
    localStorage.setItem("crud", JSON.stringify(this.Alldata))
  }

  editEmployee(user:any, indexOfElement:any){
    this.addForm.controls["name"].setValue(user.name)
    this.addForm.controls["email"].setValue(user.email)
    this.addForm.controls["designation"].setValue(user.designation)
    this.addForm.controls["salary"].setValue(user.salary)
    this.isEdit=true
    this.index=indexOfElement
  }
  deleteAllData() {
    this.Alldata = [];
    localStorage.removeItem("crud")
  }

  resetAll() {
    this.addForm.reset()
  }
  applyfilter(event:Event) {

    let val = (event.target as HTMLInputElement).value
    if(val === "") {
      this.getAllEmployee()
    }
    let filterData = this.Alldata.filter((el) => {
      return el.name.toLowerCase().includes(val)
    })
    this.Alldata = filterData;
  }
}
