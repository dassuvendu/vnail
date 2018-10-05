import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-gift-card-details',
  templateUrl: './gift-card-details.component.html',
  styleUrls: ['./gift-card-details.component.css']
})
export class GiftCardDetailsComponent implements OnInit {
  public card_id;
  public cardDetail;
  public resp_code=200;
  public resp_msg;

  constructor(private  apiService:  ApiService, private router: ActivatedRoute, private route: Router, private title: Title) { }

  ngOnInit() {
    let item = JSON.parse(localStorage.getItem("salon"));
    this.card_id = this.router.snapshot.paramMap.get('id');

    if(item==null) {
      //this.isSalonLoggedin();
      this.route.navigate(['/salon']);
    }

    this.title.setTitle("Gift Card Details");

    this.giftCardDetails();
  }

  giftCardDetails() {
    let obj = {
      id:this.card_id
    }
    this.apiService.giftCardDetails(obj).subscribe((resp) => {
      if(resp.json().response_code==100) {
        localStorage.removeItem("salon");
        this.route.navigate(['/salon']);
      }
      this.cardDetail=resp.json().response_data;
      this.resp_code = resp.json().response_code;
      this.resp_msg = resp.json().response_msg;
    });
  }
}
