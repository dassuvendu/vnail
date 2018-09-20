import { Component, OnInit } from '@angular/core';
import { ApiService } from  '../api.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {
  public  loginData:  any = [];
  public  services:  Array<object> = [];
  public service_ids:string = "";
  public service_id:string = "";
  public service_price:number = 0;
  public display:string = "none";

  constructor(private  apiService:  ApiService, private router: Router) { }

  ngOnInit() {
    this.isLogedin();
    this.getServices();
    console.warn(JSON.parse(sessionStorage.getItem("lastname")));
  }

  public isLogedin(){
    this.apiService.isLogedin().subscribe((response) => {
      this.loginData = response;
    });
  }

  public getServices(){
    this.apiService.getServices().subscribe((response) => {
      if(response.json().response_code == 200) {
        this.services = response.json().response_data;
      }
    });
  }

  public selectService(event, service_id, price) {
    if(event.target.parentElement.classList[1] == "active") {
      event.target.parentElement.classList.remove('active'); 
      this.service_ids = this.service_ids.replace(","+service_id+",", ",");
      this.service_price = this.service_price-price;
    } else {
      event.target.parentElement.classList.add('active');
      if(this.service_ids=="") {
        this.service_ids = ","+service_id+",";
      } else {
        this.service_ids += service_id+",";
      }
      this.service_price = this.service_price+parseFloat(price);
    }
    //console.log(this.service_ids);
  }

  public setAppointment (data){
    this.apiService.setAppointment(data).subscribe((response) => {
      if(response.json().response_code == 200){
        this.display = "block";
      }
    });
  }

  public logout () {
    this.apiService.logout().subscribe((response) => {
      if(response.json().status == 1){
        this.router.navigate(['/']);
      }
    });
  }
}
