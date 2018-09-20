import { Component, OnInit } from '@angular/core';
import { ApiService } from  '../api.service';
import { Router } from '@angular/router';
// import { ToastsManager } from 'ng6-toastr/ng2-toastr';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-waiting-customer',
  templateUrl: './waiting-customer.component.html',
  styleUrls: ['./waiting-customer.component.css']
})
export class WaitingCustomerComponent implements OnInit {
  public  waiting_cust:  Array<object> = [];
  public  turn_list:  Array<object> = [];
  app_id: number;
  emp_id: number;
  public show_turn:number = 0;
  resp: number;

  constructor(private  apiService:  ApiService, private router: Router, private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle("Waiting Customer");

    this.getWaitingCust();

    this.getTurnList();
  }

  public getWaitingCust(){
    this.apiService.getWaitingCust().subscribe((response) => {
      console.log(response.json());
      this.resp = response.json().response_code;
      if(response.json().response_code == 200) {
        this.waiting_cust = response.json().response_data;
      }
    });
  }

  getTurnList() {
    this.apiService.getTurnList().subscribe((response) => {
      console.warn(response.json());
      this.turn_list = response.json().response_data;
    });
  }

  public getAppointId(id) {
    this.app_id = id;
    this.show_turn = 1;
  }

  public setAppointment(emp_id) {
    console.log(emp_id);
    this.emp_id = emp_id;
    var data = {
      emp_id:this.emp_id,
      app_id:this.app_id
    }
    this.apiService.setCustAppointment(data).subscribe((Response) => {
      if(Response.json().response_code==200) {
        this.router.navigate(['/appointment-book']);
      }
    });
  }

}
