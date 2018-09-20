import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.css']
})
export class ServiceDetailComponent implements OnInit {
  service_id:any;
  public service:object = [];
  public category:object = [];
  resp_code:number;
  resp_msg:string;
  resp_type:string;
  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router, private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle("Service Detail");

    this.service_id = this.route.snapshot.paramMap.get('id');
    console.log(this.service_id);
    this.service_details();
  }

  public service_details() {
    var data = {
      id: this.service_id
    }
    this.apiService.serviceDetail(data).subscribe((Response) => {
      console.log(Response.json());
      this.resp_code = Response.json().response_code;
      this.resp_msg = Response.json().response_msg;
      this.service = Response.json().response_data.service;
      this.category = Response.json().response_data.category;
    });
  }

  submitForm() {
    (<HTMLInputElement>document.getElementById("edit_service_frm")).form
  }

  public editService(formData) {
    this.apiService.editService(formData).subscribe((response) => {
      console.warn(response.json());
      this.resp_code = response.json().response_code;
      this.resp_msg = response.json().response_msg;
      if(this.resp_code==200) {
        this.resp_type = "success";
        setTimeout(()=>{
          this.router.navigate(['/services']);
        },2000);
      } else {
        this.resp_type = "warning";
      }
    });
  }

}
