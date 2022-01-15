import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Kelas } from '../models/kelas';
// const link1 = 'https://final-project-app-v1.herokuapp.com/api/class';
const link2 = 'https://9b9d-36-70-208-198.ngrok.io/api/class';

@Injectable({
  providedIn: 'root',
})
export class KelasService {
  constructor(private http: HttpClient) {}
  getAllClass(): Observable<Kelas[]> {
    return this.http.get<Kelas[]>(link2);
  }
  getClassBySubject(id: any): Observable<Kelas[]> {
    return this.http.get<Kelas[]>(`${link2}/getClassBySubject/${id}`);
  }

  // getTempClasses(kelas?: any): Observable<any[]> {
  //   let params = new HttpParams();
  //   if (kelas) {
  //     params = params.append('kelas', kelas.join(','));
  //   }

  //   return this.http.get<any[]>(
  //     `https://final-project-app-v1.herokuapp.com/api/class/tempClass`,
  //     {
  //       params: params,
  //     }
  //   );
  // }
}
