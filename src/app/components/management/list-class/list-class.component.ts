import { ToastrService } from 'ngx-toastr';
import { Classe } from './../../../models/classe.model';
import { ClasseService } from './../../../services/classe.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-list-class',
  templateUrl: './list-class.component.html',
  styleUrls: ['./list-class.component.css']
})
export class ListClassComponent implements OnInit {
  classes = [];
  nouvelleClasse: Classe= new Classe();
  isVisibleTop = false;
  isVisibleMiddle = false;
  constructor(private service: ClasseService,
              private toastr: ToastrService) { }
  ngOnInit(): void 
  {
    this.getClasses();
  }
  getClasses()
  {
    this.service.getClasses()
        .subscribe((response:any)=>
        {
          this.classes = response.map(a => 
          {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });          
        },(error)=>
        {
          console.error("Bonjour");
        });
  }

  addClasse()
  {
    this.nouvelleClasse.eleves = [];
    this.service.addClasse(this.nouvelleClasse)
        .then((response:any)=>
        {
          this.toastr.success("Création réussie!","Succès");
        }).catch((error)=>
        {
          this.toastr.error("Echec lors de la création de la classe","Erreur");
        });
  }
  handleOkMiddle(): void {
    this.addClasse();
    this.isVisibleMiddle = false;
  }

  handleCancelMiddle(): void {
    this.isVisibleMiddle = false;
  }
  showModalMiddle(): void {
    this.isVisibleMiddle = true;
  }
}
