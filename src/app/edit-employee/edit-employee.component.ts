import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  emp_id:any;
  resp_code:number;
  resp_type:string;
  resp_msg:string;
  employee:object = [];
  constructor(private apiService:ApiService, private route:ActivatedRoute, private router:Router, private titleService: Title) { }

  ngOnInit() {
    let item = JSON.parse(localStorage.getItem("salon"));
    if(item=="") {
      //this.isSalonLoggedin();
      this.router.navigate(['/salon']);
    }
    
    this.titleService.setTitle("Edit Employee");

    this.emp_id = this.route.snapshot.paramMap.get('id');

    this.emp_details();
  }

  public emp_details() {
    const data = {
      id : this.emp_id
    }
    this.apiService.emp_details(data).subscribe((response) => {
      console.warn(response.json());
      this.employee = response.json().response_data;
    });
  }

  public editEmp(formData) {
    this.apiService.editEmp(formData).subscribe((response) => {
      console.warn(response.json());
      this.resp_code = response.json().response_code;
      this.resp_msg = response.json().response_msg;
      if(this.resp_code==200) {
        this.resp_type = "success";
        setTimeout(()=>{
          this.router.navigate(['/emp-detail/'+this.emp_id]);
        },2000);
      } else {
        this.resp_type = "warning";
      }
    });
  }

}
