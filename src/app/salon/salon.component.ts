import { Component, OnInit } from '@angular/core';
import { ApiService } from  '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-salon',
  templateUrl: './salon.component.html',
  styleUrls: ['./salon.component.css']
})
export class SalonComponent implements OnInit {
  public resp: any = [];
  public salonData: any;
  public resp_code: string = "";
  public resp_status: string = "";
  public resp_msg: string = "";

  constructor(private  apiService:  ApiService, private router: Router) { }

  ngOnInit() {
    this.isSalonLoggedin();
  }

  public isSalonLoggedin() {
    this.apiService.isSalonLoggedin().subscribe((response) => {
      response.json();
      if(response.json().response_code == '200') {
        //localStorage.setItem(key, JSON.stringify(myObj));
        this.router.navigate(['/dashboard']);
      }
    });
  }

  public salonSignIn(formData) {
    //console.log(formData);
    var salonData = {
      email: formData.email,
      password: formData.password,
    }
    this.apiService.salonOwnerLogin(salonData).subscribe((response) => {
      this.resp = response.json();
      this.resp_code = response.json().response_code;
      this.resp_msg = response.json().response_msg;
      if(this.resp_code == '200') {
        localStorage.setItem("salon", JSON.stringify(this.resp.response_data));
        this.router.navigate(['/dashboard']);
      } else {
        this.resp_status = "warning";
      }
    });
  }

}
