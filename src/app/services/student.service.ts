import { Student } from './../models/student.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class StudentService 
{
  constructor(private db: AngularFirestore) { }
  getStudents()
  {
    return this.db.collection('eleves').valueChanges({idField: "id"}); //
  }
  getStudentsFromClasse(nomClasse: string)
  {
    return this.db.collection('eleves', maClasse => maClasse.where('classe','==',nomClasse)).snapshotChanges();
  }
  getStudent(id: string)
  {
    return this.db.doc(`eleves/${id}`).valueChanges({idKey: "id"});
  }
  getDiscipline(id: number)
  {
    return this.db.collection('matieres', matiere => matiere.where('id','==',id)).valueChanges();
  }
  addStudent(student: Student)
  {
    return this.db.collection('eleves').add(student);
  }
  deleteStudent(idStudent: string)
  {
    return this.db.doc(`eleves/${idStudent}`).delete();
  }
  updateStudent(student: Student)
  {
    return this.db.doc(`eleves/${student.id}`).set(student);
  }
  isStudentMatriculeExist(studentMatricule: string)
  {
    return this.db.collection('eleves',student => student.where('matricule','==',studentMatricule)).valueChanges().toPromise();
  }
}
