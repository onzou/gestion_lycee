import { StudentService } from './../../../services/student.service';
import { Student } from './../../../models/student.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.css']
})
export class ListStudentComponent implements OnInit {
  students: Student[];
  constructor(private serviceStudent: StudentService) { }

  ngOnInit(): void 
  {
    this.getStudents();
  }
  getStudents()
  {
    this.serviceStudent.getStudents()
        .subscribe((data: any)=>
        {          
          this.students = data;    
        },(error)=>
        {
          console.log("An error occured while getting the students ")
        })
  }
}
