import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-eployee-details',
  templateUrl: './eployee-details.component.html',
  styleUrls: ['./eployee-details.component.css']
})
export class EployeeDetailsComponent implements OnInit {
  emp_id:any;
  public employee:object = [];
  public tickets:object = [];
  public general_edit: boolean;
  public skillServices: boolean;
  public payroll_edit: boolean;
  public security_edit: boolean;
  public emp_tab:number = 1;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle("Employee Detail");

    this.emp_id = this.route.snapshot.paramMap.get('id');
    console.log(this.emp_id);
    this.emp_details();
    this.general_edit = false;
    this.skillServices = false;
    this.payroll_edit = false;
    this.security_edit=false;

    this.getEmpAppointments();
  }

  public emp_details() {
    const data = {
      id : this.emp_id
    }
    this.apiService.emp_details(data).subscribe((response) => {
      console.warn(response.json());
      this.employee = response.json().response_data;
    });
  }

  public getEmpAppointments() {
    const data = {
      id: this.emp_id
    }
    this.apiService.getEmpAppointments(data).subscribe((response) => {
      console.warn(response.json());
      //this.tickets = response.json().response_data;
      this.tickets = response.json();
    });
  }

}
