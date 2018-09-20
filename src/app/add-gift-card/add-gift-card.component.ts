import { Component, OnInit } from '@angular/core';
import { ApiService } from  '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-add-gift-card',
  templateUrl: './add-gift-card.component.html',
  styleUrls: ['./add-gift-card.component.css']
})
export class AddGiftCardComponent implements OnInit {
  customers:object;
  dropdownSettings = {};
  resp_code:number;
  resp_type:string;
  resp_msg:string;

  constructor(private  apiService:  ApiService, private router: ActivatedRoute, private route: Router, private titleService: Title) { }

  ngOnInit() {
    let item = JSON.parse(localStorage.getItem("salon"));
    if(item=="") {
      //this.isSalonLoggedin();
      this.route.navigate(['/salon']);
    }
    this.titleService.setTitle("Add Gift Card");

    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      allowSearchFilter: true
    };

    this.getAllCustomer();
  }

  public getAllCustomer() {
    this.apiService.getAllCustomer().subscribe((Response) => {
      this.customers = Response.json().response_data;
      console.log(this.customers);
    });
  }

  public addGiftCard(data) {
    this.apiService.addGiftCard(data).subscribe((Response) => {
      this.resp_code = Response.json().response_code;
      if(this.resp_code==200) {
        this.resp_type = "success";
        setTimeout(() => {
          this.route.navigate(['/gift-card']);
        }, 2000);
      } else {
        this.resp_type = "warning";
      }
      this.resp_msg = Response.json().response_msg;
    });
  }
}
