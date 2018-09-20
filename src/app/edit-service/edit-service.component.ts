import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.css']
})
export class EditServiceComponent implements OnInit {
  service_id:any;
  resp_code:number;
  resp_type:string;
  resp_msg:string;
  service:object = [];
  constructor(private apiService:ApiService, private route:ActivatedRoute, private router:Router, private titleService: Title) { }

  ngOnInit() {
    let item = JSON.parse(localStorage.getItem("salon"));
    if(item=="") {
      //this.isSalonLoggedin();
      this.router.navigate(['/salon']);
    }
    this.titleService.setTitle("Edit Service");
    this.service_id = this.route.snapshot.paramMap.get('id');

    this.serviceDetail();
  }

  public serviceDetail() {
    const data = {
      id : this.service_id
    }
    this.apiService.serviceDetail(data).subscribe((response) => {
      console.warn(response.json());
      this.service = response.json().response_data;
    });
  }

  public editService(formData) {
    this.apiService.editEmp(formData).subscribe((response) => {
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
