import { Component, OnInit } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';

// Calendar
import {
  CalendarOptions,
  EventApi,
  EventClickArg,
} from '@fullcalendar/angular'; // useful for typechecking

// Service
import { ScheduleService } from '../../services/schedule.service';


// Material
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
// import { AddScheduleComponent } from '../add-schedule/add-schedule.component';
import { InfoComponent } from '../info/info.component';

// Convert To PDF
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { Kelas } from '../../models/kelas';
import { KelasService } from 'src/app/services/kelas.service';

@Component({
  selector: 'salt-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  events: any[] = [];
  calendarOptions!: CalendarOptions;
  currentEvents: EventApi[] = [];
  calendarVisible = true;
  allClass: Kelas[] = [];
  selectedClass!: string;
  filteredSchedule: string[] = [];

  constructor(
    private scheduleService: ScheduleService,
    private kelasService: KelasService,
    private dialog: MatDialog
  ) {}
  ngOnInit() {
    this._eventInit();
    this._kelasInit();

    this.calendarOptions = {
      initialView: 'timeGridWeek',
    };

    setTimeout(() => {
      //full calendar setting and event binding
      this.calendarOptions = {
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'timeGridWeek,listWeek',
        },
        initialView: 'timeGridWeek',
        events: this.events[0],
        weekends: true,
        // editable: true,
        // selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        // select: this.handleDateSelect.bind(this),
        eventClick: this.handleEventClick.bind(this),
        // eventsSet: this.handleEvents.bind(this),
      };
    }, 2000);
  }

  private _eventInit() {
    this.scheduleService.getAllSchedule().subscribe((data) => {
      this.events.push(data);
    });
  }
  private _kelasInit() {
    this.kelasService.getAllClass().subscribe((kelas) => {
      kelas.forEach((element: Kelas) => {
        this.allClass.push(element);
      });
    });
  }

  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  // handleDateSelect(selectInfo: DateSelectArg) {
  //   this.openDialog(selectInfo);
  //   // const title = prompt('Please enter a new title for your event');
  //   // const calendarApi = selectInfo.view.calendar;
  //   // if (title) {
  //   //   const temp_event = {
  //   //     title,
  //   //     start: selectInfo.startStr,
  //   //     end: selectInfo.endStr,
  //   //     allDay: selectInfo.allDay,
  //   //   };
  //   //   calendarApi.addEvent(temp_event);
  //   //   this.scheduleService.createSchedule(temp_event).subscribe();
  //   // }
  // }

  handleEventClick(clickInfo: EventClickArg) {
    this.openDialog2(clickInfo);
    // if (
    //   confirm(
    //     `Are you sure you want to delete the event '${clickInfo.event.title}'`
    //   )
    // ) {
    //   clickInfo.event.remove();
    //   this.scheduleService
    //     .removeSchedule(clickInfo.event._def.extendedProps['_id'])
    //     .subscribe();
    // }
  }

  // handleEvents(events: any[]) {
  //   this.currentEvents = events;

  //   setTimeout(() => {
  //     this.scheduleService.editSchedule(this.currentEvents).subscribe();
  //   }, 1000);
  // }

  scheduleFilter(id: string) {
    if (this.filteredSchedule.includes(id)) {
      const index = this.filteredSchedule.findIndex((item) => item == id);
      this.filteredSchedule.splice(index, 1);
    } else {
      this.filteredSchedule.push(id);
    }

    this.scheduleService.getTempSchedule(this.filteredSchedule).subscribe(
      (filteredSchedule) => {
        console.log('DATA3: ', filteredSchedule);
        this.events = filteredSchedule;
        setTimeout(() => {
          //full calendar setting and event binding
          this.calendarOptions = {
            headerToolbar: {
              left: 'prev,next today',
              center: 'title',
              right: 'timeGridWeek,listWeek',
            },
            initialView: 'timeGridWeek',
            events: this.events,
            weekends: true,
            // editable: true,
            // selectable: true,
            selectMirror: true,
            dayMaxEvents: true,
            // select: this.handleDateSelect.bind(this),
            eventClick: this.handleEventClick.bind(this),
            // eventsSet: this.handleEvents.bind(this),
          };
        }, 100);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // openDialog(selectInfo: DateSelectArg) {
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.disableClose = true;
  //   dialogConfig.autoFocus = true;

  //   dialogConfig.data = {
  //     start: selectInfo.startStr,
  //     end: selectInfo.endStr,
  //     allDay: selectInfo.allDay,
  //   };

  //   const dialogRef = this.dialog.open(C2Component, {
  //     data: {
  //       dialogConfig,
  //       selectInfo,
  //     },
  //   });
  //   dialogRef.afterClosed();
  // }

  openDialog1() {
    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    // dialogConfig.autoFocus = true;
    // const dialogRef = this.dialog.open(AddScheduleComponent, dialogConfig);
    // dialogRef.afterClosed();
  }
  openDialog2(clickInfo: EventClickArg) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(InfoComponent, {
      data: { clickInfo },
    });
    dialogRef.afterClosed();
  }

  public convertToPDF() {
    const data = document.getElementById('schedule');
    this.generatePDF(data);
  }

  generatePDF(htmlContent: any) {
    html2canvas(htmlContent).then((canvas) => {
      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(contentDataURL, 'JPEG', 15, 10, 180, 160);
      pdf.save('schedule.pdf');
    });
  }
}
