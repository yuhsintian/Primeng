import { NgModule } from '@angular/core';
import { Component } from '@angular/core';
import { RadioButtonModule } from 'primeng/radiobutton';
import { PasswordModule } from 'primeng/password';

@NgModule({
  imports: [
      RadioButtonModule,
      PasswordModule
  ],
  declarations: [],
  bootstrap: [],
})
export class AppModule { }

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent {
  selectedValues: string[] = [];
  ingredient!: string;
  value!: string;

  lang = [
    { name: "台灣" },
    { name: "中國大陸" },
    { name: "日本" },
    { name: "韓國" },
    { name: "美國" },
  ];
  lang2 = [
    { name: "學生" },
    { name: "服務業" },
    { name: "餐飲業" },
    { name: "工程師" },
  ];



}
