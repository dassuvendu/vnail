import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from "@angular/platform-browser";
import * as $ from 'jquery';

@Component({
  selector: 'app-employee-ticket',
  templateUrl: './employee-ticket.component.html',
  styleUrls: ['./employee-ticket.component.css']
})
export class EmployeeTicketComponent implements OnInit {
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
    this.titleService.setTitle("Employee Tickets");

    let item = JSON.parse(localStorage.getItem("employee"));
    if(item==null) {
      //this.isSalonLoggedin();
      this.router.navigate(['/employee']);
    }
    this.emp_id = item.id;

    this.getEmpAppointments();
  }

  public getEmpAppointments() {
    const data = {
      id: this.emp_id
    }
    this.apiService.getEmpAppAppointments(data).subscribe((response) => {
      console.warn(response.json());
      //this.tickets = response.json().response_data;
      this.tickets = response.json();
    });
  }
}
