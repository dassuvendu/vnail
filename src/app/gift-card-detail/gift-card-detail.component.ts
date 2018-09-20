import { Component, OnInit } from '@angular/core';
import { ApiService } from  '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-gift-card-detail',
  templateUrl: './gift-card-detail.component.html',
  styleUrls: ['./gift-card-detail.component.css']
})
export class GiftCardDetailComponent implements OnInit {
  public all_data:object;
  id:any;
  constructor(private  apiService:  ApiService, private router: ActivatedRoute, private route: Router, private titleService: Title) { }

  ngOnInit() {
    this.id = this.router.snapshot.paramMap.get('id');
    let item = JSON.parse(localStorage.getItem("salon"));
    if(item=="") {
      //this.isSalonLoggedin();
      this.route.navigate(['/salon']);
    }
    this.titleService.setTitle("Gift Card Detail");

    this.getGiftCardDetail();
  }

  public getGiftCardDetail() {
    let data = {
      id:this.id
    };
    this.apiService.getGiftCardDetail(data).subscribe((Response) => {
      this.all_data = Response.json();
    });
  }

}
