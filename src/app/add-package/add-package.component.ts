import { Component, OnInit } from '@angular/core';
import { ApiService } from  '../api.service';
import { Router } from '@angular/router';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-add-package',
  templateUrl: './add-package.component.html',
  styleUrls: ['./add-package.component.css']
})
export class AddPackageComponent implements OnInit {
  phone:string = '';
  newUser: boolean = false;
  resp:string = "";
  public  phoneNo:  Array<object> = [];
  resp_code:string = '';
  public resp_msg: string = "";
  public resp_type: string = "";
  public  loginData:  any = [];
  public services: Array<object>;

  constructor(private  apiService:  ApiService, private router: Router, private titleService: Title) { }

  ngOnInit() {
    let item = JSON.parse(localStorage.getItem("salon"));
    if(item=="") {
      //this.isSalonLoggedin();
      this.router.navigate(['/salon']);
    }
    this.titleService.setTitle("Add Package");
    this.getService();
  }

  public isSalonLoggedin() {
    this.apiService.isSalonLoggedin().subscribe((response) => {
      response.json();
      if(response.json().response_code != '200') {
        this.router.navigate(['/salon']);
      }
    });
  }

  public getService() {
    this.apiService.allServices().subscribe((response) => {
      this.services = response.json().response_data;
    });
  }

  public addService(formData){
    this.apiService.addService(formData).subscribe((response)=>{
      console.log(response);
      this.resp_code = response.json().response_code;
      this.resp_msg = response.json().response_msg;
      this.phoneNo = response.json();
      if(this.resp_code=='200') {
        this.resp_type = "success";
        //setTimeout(() => {
          this.router.navigate(['/services']);
        //}, 2000);
      } else {
        this.resp_type = "warning";
      }
    });
  }

}
