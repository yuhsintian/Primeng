import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api/api.service';

//定義物件類別
interface purchase {
  user: string;
  id: string;
  company: string;
  department: string;
}

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent {
  purchase: purchase[] = [];
  edit: boolean = false;
  visible: boolean = false;
  addData: boolean = false;
  form: FormGroup;

  constructor(private HttpApi: ApiService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      //必填
      user: ['', [Validators.required]],
      id: ['', [Validators.required]],
      company: ['', [Validators.required]],
      department: ['', [Validators.required]],
      item: ['', [Validators.required]],
      prquantity: ['', [Validators.required]],
      price: ['', [Validators.required]],
      create: ['', [Validators.required]]
    });

  }

  apiData!: ApiService[];

  //C
  post(): void {
    // 使用雙向繫結將值帶入body
    let purchase = {
      // 另title(要post的欄位) = 表單控制元件'title'的值
      user: this.data['user'].value,
      id: this.data['id'].value,
      company: this.data['company'].value,
      department: this.data['department'].value,
      item: this.data['item'].value,
      prquantity: this.data['prquantity'].value,
      price: this.data['price'].value,
      create: this.data['create'].value,
    }
    // 請求post api
    this.HttpApi.postRequest(purchase)
      .subscribe(request => {
        console.log(request)
      })
    Swal.fire({
      icon: 'success',
      title: '儲存完畢',
    })
    this.purchase.push(purchase);
  }


  id: any;
  ngOnInit(): void {
    // 擷取特定路徑的路由參數
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    this.getOne(this.id);

    this.purchase = [
      { user: 'pen', id: 'P-1', company: '這是筆', department: '業務部' },
      { user: 'apple', id: 'P-2', company: '這是蘋果', department: '技術部' },
    ];
  }

  data: any = [{
    user: ['', [Validators.required]],
    id: ['', [Validators.required]],
    company: ['', [Validators.required]],
    department: ['', [Validators.required]],
    item: ['', [Validators.required]],
    prquantity: ['', [Validators.required]],
    price: ['', [Validators.required]]
  },];

  add(): void {
    const newData = {
      user: "",
      id: '',
      company: '',
      department: '',
      item: '',
      prquantity: '0',
      price: '0'
    };
    this.addData = false; //addDate的dialog
    Swal.fire({
      icon: 'success',
      title: '儲存完畢',
    })
    this.purchase.push(newData);
    // this.data = newData;
    // console.log("data.user" + this.data)
    // console.log("purchase" + JSON.stringify(newData))
  }

  //R
  getOne(id: any): void {
    this.HttpApi.getOneRequest(id)
      .subscribe(request => {
        console.log(request)
        this.form.patchValue(request);
      })
  }

  //showDialog（U
  editDialog(purchase: any): void {
    this.data = purchase;
    console.log("data.id" + this.data.user)
    this.visible = true;
    console.log("purchase" + JSON.stringify(purchase))
  }

  patch(): void {
    let id = this.form.controls['id'].value
    let body = {
      title: this.form.controls['title'].value,
      body: this.form.controls['body'].value,
      userId: this.form.controls['userId'].value
    }
    this.HttpApi.patchRequest(id, body)
      .subscribe(request => {
        console.log(request)
      })
  }

  //D
  delete(selectedData: any) {
    const index = this.purchase.indexOf(selectedData);
    if (index > -1) {
      this.purchase.splice(index, 1);
      Swal.fire({
        title: 'Are you sure?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            '刪除成功'
          )
        }
      })
    }

  }

  confirm(): void {
    this.visible = false;
    this.addData = false;
    Swal.fire({
      icon: 'success',
      title: '儲存完畢',
    })
  }

  cancel(): void {
    this.visible = false;
    this.addData = false;
  }

}
