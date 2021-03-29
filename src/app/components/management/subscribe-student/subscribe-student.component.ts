import { NzModalService } from 'ng-zorro-antd/modal';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { StudentService } from './../../../services/student.service';
import { Student } from './../../../models/student.model';
import { Classe } from './../../../models/classe.model';
import { ClasseService } from './../../../services/classe.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-subscribe-student',
  templateUrl: './subscribe-student.component.html',
  styleUrls: ['./subscribe-student.component.css']
})
export class SubscribeStudentComponent implements OnInit 
{
  dateFormat:string = "dd/MM/yyyy";
  validateForm!: FormGroup;
  errorSubscription: boolean;
  classes: Classe[];
  classe: Classe;
  students: Student[];
  student: Student;
  matriculeUnicity: any = [];
  constructor(private fb: FormBuilder,
              private serviceClasse: ClasseService,
              private serviceStudent: StudentService,
              private router: Router,
              private toastr: ToastrService,
              private modal: NzModalService) {}
  ngOnInit(): void 
  {
    this.initForm();
    this.getClasses(); 
    this.getStudents();
  }
  submitForm(): void 
  {
    for (const i in this.validateForm.controls) 
    {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if(this.validateForm.valid == true)
    {
      this.student = this.validateForm.value;
      this.student.notes = environment.NOTES as any;
      this.checkStudentMatriculeUnicity();   
    }
  }
  checkStudentMatriculeUnicity()
  {
    this.students = this.students.filter((filtre)=>{ return (filtre.matricule === this.student.matricule)});
    if(this.students.length === 0)
      this.subscribeStudent(this.student);
    else 
      this.errorMatriculeUnicity();
  }

  private initForm()
  {
    this.validateForm = this.fb.group({
      prenom: [null, [Validators.required]],
      nom: [null, [Validators.required]],
      dateNaissance: [null, [Validators.required]],
      lieuNaissance: [null, [Validators.required]],
      telephone: [null, [Validators.required,Validators.pattern(/^[0-9]{9,14}$/)],], //
      redoubles: [null, [Validators.required,Validators.pattern(/^[0-9]$/)]], //
      adresse: [null, [Validators.required]],
      classe: [null, [Validators.required]],
      matricule: [null,[Validators.required,Validators.pattern(/^[0-9]{1,}$/)]],
      sexe: [null,[Validators.required]]
    });
  }
  private getClasses()
  {
    this.serviceClasse.getClasses()
        .subscribe((response:any)=>
        {          
          this.classes =  response.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });          
        },(error)=>
        {
          console.log(error);
        });
  }
  private subscribeStudent(student: Student)
  {
    this.serviceStudent.addStudent(student)
        .then((data: any)=>
        {
          let maClasse = this.classes.filter((filtre)=> { return (filtre.nom == this.student.classe)});
          let uneClasse: Classe  = maClasse[0];
          uneClasse.eleves.push(this.student.matricule);
          this.serviceClasse.updateClasse(uneClasse)
            .then((response: any)=>
            {
              this.router.navigate(['/students/liste']);
              this.toastr.success("Inscription réussie","Succès");
            }).catch((error)=>
            {
              this.toastr.error("Erreur lors de l'inscription de l'elève dans la classe indiquée!","Erreur");
            });
          
        }).catch((error)=>
        {
          this.toastr.error("Erreur lors de l'inscription de l'elève!","Erreur");
        }); 
  }
  private errorMatriculeUnicity(): void 
  {
    this.modal.error({
      nzTitle: "Erreur unicité matricule",
      nzContent: "Ce matricule est déjà attribué à un autre! Chaque élève a un matricule qui lui est unique."
    });
  }
  private getStudents()
  {
    this.serviceStudent.getStudents()
        .subscribe((data:any)=>
        {
          this.students = data;
        },(error)=>
        {
          this.toastr.error("Une erreur est survenue lors de la connexion à la base de donnée!","Erreur de connexion");
        });
  }
}