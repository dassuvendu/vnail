import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from "@angular/platform-browser";
import * as $ from 'jquery';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.css']
})
export class EmployeeProfileComponent implements OnInit {
  emp_id:any;
  public employee:object = [];
  public tickets:object = [];
  public general_edit: boolean;
  public skillServices: boolean;
  public payroll_edit: boolean;
  public security_edit: boolean;
  public emp_tab:number = 1;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router, private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle("Employee Profile");

    let item = JSON.parse(localStorage.getItem("employee"));
    if(item==null) {
      //this.isSalonLoggedin();
      this.router.navigate(['/employee']);
    }
    this.emp_id = item.id;

    this.emp_details();
    this.general_edit = false;
    this.skillServices = false;
    this.payroll_edit = false;
    this.security_edit=false;
  }

  public emp_details() {
    const data = {
      id : this.emp_id
    }
    this.apiService.empAppDetails(data).subscribe((response) => {
      console.warn(response.json());
      this.employee = response.json().response_data;
    });
  }

  empGeneralEdit(formData){
    console.log(formData);
    this.apiService.empAppGeneralEdit(formData).subscribe((resp) => {
      console.warn(resp.json());
      if(resp.json().response_code==200) {
        this.general_edit = false;
      }
    });
  }

  empServiceEdit(formData){
    console.log(formData);
    this.apiService.empAppServiceEdit(formData).subscribe((resp) => {
      console.warn(resp.json());
    });
  }

  empSecurityEdit(formData){
    console.log(formData);
    this.apiService.empAppSecurityEdit(formData).subscribe((resp) => {
      console.warn(resp.json());
    });
  }
}
