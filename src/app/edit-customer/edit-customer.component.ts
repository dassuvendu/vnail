import { Component, OnInit } from '@angular/core';
import { ApiService } from  '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {
  public cust_id:any;
  public detail: Array<object> = [];
  public resp_code: number;
  public resp_msg: string;
  constructor(private  apiService:  ApiService, private router: ActivatedRoute, private route: Router, private titleService: Title) { }

  ngOnInit() {
    let item = JSON.parse(localStorage.getItem("salon"));
    if(item=="") {
      //this.isSalonLoggedin();
      this.route.navigate(['/salon']);
    }
    this.titleService.setTitle("Edit Customer");
    this.cust_id = this.router.snapshot.paramMap.get('id');

    this.cust_details();
  }

  public cust_details() {
    const data = {
      id: this.cust_id
    };
    this.apiService.cust_details(data).subscribe((response) => {
      console.log(response.json());
      this.resp_code = response.json().response_code;
      this.detail = response.json().response_data;
    });
  }

  public editCust(formData) {
    this.apiService.editCust(formData).subscribe((response) => {
      console.log(response.json());
      this.resp_code = response.json().response_code;
      if(this.resp_code==200) {
        this.route.navigate(['/cust-detail/'+this.cust_id]);
      }
    });
  }

}
