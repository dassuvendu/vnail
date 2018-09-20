import { Component, OnInit } from '@angular/core';
import { ApiService } from  '../api.service';
import { ActivatedRoute } from '@angular/router';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  public assign_id:any;
  public employee:  Array<object> = [];
  public resp:number;

  constructor(private  apiService:  ApiService, private router: ActivatedRoute, private titleService: Title) {}

  ngOnInit() {
    this.titleService.setTitle("Employee");

    this.assign_id = this.router.snapshot.paramMap.get('id');
    console.log(this.assign_id);

    this.getFreeEmployee();
  }

  public getFreeEmployee() {
    this.apiService.getFreeEmployee().subscribe((response) => {
      console.log(response.json());
      this.resp = response.json().response_code;
      this.employee = response.json().response_data;
    });
  }

  public assignEmp(emp_id) {
    const data = {
      assigned_emp: emp_id,
      id: this.assign_id
    };
    this.apiService.assignEmp(data).subscribe((response) => {
      console.log(response.json());
      this.resp = response.json().response_code;
      this.employee = response.json().response_data;
    });
  }

}
