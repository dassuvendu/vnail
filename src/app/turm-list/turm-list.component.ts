import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-turm-list',
  templateUrl: './turm-list.component.html',
  styleUrls: ['./turm-list.component.css']
})
export class TurmListComponent implements OnInit {

  public turn_list:Array<object>;
  constructor(private apiService: ApiService, private route: Router, private titleService: Title) { }

  ngOnInit() {
    let item = JSON.parse(localStorage.getItem("salon"));
    if(item=="") {
      //this.isSalonLoggedin();
      this.route.navigate(['/salon']);
    }
    
    this.titleService.setTitle("Turn List");

    this.getTurnList();
  }

  getTurnList() {
    this.apiService.getTurnList().subscribe((response) => {
      console.warn(response.json());
      this.turn_list = response.json().response_data;
    });
  }
}
