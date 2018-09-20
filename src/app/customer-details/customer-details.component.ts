import { Component, OnInit } from '@angular/core';
import { ApiService } from  '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {
  public cust_id:any;
  public detail: Array<object> = [];
  public tickets: Array<object> = [];
  public resp_code: number;
  public cust_tab: number = 1;
  public edit_cust: number = 0;
  constructor(private  apiService:  ApiService, private router: ActivatedRoute, private route: Router, private titleService: Title) { }

  ngOnInit() {
    let item = JSON.parse(localStorage.getItem("salon"));
    if(item=="") {
      //this.isSalonLoggedin();
      this.route.navigate(['/salon']);
    }

    this.titleService.setTitle("Customer Detail");
    this.cust_id = this.router.snapshot.paramMap.get('id');

    this.cust_details();
    this.getCustAppointments();
  }

  public isSalonLoggedin() {
    this.apiService.isSalonLoggedin().subscribe((response) => {
      response.json();
      if(response.json().response_code != '200') {
        this.route.navigate(['/salon']);
      }
    });
  }

  public cust_details() {
    const data = {
      id: this.cust_id
    };
    this.apiService.cust_details(data).subscribe((response) => {
      console.log(response.json());
      this.resp_code = response.json().response_code;
      this.detail = response.json().response_data;
    });
  }

  public editCust(formData) {
    this.apiService.editCust(formData).subscribe((response) => {
      console.log(response.json());
      this.resp_code = response.json().response_code;
      if(this.resp_code==200) {
        this.route.navigate(['/cust-detail/'+this.cust_id]);
        //this.edit_cust = 0;
        location.reload();
      }
    });
  }

  public getCustAppointments() {
    const data = {
      id: this.cust_id
    }
    this.apiService.getCustAppointments(data).subscribe((response) => {
      console.warn(response.json());
      //this.tickets = response.json().response_data;
      this.tickets = response.json();
    });
  }

}
