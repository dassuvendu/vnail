import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-cust-ticket-detail',
  templateUrl: './cust-ticket-detail.component.html',
  styleUrls: ['./cust-ticket-detail.component.css']
})
export class CustTicketDetailComponent implements OnInit {
  app_id:any;
  public tickets:object = [];
  public edit:boolean = false;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router, private titleService: Title) { }

  ngOnInit() {
    let item = JSON.parse(localStorage.getItem("salon"));
    if(item=="") {
      //this.isSalonLoggedin();
      this.router.navigate(['/salon']);
    }
    this.titleService.setTitle("Customer Ticket Detail");
    this.app_id = this.route.snapshot.paramMap.get('id');
    this.getCustAppointmentDetails();
  }

  public isSalonLoggedin() {
    this.apiService.isSalonLoggedin().subscribe((response) => {
      response.json();
      if(response.json().response_code != '200') {
        this.router.navigate(['/salon']);
      }
    });
  }

  getCustAppointmentDetails() {
    const data = {
      id: this.app_id
    }
    this.apiService.getCustAppointmentDetails(data).subscribe((response) => {
      console.warn(response.json());
      //this.tickets = response.json().response_data;
      this.tickets = response.json();
    });
  }

}
