import { Classe } from './../models/classe.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ClasseService 
{
  classeCollection: any;
  constructor(private db: AngularFirestore) { }
  getClasses()
  {
   return this.db.collection('classes').snapshotChanges();
  } 
  // addStudent(classe: Classe)
  // {
  //   return this.db.collection('classes').doc(classe.id).update(classe);
  // }
  getClasse(nomClasse: string)
  {
    return this.db.collection('classes', classe => classe.where('nom','==',nomClasse)).snapshotChanges();
  }
  getStudents()
  {
    return this.db.collection('classes', eleves => eleves.where('eleves','==',true)).valueChanges();
  }
  updateClasse(classe: Classe)
  {
    return this.db.collection('classes').doc(classe.id).set(JSON.parse(JSON.stringify(classe)));
  }
  addClasse(classe: Classe)
  {
    return this.db.collection('classes').add(JSON.parse(JSON.stringify(classe)));
  }
  getClasseViaId(idClasse: string)
  {
    return this.db.doc(`classes/${idClasse}`).valueChanges({idKey: 'id'});
  }

  getSpecificClasses(nomClasse: string)
  {
    return this.db.collection('classes',maClasse => maClasse.where('nom','!=',nomClasse)).snapshotChanges();
  }

  /*
  //get id from firestore
    let id = this.db.createId();

    this.student = {
      id:id,
      name:'name',
      description:'description'
    }

    this.db.collection('posts').doc(id).set(this.post).then();
  */
  // updateClasse(classe: any)
  // {
  //   return this.db.collection('classes',data => data.where('nom','==',classe.nom)).
  // }
}
