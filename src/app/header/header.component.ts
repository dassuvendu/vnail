import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public title:string;
  constructor(private router:Router, private titleService: Title) { }

  ngOnInit() {
    this.title = this.titleService.getTitle();
  }

}
