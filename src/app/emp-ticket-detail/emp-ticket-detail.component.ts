import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-emp-ticket-detail',
  templateUrl: './emp-ticket-detail.component.html',
  styleUrls: ['./emp-ticket-detail.component.css']
})
export class EmpTicketDetailComponent implements OnInit {
  app_id:any;
  public tickets:object = [];
  public edit:boolean = false;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle("Employee Ticket Details");
    this.app_id = this.route.snapshot.paramMap.get('id');
    this.getEmpAppointmentDetails();
  }

  getEmpAppointmentDetails() {
    const data = {
      id: this.app_id
    }
    this.apiService.getEmpAppointmentDetails(data).subscribe((response) => {
      console.warn(response.json());
      //this.tickets = response.json().response_data;
      this.tickets = response.json();
    });
  }

}
