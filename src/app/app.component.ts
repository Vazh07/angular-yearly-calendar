import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-yearly-calendar';

  week: string[] = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  year: {
    year: number,
    months: { month: number, name: string, days: { name: string, value: number, indexWeek: number, booked:boolean, opacity:number }[] }[]
  } = {
      year: 2021,
      months: [{
        month: 1,
        name: 'january',
        days: []
      },
      {
        month: 2,
        name: 'february',
        days: []
      },
      {
        month: 3,
        name: 'march',
        days: []
      },
      {
        month: 4,
        name: 'april',
        days: []
      },
      {
        month: 5,
        name: 'may',
        days: []
      },
      {
        month: 6,
        name: 'june',
        days: []
      },
      {
        month: 7,
        name: 'july',
        days: []
      },
      {
        month: 8,
        name: 'august',
        days: []
      },
      {
        month: 9,
        name: 'september',
        days: []
      },
      {
        month: 10,
        name: 'october',
        days: []
      },
      {
        month: 11,
        name: 'november',
        days: []
      },
      {
        month: 12,
        name: 'december',
        days: []
      }]
    }

    importantDays=[{year:2021,month:1,day:2},{year:2021,month:1,day:1},{year:2021,month:1,day:1},{year:2021,month:1,day:3},{year:2021,month:1,day:3},{year:2021,month:1,day:3}]

  ngOnInit(): void {
    this.initYearlyCalendar()
  }

  initYearlyCalendar(){
    this.year.months.forEach(month => {
      month.days=(
        this.getDaysFromDate(
          month.month,
          this.year.year
        )
      )
    })
  }

  getDaysFromDate(month: number, year: number) {
    const startDate = moment.utc(`${year}/${month}/01`)
    const endDate = startDate.clone().endOf('month')

    const diffDays = endDate.diff(startDate, 'days', true)
    const numberDays = Math.round(diffDays);

    const arrayDays = Object.keys([...Array(numberDays)]).map((a: any) => {
      a = parseInt(a) + 1;
      let booked = false
      let impCount = 0
      this.importantDays.forEach(impDate=>{
        if(impDate.year === year && impDate.month === month && impDate.day === a){
           booked = true
           impCount++
        }
      })
      switch(impCount){
        case 1:
          impCount = 0.5
          break
        case 2:
          impCount = 0.7
          break
        case 3:
          impCount = 0.9
          break
        default:
          impCount = 1
      }
      const dayObject = moment(`${year}-${month}-${a}`);
      return {
        name: dayObject.format("dddd"),
        value: a,
        indexWeek: dayObject.isoWeekday(),
        booked: booked,
        opacity: impCount
      };
    });

    console.log(arrayDays)
    return arrayDays
  }

  setYear(isNext:boolean){
    if(isNext) this.year.year+=1
    else this.year.year-=1
    this.initYearlyCalendar()
  }

}
