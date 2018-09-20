import { Component, OnInit } from '@angular/core';
import { ApiService } from  '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-all-service',
  templateUrl: './all-service.component.html',
  styleUrls: ['./all-service.component.css']
})
export class AllServiceComponent implements OnInit {
  public services: object = [];
  public resp_code: number;
  public service_chk: number;
  public packages: object = [];
  constructor(private  apiService:  ApiService, private router: ActivatedRoute, private route: Router, private titleService: Title) { }

  ngOnInit() {
    let item = JSON.parse(localStorage.getItem("salon"));
    if(item=="") {
      //this.isSalonLoggedin();
      this.route.navigate(['/salon']);
    }
    this.titleService.setTitle("All Service");
    this.allServices();
    this.getPackage();
    this.service_chk = 1;
  }

  public isSalonLoggedin() {
    this.apiService.isSalonLoggedin().subscribe((response) => {
      response.json();
      if(response.json().response_code != '200') {
        this.route.navigate(['/salon']);
      }
    });
  }

  public allServices() {
    this.apiService.allServices().subscribe((response) => {
      this.resp_code = response.json().response_code;
      this.services = response.json().response_data;
      //console.log(response.json());
      console.log(this.services);
    });
  }

  public getPackage() {
    this.apiService.getPackage().subscribe((response) => {
      this.resp_code = response.json().response_code;
      this.packages = response.json().response_data;
      //console.log(response.json());
      console.log(this.packages);
    });
  }

  public searchService(event) {
    console.log(event.target.value);
    this.apiService.searchService(event.target.value).subscribe((response) => {
      console.log(response.json());
      this.resp_code = response.json().response_code;
      this.services = response.json().response_data;
    });
  }

}
