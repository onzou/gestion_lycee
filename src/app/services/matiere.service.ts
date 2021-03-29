import { Matiere } from './../models/matiere.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MatiereService 
{
  constructor(private db: AngularFirestore) { }

  getMatieres()
  {
    return this.db.collection('matieres').snapshotChanges();
  }
  addMatiere(matiere: Matiere)
  {

  }
  deleteMatiere(idMatiere: string)
  {

  }
  updateMatiere(matiere: Matiere)
  {

  }
}
