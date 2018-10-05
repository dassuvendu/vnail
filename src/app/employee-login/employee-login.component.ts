import { Component, OnInit } from '@angular/core';
import { ApiService } from  '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-employee-login',
  templateUrl: './employee-login.component.html',
  styleUrls: ['./employee-login.component.css']
})
export class EmployeeLoginComponent implements OnInit {
  public pin:string;
  public phone:string;
  public resp_code:number;
  public resp_msg:string;
  public resp:any=[];
  public success:number=0;
  constructor(private  apiService:  ApiService, private router: ActivatedRoute, private route: Router, private titleService: Title) {}

  ngOnInit() {
    let item = JSON.parse(localStorage.getItem("employee"));
    if(item!=null) {
      this.route.navigate(['/emp-dashboard']);
    }
  }

  public  onSelect(num) {
  	var number = (<HTMLInputElement>document.getElementById("telNumber")).value;
    this.phone= number+""+num;
  }

  public login(){

    var phoneNo  = {
      phone_no:  (<HTMLInputElement>document.getElementById("telNumber")).value
    };

    this.apiService.empLogin(phoneNo).subscribe((response) => {
      if(response.json().response_code == 200) {
        this.resp = response.json().response_data;
        this.success=1;
        this.phone="";
      } else {
        this.success=0;
        this.resp_code = 201;
        this.resp_msg = "Number you provide is not exist";
      }
    });
  };

  pinCheck() {
    this.pin = (<HTMLInputElement>document.getElementById("telNumber")).value;
    if(this.resp.pin == this.pin) {
      localStorage.setItem("employee", JSON.stringify(this.resp));
      this.route.navigate(['/emp-dashboard']);
    } else {
      this.resp_code = 201;
      this.resp_msg = "Pin does not match with database";
    }
  }
}
