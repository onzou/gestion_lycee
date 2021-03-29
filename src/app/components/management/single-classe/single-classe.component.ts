import { ToastrService } from 'ngx-toastr';
import { Classe } from './../../../models/classe.model';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from './../../../services/student.service';
import { ClasseService } from './../../../services/classe.service';
import { Component, OnInit } from '@angular/core';
interface bulletin
{
  prenom: string,
  nom: string,
  redoubles: number,
  moy: number,
  rang: number,
  totalMoy: number,
  notes: [
    {
      matiere: string,
      noteDevoir: number,
      noteCompo: number,
      coeff: 0
    }
  ]

}
@Component({
  selector: 'app-single-classe',
  templateUrl: './single-classe.component.html',
  styleUrls: ['./single-classe.component.css']
})
export class SingleClasseComponent implements OnInit 
{
  loading: boolean = true;
  test = false;
  isLoadingOne = false;
  students: any;
  classe: Classe;
  averages: any[];
  classement: any[] = []; 
  reportCards: bulletin[] = [];
  isVisibleTop: boolean;
  constructor(private serviceClasse: ClasseService,
              private activeRoute: ActivatedRoute,
              private serviceStudent: StudentService,
              private toastr: ToastrService) { }

  ngOnInit(): void 
  {
    const id = this.activeRoute.snapshot.paramMap.get('id');
    const nomClasse = this.activeRoute.snapshot.paramMap.get('nom');
    this.getClasse(id);
    this.getStudents(nomClasse);
  }
  private getClasse(idClasse: string)
  {
    this.serviceClasse.getClasseViaId(idClasse)
        .subscribe((data:any)=>
        {
          this.classe = data;
        },(error)=> {});
  }
  private getStudents(nomClasse: string)
  {
    this.serviceStudent.getStudentsFromClasse(nomClasse) //FromClasse nomClasse
        .subscribe((response:any)=>
        {
          this.students = response.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          }); 
          if(this.students)
          {
            this.loading = false;
            this.mesBulletinsNote(this.students);
          }
        },(error)=>{});
  }
  calculcaleAvg(notes: any[])
  {
    let sumCoeff = this.sommeCoeff(notes);
    console.log(sumCoeff);
    this.averages = this.calculateAverages(notes);
    console.log(this.averages);
    let sum = 0;
    this.averages.forEach(avg => { sum += avg; });
    return sum/sumCoeff;
  }
  getTotal(notes: any[])
  {
    let sum = 0;
    let tab = this.calculateAverages(notes);
    tab.forEach(item => 
    {
      sum += item
    });
    return sum;
  }
  private calculateAverages(notes: any[])
  {
    let tab: any[] = [];
    notes.forEach(note => 
    {
      let noteMoyenne = ( Number(note.noteDevoir) + Number(note.noteCompo) ) / 2;
      tab.push(noteMoyenne * Number(note.coeff));
    });
    return tab;
  }
  private sommeCoeff(notes: any[]): number
  {
    let sum = 0;
    notes.forEach(note => {
      sum += Number(note.coeff);
    });
    return sum;
  }
  showModalTop(): void 
  {
    this.isVisibleTop = true;
  }
  handleOkTop(): void 
  {
    console.log('hello');
    this.isVisibleTop = false;
  }

  handleCancelTop(): void 
  {
    this.isVisibleTop = false;
  }

  mesBulletinsNote(students)
  {
    
    let mesEleves= new Array(...students);
    for(let i = 0; i< mesEleves.length; i++)
    {
      this.reportCards.push({
        prenom: mesEleves[i].prenom,
        nom: mesEleves[i].nom,
        rang: i,
        totalMoy: this.getTotal(mesEleves[i].notes),
        redoubles: mesEleves[i].redoubles,
        notes: mesEleves[i].notes,
        moy: this.calculcaleAvg(mesEleves[i].notes)
      }); 
    }
    this.reportCards.sort((a,b) => { return (a.moy - b.moy)});
    console.log(this.reportCards);

  }
  imprimerBulletins()
  {
    window.print();
  }
}