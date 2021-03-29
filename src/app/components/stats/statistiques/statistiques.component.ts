import { ToastrService } from 'ngx-toastr';
import { StudentService } from './../../../services/student.service';
import { Component, OnInit } from '@angular/core';
import { ApexNonAxisChartSeries, ApexPlotOptions, ApexChart } from "ng-apexcharts";

export type ChartOptions = 
{
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
};
@Component({
  selector: 'app-statistiques',
  templateUrl: './statistiques.component.html',
  styleUrls: ['./statistiques.component.css']
})
export class StatistiquesComponent implements OnInit {
  public chartOptions2: Partial<ChartOptions>;
  students: any[] = [];
  isDataReady = false;
  constructor(private serviceStudent: StudentService, private toast: ToastrService) 
  {
    
  }

  ngOnInit(): void {
    this.getStudents();
  }
  public chartType: string = 'pie';
  public chartDatasets: Array<any>;
  public chartLabels: Array<any> = ['Garcons', 'Filles'];
  public chartColors: Array<any> = [
    {
      backgroundColor: ['#F7464A', '#46BFBD'],
      hoverBackgroundColor: ['#FFC870', '#616774'],
      borderWidth: 2,
    }
  ];
  public chartOptions: any = {
    responsive: true
  };
  public chartClicked(): void { }
  public chartHovered(): void { }

  private getStudents()
  {
    this.serviceStudent.getStudents()
        .subscribe((data)=>
        {
          this.students = data;
          this.loadData(this.getAgvsPercentage(this.students),this.getPercentages(this.students));
          this.isDataReady = true;          
        },(error)=>
        {
          this.toast.error("Erreur lors de la connexion à la base de donnée!","Erreur");
        });
  }
  private getPercentages(eleves: any[])
  {
    let males=0, females = 0;
    eleves.forEach(eleve => {
      if(eleve.sexe === 'F')
        females++;
      else if (eleve.sexe === 'M')
        males++;
    });
    return [males, females];
  }
  private getAgvsPercentage(eleves: any[])
  {
    let theseAverages = 0;
    eleves.forEach(eleve => 
    {
      if(this.getAvg(eleve.notes)>=10)
        theseAverages++;
    });
    return Math.round((theseAverages*100)/eleves.length);
  }
  private getAvg(notes: any[])
  {
    let sumCoeff = 0, sumMoyx = 0;
    notes.forEach(note => {
      sumCoeff += note.coeff;
      sumMoyx += ((Number(note.noteDevoir) + Number(note.noteCompo))/2)*note.coeff;
    });
    return sumMoyx/sumCoeff;
  }
  public loadData(percentageAvg, percentageMaleFemale)
  {
    this.chartOptions2 = {
      series: [percentageAvg],
      chart: {
        height: 350,
        type: "radialBar"
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: "85%"
          }
        }
      },
      labels: ["Eleve ayant la moyenne"]
    };
    this.chartDatasets= [
      { data: percentageMaleFemale, label: 'My First dataset' }
    ];
  }
}
