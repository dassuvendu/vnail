import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-appointment-book',
  templateUrl: './appointment-book.component.html',
  styleUrls: ['./appointment-book.component.css']
})
export class AppointmentBookComponent implements OnInit {
  public now: Date = new Date();
  public appointment_data: object = [];
  public times:object = [];
  public events:object = [];
  public resp_code:number;
  public resp_msg:string;
  public hour:number;
  public day:number

  constructor(private apiService: ApiService, private router: Router, private titleService: Title) { }

  ngOnInit() {
    let item = JSON.parse(localStorage.getItem("salon"));
    if(item=="") {
      //this.isSalonLoggedin();
      this.router.navigate(['/salon']);
    }
    this.titleService.setTitle("Appointment Book");
    this.getAppointmentData();
  }

  public isSalonLoggedin() {
    this.apiService.isSalonLoggedin().subscribe((response) => {
      response.json();
      if(response.json().response_code != '200') {
        this.router.navigate(['/salon']);
      }
    });
  }

  public getAppointmentData() {
    var x = 5; //minutes interval
    var tt = 0; // start time
    var ap = ['AM', 'PM']; // AM-PM

    //loop to increment the time and push results in array
    for (var i=0;tt<24*60; i++) {
      var hh = Math.floor(tt/60); // getting hours of day in 0-24 format
      var mm = (tt%60); // getting minutes of the hour in 0-55 format
      //times[i] = ("0" + (hh % 12)).slice(-2) + ':' + ("0" + mm).slice(-2) + ap[Math.floor(hh/12)]; // pushing data in array in [00:00 - 12:00 AM/PM format]
      this.times[i] = {time:("0" + (hh)).slice(-2) + ':' + ("0" + mm).slice(-2), hr:("0" + (hh)).slice(-2), min:("0" + mm).slice(-2)}; // pushing data in array in [00:00 - 12:00 AM/PM format]
      tt = tt + x;
    }

    const data = {
      now : this.now.getTime(),
      times : JSON.stringify(this.times)
    };
    this.apiService.getAppointmentData(data).subscribe((Response) => {
      this.appointment_data = Response.json().response_data;
      this.resp_code = Response.json().response_code;
      this.resp_msg = Response.json().response_msg;

      // if(this.resp_code == 200) {
      //   for(let x in this.times) {
      //     for(let y in this.appointment_data) {
      //       var app_time = this.appointment_data[y].date.split(" ");
      //       if(this.times[x].time == app_time[1].split(":")[0]+":"+app_time[1].split(":")[1]){
      //         //console.log(app_time[1].split(":")[0]+":"+app_time[1].split(":")[1]);
      //         this.times[x].appointment = this.appointment_data[y];
      //         //this.times[x] = {time: appointment: this.appointment_data[y]};
      //       } else {
      //         this.times[x].appointment = [];
      //       }
      //     }
      //   }
      // }

      console.warn(this.events);
    });

  }

}
