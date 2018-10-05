import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-employee-appointment-book',
  templateUrl: './employee-appointment-book.component.html',
  styleUrls: ['./employee-appointment-book.component.css']
})
export class EmployeeAppointmentBookComponent implements OnInit {
  public now: Date = new Date();
  public appointment_data: object = [];
  public times:object = [];
  public events:object = [];
  public resp_code:number;
  public resp_msg:string;
  public hour:number;
  public day:number;
  public date:string;
  public localdata;

  constructor(private apiService:ApiService, private router: Router, private route: ActivatedRoute, private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle("Employee Appointment");

    this.date = this.route.snapshot.paramMap.get('date');

    if(this.date==null) {
      var d = new Date();
      this.date = d.getFullYear()+"-"+d.getMonth()+"-"+d.getDate();
    }

    let item = JSON.parse(localStorage.getItem("employee"));
    this.localdata = item;
    console.log(item);
    if(item==null) {
      //this.isSalonLoggedin();
      this.router.navigate(['/employee']);
    } 

    this.getAppointmentData();
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
      now : this.route.snapshot.paramMap.get('date'),
      times : JSON.stringify(this.times),
      id: this.localdata.id
    };
    this.apiService.getEmpAppAppointmentData(data).subscribe((Response) => {
      this.appointment_data = Response.json().response_data;
      this.resp_code = Response.json().response_code;
      this.resp_msg = Response.json().response_msg;

      console.warn(this.events);
    });

  }

}
