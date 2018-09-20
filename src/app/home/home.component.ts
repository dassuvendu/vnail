import { Component, OnInit } from '@angular/core';
import { ApiService } from  '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  phone:string = '';
  newUser: boolean = false;
  resp:string = "";
  public  phoneNo:  Array<object> = [];
  resp_code:string = '';
  public  loginData:  any = [];

  constructor(private  apiService:  ApiService, private router: Router) { }

  ngOnInit() {
    //this.getContacts();
    sessionStorage.setItem("lastname", JSON.stringify({"user":{id:1, name:"Subrata Roy"}}));
    console.warn(JSON.parse(sessionStorage.getItem("lastname")));
  }

  public isLogedin(){
    this.apiService.isLogedin().subscribe((response) => {
      console.log(response);
      this.loginData = response;
    });
  }

  public login(){

    var phoneNo  = {
      phone_no:  (<HTMLInputElement>document.getElementById("telNumber")).value
    };

    this.apiService.loginCheck(phoneNo).subscribe((response) => {
      console.log(response);
      this.resp_code = response.json().response_code;
      this.phoneNo = response.json();
      if(this.resp_code=='200') {
        this.router.navigate(['/service']);
      }
    });
  };

  public  onSelect(num) {
  	var number = (<HTMLInputElement>document.getElementById("telNumber")).value;
    //(HtmlElement('#telNumber').val(number+""+num);
    this.phone= number+""+num;
  }

  public resetPhNo() {
    (<HTMLInputElement>document.getElementById("telNumber")).value="";
  }

  public ShowHide() {
    this.newUser = true;
  }

  public addNewCust(formData) {
    this.apiService.newCustAdd(formData).subscribe((response) => {
      console.log(response.json());
      this.resp = response.json();
      this.router.navigate(['/service']);
    });
  }
}

