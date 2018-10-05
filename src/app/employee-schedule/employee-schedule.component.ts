import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from "@angular/platform-browser";
import * as $ from 'jquery';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';

@Component({
  selector: 'app-employee-schedule',
  templateUrl: './employee-schedule.component.html',
  styleUrls: ['./employee-schedule.component.css']
})
export class EmployeeScheduleComponent implements OnInit {
  calendarOptions: Options;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  emp_id:any;
  public emp_tab:number = 1;
  public schedule;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router, private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle("Employee Schedule");

    let item = JSON.parse(localStorage.getItem("employee"));
    if(item==null) {
      //this.isSalonLoggedin();
      this.router.navigate(['/employee']);
    }

    this.emp_id = item.id;

    this.getSchedules();
  }

  getSchedules () {
    let id = {
      id:this.emp_id
    }

    this.apiService.getEmpAppSchedules(id).subscribe((resp) => {
      if(resp.json().response_code) {
        this.schedule = resp.json().response_data;
        this.calendarOptions = {
          editable: false,
          eventLimit: false,
          header: {
            left: 'prev,next',
            center: 'title',
            right: 'agendaWeek'
          },
          defaultView: 'agendaWeek',
          events: this.schedule,
          //eventColor: 'black',     // an option!
        };
      }
    });
  }

}
