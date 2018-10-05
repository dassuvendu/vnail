import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";
import { ApiService } from '../api.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  constructor(private titleService: Title, private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    let item = JSON.parse(localStorage.getItem("employee"));
    console.log(item);
    this.titleService.setTitle("Employee Dashboard");

    if(item==null) {
      //this.isSalonLoggedin();
      this.router.navigate(['/employee']);
    } 
  }

}
