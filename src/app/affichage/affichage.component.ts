import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { GlobalDataFrance, GlobalDataFranceParDepartement, keyable } from '../models/models';
import { GlobalDataFranceService } from '../services/global-data-france.service';

@Component({
  selector: 'app-affichage',
  templateUrl: './affichage.component.html',
  styleUrls: ['./affichage.component.css']
})
export class AffichageComponent implements OnInit {

  constructor(private gdfs: GlobalDataFranceService, private calendar: NgbCalendar) {
    const today = calendar.getToday();
    console.log('constructor', today);
    this.model = today;
  }

  DateDuJours = formatDate(new Date(), 'yyyy-MM-dd', 'en');
  model: NgbDateStruct;
  date: { year: number, month: number, day: number };

  DepartementSelected = 'Seine-Saint-Denis';
  ListeDepartement = [
  'Ain',
  'Aisne',
  'Allier',
  'Alpes-de-Haute-Provence',
  'Hautes-Alpes',
  'Alpes-Maritimes',
  'Ardèche',
  'Ardennes',
  'Ariège',
  'Aube',
  'Aude',
  'Aveyron',
  'Bouches-du-Rhône',
  'Calvados',
  'Cantal',
  'Charente',
  'Charente-Maritime',
  'Cher',
  'Corrèze',
  'Corse-du-Sud',
  'Haute-Corse',
  'Côte-d\'Or',
  'Côtes d\'Armor',
  'Creuse',
  'Dordogne',
  'Doubs',
  'Drôme',
  'Eure',
  'Eure-et-Loir',
  'Finistère',
  'Gard',
  'Haute-Garonne',
  'Gers',
  'Gironde',
  'Hérault',
  'Ille-et-Vilaine',
  'Indre',
  'Indre-et-Loire',
  'Isère',
  'Jura',
  'Landes',
  'Loir-et-Cher',
  'Loire',
  'Haute-Loire',
  'Loire-Atlantique',
  'Loiret',
  'Lot',
  'Lot-et-Garonne',
  'Lozère',
  'Maine-et-Loire',
  'Manche',
  'Marne',
  'Haute-Marne',
  'Mayenne',
  'Meurthe-et-Moselle',
  'Meuse',
  'Morbihan',
  'Moselle',
  'Nièvre',
  'Nord',
  'Oise',
  'Orne',
  'Pas-de-Calais',
  'Puy-de-Dôme',
  'Pyrénées-Atlantiques',
  'Hautes-Pyrénées',
  'Pyrénées-Orientales',
  'Bas-Rhin',
  'Haut-Rhin',
  'Rhône',
  'Haute-Saône',
  'Saône-et-Loire',
  'Sarthe',
  'Savoie',
  'Haute-Savoie',
  'Paris',
  'Yvelines',
  'Deux-Sèvres',
  'Somme',
  'Tarn',
  'Tarn-et-Garonne',
  'Var',
  'Vaucluse',
  'Vandée',
  'Vienne',
  'Haute-Vienne',
  'Vosges',
  'Yonne',
  'Territoire de Belfort',
  'Essonne',
  'Hauts-de-Seine',
  'Seine-Saint-Denis',
  'Val-de-Marne',
  'Val-D\'Oise',
  'Guadeloupe',
  'Martinique',
  'Guyane',
  'La Réunion',
  'Mayotte',
  ];
  DonneeGlobalDuDepartementsChoisie: GlobalDataFranceParDepartement = {
    code: '',
    date: 0,
    deces: 0,
    gueris: 0,
    hospitalises: 0,
    nom: '',
    nouvellesHospitalisations: 0,
    nouvellesReanimations: 0,
    reanimation: 0,
    source: {
      nom: ''
    },
    sourceType: ''
  };

  datechoisie;
  DonneeGlobalDuJoursChoisie: GlobalDataFrance = {
    casConfirmes: 0,
    casConfirmesEhpad: 0,
    code: ' ',
    date: 0,
    deces: 0,
    decesEhpad: 0,
    gueris: 0,
    hospitalises: 0,
    nom: ' ',
    nouvellesHospitalisations: 0,
    nouvellesReanimations: 0,
    reanimation: 0,
    source: {
      nom: ' '
    }
  };
  DonneeGlobalDuJoursVide = this.DonneeGlobalDuJoursChoisie;

  tmp: keyable;
  ngOnInit(): void {
    //console.log(this.DateDuJours);
    this.getDonneeByDate(this.DateDuJours);
  }

  // tslint:disable-next-line: typedef
  getDonneeByDate(dateChoisie: string) {

    if (this.DepartementSelected.length !== 0){
      this.getDonneeByDepartment(this.DepartementSelected);
    }

    console.log('dateChoisie', dateChoisie);
    this.gdfs.getInfoGlobalByDate(dateChoisie)
      .subscribe(donnee => {
        this.tmp = donnee;
        console.log('Data Du Jours ', this.tmp);
        if (Object.keys(this.tmp.allFranceDataByDate).length > 0) {
          Object.keys(this.tmp.allFranceDataByDate).forEach(element => {
            if (this.tmp.allFranceDataByDate[element].source.nom === 'Ministère des Solidarités et de la Santé'
              || (this.tmp.allFranceDataByDate[element].source.nom) === 'Ministère des Solidarités et de la Santé') {
              this.DonneeGlobalDuJoursChoisie = this.tmp.allFranceDataByDate[element];
              console.log(this.DonneeGlobalDuJoursChoisie);
            }
          });
        }
        else {
          this.DonneeGlobalDuJoursChoisie = this.DonneeGlobalDuJoursVide;
        }
      });
  }

  // tslint:disable-next-line: typedef
  getDonneeByDepartment(departementChoisis: string){
    console.log('departements: ', departementChoisis);
    this.gdfs.getInfoGlobalByDepartment(departementChoisis)
    .subscribe(donnee => {
      this.tmp = donnee;
      console.log('Donnees ', this.tmp);
      Object.keys(this.tmp.allDataByDepartement).forEach(element => {
        if ((this.tmp.allDataByDepartement[element].source.nom === 'Santé publique France Data')
          && this.tmp.allDataByDepartement[element].date === this.DateDuJours) {
          this.DonneeGlobalDuDepartementsChoisie = this.tmp.allDataByDepartement[element];
          console.log(this.DonneeGlobalDuDepartementsChoisie);
        }
      });
      console.log(donnee);
    });
  }
  // tslint:disable-next-line: typedef
  datechoisieFrom() {
    console.log(this.model);
    let jours;
    let mois;
    if (Number(this.model.day) < 10) {
      jours = '0' + this.model.day;
    }
    else {
      jours = this.model.day;
    }

    if (Number(this.model.month) < 10) {
      mois = '0' + this.model.month;
    }
    else {
      mois = this.model.month;
    }

    const dateclicke = this.model.year + '-' + mois + '-' + jours;
    this.datechoisie = dateclicke;
    this.DateDuJours = this.datechoisie;
    console.log(dateclicke);
    this.getDonneeByDate(dateclicke);
  }



}

