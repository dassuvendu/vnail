import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {

  constructor(private apiService: ApiService, private route: Router, private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle("Check Out");

    let item = JSON.parse(localStorage.getItem("salon"));
    if(item=="") {
      //this.isSalonLoggedin();
      this.route.navigate(['/salon']);
    }
  }

}
