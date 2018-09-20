import { Component, OnInit } from '@angular/core';
import { ApiService } from  '../api.service';
import { Router } from '@angular/router';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-manage-customer',
  templateUrl: './manage-customer.component.html',
  styleUrls: ['./manage-customer.component.css']
})
export class ManageCustomerComponent implements OnInit {
  public allCustomer: Array<object> = [];
  public resp_code: number;
  constructor(private  apiService:  ApiService, private router: Router, private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle("Customer");
    //this.getAllCustomer();
  }

  public getAllCustomer() {
    this.apiService.getAllCustomer().subscribe((response) => {
      console.log(response.json());
      this.allCustomer = response.json();
    });
  }

  public searchCustomer(event) {
    console.log(event.target.value);
    this.apiService.searchCustomer(event.target.value).subscribe((response) => {
      console.log(response.json());
      this.resp_code = response.json().response_code;
      this.allCustomer = response.json().response_data;
    });
  }

}
