import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { SurveyComponent } from './survey/survey.component';
import { TableComponent } from './table/table.component';
import { CrudComponent } from './crud/crud.component';
import { EditCrudComponent } from './crud/edit-crud/edit-crud.component';
import { PurchaseComponent } from './purchase/purchase.component';


const routes: Routes = [
  { path: 'form', component: FormComponent },
  { path: 'survey', component: SurveyComponent },
  { path:'table',component: TableComponent },
  { path:'crud',component: CrudComponent },
  { path:'purchase',component: PurchaseComponent },
  { path: 'crud/edit/:id', component: EditCrudComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
