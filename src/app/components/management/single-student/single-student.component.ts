import { ClasseService } from './../../../services/classe.service';
import { ToastrService } from 'ngx-toastr';
import { StudentService } from './../../../services/student.service';
import { Student } from './../../../models/student.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Classe } from 'src/app/models/classe.model';

@Component({
  selector: 'app-single-student',
  templateUrl: './single-student.component.html',
  styleUrls: ['./single-student.component.css']
})

export class SingleStudentComponent implements OnInit 
{
  student: any;
  classe: Classe;
  otherClasses: Classe[];
  notes: [];
  validateForm!: FormGroup;
  wannaModifyCredentials = true;
  isTransferModalVisible = false;
  isConfirmLoading = false;
  dateFormat = "dd/MM/yyyy";

  constructor(private activeRouter: ActivatedRoute,
              private serviceStudent: StudentService,
              private serviceClasse: ClasseService,
              private toastr: ToastrService,
              private router: Router,
              private fb: FormBuilder,
              private modal: NzModalService,
              ) {}

  ngOnInit(): void 
  {
    const id = this.activeRouter.snapshot.paramMap.get('id');
    const classeEleve = this.activeRouter.snapshot.paramMap.get('classe');
    this.getStudent(id);
    this.getClasse(classeEleve); 
    this.getOtherClasses(classeEleve);
    this.initForm();
  }

  submitForm(): void 
  {
    for (const i in this.validateForm.controls) 
    {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }
  getStudent(id: string)
  {
    this.serviceStudent.getStudent(id)
      .subscribe((data:any)=>
      {
        this.student = data; 
        this.notes = this.student.notes; 
        this.student.id = id;
        console.log(this.student);
      },(error)=>
      {
        console.error("Error while getting the student!"+error);
      });
  }
  deleteStudent()
  {
    this.student.id = this.activeRouter.snapshot.paramMap.get('id');
    this.deleteStudentInClasse(this.classe);
    this.serviceStudent.deleteStudent(this.student.id)
        .then(()=>
        {
          this.router.navigate(['students/liste']);
          this.toastr.success("Suppression réussie","Succès");     
        },(error)=>
        {
          this.toastr.error("Une erreur est survenue lors de la suppression", "Echec");
          console.error();
        });
  }
  initForm()
  {
    this.validateForm = this.fb.group({
      note: [null, [Validators.required]],
      matiere: [null, [Validators.required]],
      type: [null,[Validators.required]]
    });
  }

  modifyAndUpdateCredentials()
  {
    if(!this.wannaModifyCredentials)
    {
      this.submitNotes();
    }
    this.wannaModifyCredentials = !this.wannaModifyCredentials;
  }
  submitNotes()
  {
    this.serviceStudent.updateStudent(this.student)
        .then((response:any)=>
        {
          this.toastr.success("Enregistrement réussi!","Succès")
        }).catch((error)=>
        {
          this.toastr.error("Echec lors de l'enregistrement\nVeuillez vérifier votre connexion!","Echec")
        });
  }

  showDeleteConfirm(): void 
  {
    this.modal.confirm(
    {
      nzTitle: 'Etes-vous sur de vouloir supprimer cet eleve?',
      nzContent: '<b style="color: red;">La suppression est irréversible</b>',
      nzOkText: 'Oui',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.deleteStudent(),
      nzCancelText: 'Non',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  private deleteStudentInClasse(classeCible: Classe)
  {
    let maClasse: Classe = classeCible[0];
    console.log(maClasse);
    maClasse.eleves = maClasse.eleves.filter((filtre)=>{ return (filtre!=this.student.matricule)});
    this.serviceClasse.updateClasse(maClasse)
        .then((response:any)=>{})
        .catch((error)=>
        {
          this.toastr.error("Erreur de connexion","Erreur");  
        });
  }

  private getClasse(nomClasse: string)
  {
    this.serviceClasse.getClasse(nomClasse)
        .subscribe((data:any)=>
        {
          this.classe =  data.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });  
        },(error)=>
        {
          this.toastr.error("Erreur de la suppression","Echec");
        });
  }
  private getOtherClasses(nomClasse: string)
  {
    this.serviceClasse.getSpecificClasses(nomClasse)
        .subscribe((data:any)=>
        {
          this.otherClasses =  data.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });  
        },(error)=>
        {
          this.toastr.error("Erreur de la suppression","Echec");
        });
  }
  showModal(): void 
  {
    this.isTransferModalVisible = true;
  }
  handleOk(formTransfer:any): void 
  {
    this.isConfirmLoading = true;
    let classeDestinataire = this.otherClasses.filter((filtre)=> { return (filtre.nom == formTransfer.nomClasseDestination)})[0];
    classeDestinataire.eleves.push(this.student.matricule);
    this.deleteStudentInClasse(this.classe);
    this.student.classe = classeDestinataire.nom;
    this.submitNotes();
    this.serviceClasse.updateClasse(classeDestinataire)
        .then(()=>
        {
          this.isTransferModalVisible = false;
          this.isConfirmLoading = false;
          this.toastr.success("Transfert réussie!","Succès")
        }).catch((error)=>
        {
          this.toastr.error("Une erreur est survenue!","Echec");
        })
    // setTimeout(() => {
      
    // }, 3000);
  }

  handleCancel(): void 
  {
    this.isTransferModalVisible = false;
  }
}
