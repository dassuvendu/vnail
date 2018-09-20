import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  public resp_code: number;
  public resp_msg: string = "";
  public resp_type: string = "";
  public tutle: string = "";

  constructor(private  apiService:  ApiService, private router: Router, private titleService: Title) { }

  ngOnInit() {
    let item = JSON.parse(localStorage.getItem("salon"));
    if(item=="") {
      //this.isSalonLoggedin();
      this.router.navigate(['/salon']);
    }
    this.titleService.setTitle("Add Employee");
  }

  public isSalonLoggedin() {
    this.apiService.isSalonLoggedin().subscribe((response) => {
      response.json();
      if(response.json().response_code != '200') {
        this.router.navigate(['/salon']);
      }
    });
  }

  public addEmployee(formData){
    console.warn(formData);
    this.apiService.addEmployee(formData).subscribe((response) => {
      this.resp_code = response.json().response_code;
      this.resp_msg = response.json().response_msg;
      if(this.resp_code == 200) {
        this.resp_type = "success";
        setTimeout(() => {
          this.router.navigate(['/all-employee']);
        }, 2000);
      } else {
        this.resp_type = "warning";
      }
    });
  }
}
