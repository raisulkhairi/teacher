import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-all-data',
  templateUrl: './all-data.component.html',
  styleUrls: ['./all-data.component.css'],
})
export class AllDataComponent implements OnInit {
  getAllStudent:any ;

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.getAllStudent = this.studentService.getAllStudent().subscribe(data =>{
      this.getAllStudent = data;
    });
  }
}
