import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AffichageComponent } from './affichage/affichage.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { StatsDatesComponent } from './stats-dates/stats-dates.component';

const routes: Routes = [
  {path: 'StatsDate', component: StatsDatesComponent},
  //{path: 'home', component: HomeComponent},
  { path: '', component: AffichageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
