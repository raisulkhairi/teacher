import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Schedule } from '../models/schedule';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  constructor(private http: HttpClient) {}

  createSchedule(event: any) {
    return this.http.post(`https://9b9d-36-70-208-198.ngrok.io/api/schedule`, event);
  }

  getAllSchedule(): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(`https://9b9d-36-70-208-198.ngrok.io/api/schedule`);
  }

  getScheduleByID(id: string): Observable<Schedule> {
    console.log('IFD : ', id);
    return this.http.get<Schedule>(`https://9b9d-36-70-208-198.ngrok.io/api/schedule/${id}`);
  }

  removeSchedule(id: string): Observable<Schedule> {
    return this.http.delete<Schedule>(
      `https://9b9d-36-70-208-198.ngrok.io/api/schedule/` + id
    );
  }

  editSchedule(allEvent: any): Observable<Schedule[]> {
    return this.http.put<Schedule[]>(
      `https://9b9d-36-70-208-198.ngrok.io/api/schedule`,
      allEvent
    );
  }

  editScheduleByID(id: string, data: any): Observable<Schedule> {
    return this.http.put<Schedule>(
      `https://9b9d-36-70-208-198.ngrok.io/api/schedule/editEvent/${id}`,
      data
    );
  }
  getTempSchedule(dataKelas?: any): Observable<Schedule[]> {
    let params = new HttpParams();
    if (dataKelas) {
      params = params.append('schedule', dataKelas.join(','));
    }

    return this.http.get<Schedule[]>(
      `https://9b9d-36-70-208-198.ngrok.io/api/schedule/tempSchedule`,
      {
        params: params,
      }
    );
  }
}
