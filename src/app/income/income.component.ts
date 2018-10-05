import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent implements OnInit {
  public allEmp;
  public allApp;
  public date:string = "";
  public time:string = "";
  public emp_id:string = "";
  public resp_code=200;
  public resp_msg;
  dropdownSettings = {};

  constructor( private router:Router, private apiService:ApiService, private title:Title) { }

  ngOnInit() {
    let item = JSON.parse(localStorage.getItem("salon"));

    if(item==null) {
      //this.isSalonLoggedin();
      this.router.navigate(['/salon']);
    } 
    this.title.setTitle("Income");

    this.allEmployee();

    this.allAppointment();

    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  allEmployee() {
    this.apiService.allEmployee().subscribe((resp) => {
      if(resp.json().response_code==100) {
        localStorage.removeItem("salon");
        this.router.navigate(['/salon']);
      }
      if(resp.json().response_code==200) {
        this.allEmp = resp.json().response_data;
      }
    });
  }

  allAppointment() {
    let obj = {
      date: this.date,
      time: this.time,
      emp_id: this.emp_id
    };
    this.apiService.getAllIncome(obj).subscribe((resp) => {
      if(resp.json().response_code==100) {
        localStorage.removeItem("salon");
        this.router.navigate(['/salon']);
      }
      
      this.allApp = resp.json().response_data;
      this.resp_code = resp.json().response_code;
      this.resp_msg = resp.json().response_msg;
      
    });
  }

  onEmpSelect(data) {
    this.emp_id = data.id;
    this.allAppointment();
  }

  dateChange(data) {
    this.date = data.target.value;
    this.allAppointment();
  }

  timeChange(data) {
    this.time = data.target.value;
    this.allAppointment();
  }

  onEmpDeSelect() {
    this.emp_id = "";
    this.allAppointment();
  }
}
