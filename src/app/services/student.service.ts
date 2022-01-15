import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  url:string ='https://9b9d-36-70-208-198.ngrok.io/api/';
  constructor(private http :HttpClient) {}
  getAllStudent(){
    return this.http.get(this.url+'student');
  }
}
