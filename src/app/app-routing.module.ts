import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditTeacherComponent } from './component/edit-teacher/edit-teacher.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfilComponent } from './profil/profil.component';
import { AllDataComponent } from './student/all-data/all-data.component';

const routes: Routes = [
  {
    path:'',
    component:DashboardComponent
  },
  {
    path:'dashboard',
    component:DashboardComponent,
  },
  {
    path:'profil',
    component:ProfilComponent,
  },
  {
    path:'all-data',
    component:AllDataComponent
  },
  {
    path:'edit-teacher',
    component:EditTeacherComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
