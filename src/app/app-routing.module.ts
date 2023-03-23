import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { SurveyComponent } from './survey/survey.component';
import { TableComponent } from './table/table.component';

const routes: Routes = [
  { path: 'form', component: FormComponent },
  { path: 'survey', component: SurveyComponent },
  { path:'table',component: TableComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
