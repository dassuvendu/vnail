import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-emp-header',
  templateUrl: './emp-header.component.html',
  styleUrls: ['./emp-header.component.css']
})
export class EmpHeaderComponent implements OnInit {

  public title:string;
  constructor(private router:Router, private apiService:ApiService, private titleService: Title) { }

  ngOnInit() {
    this.title = this.titleService.getTitle();
  }

  employeeLogout() {
    this.apiService.empLogout().subscribe((resp) => {
      if(resp.json().response_code==200){
        localStorage.removeItem("employee");
        this.router.navigate(['/employee']);
      }
    });
  }

}
