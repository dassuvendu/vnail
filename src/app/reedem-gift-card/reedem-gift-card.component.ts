import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-reedem-gift-card',
  templateUrl: './reedem-gift-card.component.html',
  styleUrls: ['./reedem-gift-card.component.css']
})
export class ReedemGiftCardComponent implements OnInit {
  public cardNumber;
  public app_id;

  constructor(private  apiService:  ApiService, private router: ActivatedRoute, private route: Router, private title: Title) { }

  ngOnInit() {
    let item = JSON.parse(localStorage.getItem("salon"));
    this.app_id = this.router.snapshot.paramMap.get('id');

    if(item==null) {
      //this.isSalonLoggedin();
      this.route.navigate(['/salon']);
    }

    this.title.setTitle("Reedem Gift Card");
  }

  public onSelect(num) {
  	var number = (<HTMLInputElement>document.getElementById("telNumber")).value;
    //(HtmlElement('#telNumber').val(number+""+num);
    this.cardNumber= number+""+num;
  }

  redeemGiftCard() {
    let obj = {
      id: this.app_id,
      card: this.cardNumber,
      
    }

    this.apiService.redeemGiftCard(obj).subscribe((resp) => {
      if(resp.json().response_data==100) {
        localStorage.removeItem("salon");
        this.route.navigate(['/salon']);
      }

      if(resp.json().response_data=='200') {
        this.route.navigate(['/turn-list']);
      }
    });
  }

}
