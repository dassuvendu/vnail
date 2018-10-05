import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.css']
})
export class TicketDetailsComponent implements OnInit {
  app_id:any;
  public tickets:object = [];
  public edit:boolean = false;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router, private titleService: Title) { }

  ngOnInit() {
    let item = JSON.parse(localStorage.getItem("employee"));
    if(item==null) {
      //this.isSalonLoggedin();
      this.router.navigate(['/emp-dashboard']);
    }

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
