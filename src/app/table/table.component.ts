import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { ApiService } from "../api/api.service";
import { LazyLoadEvent } from 'primeng/api';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

//定義物件類別
interface student {
  position: number;
  name: string;
  height: number;
  weight: number;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  student: student[] = [];
  edit: boolean = false;
  visible: boolean = false;
  test: string = "123";
  post_form: FormGroup;

  // 建構類別
  constructor(private HttpApi: ApiService,
    private fb: FormBuilder) {
    this.post_form = this.fb.group({
      //必填
      userId: ['', [Validators.required]],
      title: [''],
      body: [''],
    });
  }

  // 宣告儲存api資料之陣列
  apiData!: ApiService[];
  postData!: ApiService[];

  ngOnInit(): void {

    this.post()
    this.getAll()
    this.student = [
      { position: 1, name: 'Rose', height: 178, weight: 43 },
      { position: 2, name: 'Benny', height: 156, weight: 90 },
      { position: 3, name: 'Sam', height: 167, weight: 55 },
      { position: 4, name: 'Peggy', height: 183, weight: 54 },
      { position: 5, name: 'Claire', height: 163, weight: 73 },
      { position: 6, name: 'Jason', height: 180, weight: 67 },
      { position: 7, name: 'Alex', height: 195, weight: 70 },
      { position: 8, name: 'Kimberly', height: 159, weight: 53 },
      { position: 9, name: 'Millie', height: 165, weight: 63 },
      { position: 10, name: 'Poll', height: 182, weight: 67 },
      { position: 11, name: 'Grace', height: 173, weight: 61 },
      { position: 12, name: 'Veronica', height: 169, weight: 56 },
      { position: 13, name: 'Wendy', height: 150, weight: 45 },
      { position: 14, name: 'Rita', height: 158, weight: 50 },
    ]
  }

  data: any = [{
    position: '',
    name: '',
    height: '',
    weight: ''
  }]

  post(): void {
    let body = {
      title: 1,
      body: 1,
      userId: 1
    }
    this.HttpApi.postRequest(body)
      .subscribe(request => {
        this.postData = request
        console.log(this.postData)
      })
  }
  getAll() {
    //   this.HttpApi.getAllRequest().subscribe(request => {
    //     this.apiData = request;
    //     console.log(this.apiData);
    //   });
  }

  loadPostsLazy(event: LazyLoadEvent) {
    const page = (event.first! / event.rows!) + 1;
    this.HttpApi.getAllRequest(page).subscribe(request => {
      this.apiData = request;
      console.log(this.apiData);
    });
  }

  showDialog(student: any): void {
    this.data = student;
    console.log("data.position" + this.data.position)
    this.visible = true;
    console.log("student" + JSON.stringify(student))
  }

  confirm(): void {
    this.visible = false;
    Swal.fire({
      icon: 'success',
      title: '儲存完畢',
    })
  }

}
