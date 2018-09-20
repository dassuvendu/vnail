import { Component, OnInit } from '@angular/core';
import { ApiService } from  '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-all-employee',
  templateUrl: './all-employee.component.html',
  styleUrls: ['./all-employee.component.css']
})
export class AllEmployeeComponent implements OnInit {
  public all_emp: Array<object> = [];
  public resp_code: number;
  constructor(private  apiService:  ApiService, private router: ActivatedRoute, private route: Router, private titleService: Title) { }

  ngOnInit() {
    let item = JSON.parse(localStorage.getItem("salon"));
    if(item=="") {
      //this.isSalonLoggedin();
      this.route.navigate(['/salon']);
    }
    this.titleService.setTitle("All Employee");
    this.allEmployee();
  }

  public isSalonLoggedin() {
    this.apiService.isSalonLoggedin().subscribe((response) => {
      response.json();
      if(response.json().response_code != '200') {
        this.route.navigate(['/salon']);
      }
    });
  }

  public allEmployee() {
    this.apiService.allEmployee().subscribe((response) => {
      console.log(response.json());
      this.resp_code = response.json().response_code;
      this.all_emp = response.json().response_data;
    });
  }

}
