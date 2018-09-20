import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
//import { Select2OptionData } from 'ng-select2';
//import { Select2Module } from "ng-select2-component";
import { Title } from "@angular/platform-browser";
import * as $ from 'jquery';

@Component({
  selector: 'app-package-detail',
  templateUrl: './package-detail.component.html',
  styleUrls: ['./package-detail.component.css']
})
export class PackageDetailComponent implements OnInit {
  package_id:any;
  public services:object = [];
  public package:object = [];
  public package_service:object = [];
  public package_service_str:string;
  resp_code:number;
  resp_msg:string;
  resp_type:string;

  dropdownSettings = {};

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router, private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle("Package Detail");

    this.package_id = this.route.snapshot.paramMap.get('id');
    console.log(this.package_id);
    this.package_details();

    $(document).ready(function(){
      //alert("hh");
    });

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

  }

  onItemSelect (item:any) {
    console.log(item);
  }
  onSelectAll (items: any) {
    console.log(items);
  }

  public package_details() {
    var data = {
      id: this.package_id
    }
    this.apiService.packageDetail(data).subscribe((Response) => {
      console.log(Response.json());
      this.resp_code = Response.json().response_code;
      this.resp_msg = Response.json().response_msg;
      this.services = Response.json().response_data.services;
      this.package = Response.json().response_data.pkg;
      this.package_service_str = Response.json().response_data.pkg.pkg_services_str;
    });
  }

  submitForm() {
    (<HTMLInputElement>document.getElementById("edit_package_frm")).form
  }

  public editPackage(formData) {
    console.log(formData);
    this.apiService.editPackage(formData).subscribe((response) => {
      console.warn(response.json());
      this.resp_code = response.json().response_code;
      this.resp_msg = response.json().response_msg;
      if(this.resp_code==200) {
        this.resp_type = "success";
        setTimeout(()=>{
          this.router.navigate(['/package-detail/'+this.package_id]);
        },2000);
      } else {
        this.resp_type = "warning";
      }
    });
  }

}
