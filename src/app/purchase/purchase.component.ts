import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api/api.service';
import { LazyLoadEvent } from 'primeng/api';

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
  visible: boolean = false;
  addData: boolean = false;
  form: FormGroup;
  id:any;

  constructor(private HttpApi: ApiService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      //必填
      purchase_user: ['', [Validators.required]],
      purchase_code: ['', ],
      purchase_company: ['', [Validators.required]],
      purchase_department: ['', [Validators.required]],
      purchase_item: ['', [Validators.required]],
      purchase_prquantity: ['', [Validators.required]],
      purchase_price: ['', [Validators.required]],
      created_by: ['', [Validators.required]]
    });

  }

  apiData!: ApiService[];

  // 取得api service定義API
  getAll() {
    this.HttpApi.getAllRequest(1).subscribe(request => {
      this.apiData = request.body.purchase;
      console.log(this.apiData);
    });
  }

  //C
  post(): void {
    // 使用雙向繫結將值帶入body
    let body = {
      // 另title(要post的欄位) = 表單控制元件'title'的值
      purchase_user: this.form.controls['purchase_user'].value,
      //purchase_id: this.form.controls['purchase_id'].value,
      purchase_company: this.form.controls['purchase_company'].value,
      purchase_department: this.form.controls['purchase_department'].value,
      purchase_item: this.form.controls['purchase_item'].value,
      purchase_prquantity: Number(this.form.controls['purchase_prquantity'].value),
      purchase_price: Number(this.form.controls['purchase_price'].value),
      created_by: this.form.controls['created_by'].value,
    }
    console.log(body)
    // 請求post api
    this.HttpApi.postRequest(body)
      .subscribe(request => {
        console.log(request)
      })
    Swal.fire({
      icon: 'success',
      title: '儲存完畢',
    })
    this.getAll()
    this.addData=false;
  }



  ngOnInit(): void {
    // this.getAll()
  }

  // 懶加載
  loadPostsLazy(event: LazyLoadEvent) {
    const page = (event.first! / event.rows!) + 1;
    this.HttpApi.getAllRequest(page).subscribe(request => {
      this.apiData = request.body.purchase;
      console.log(this.apiData);
    });
  }

  // data: any = [{
  //   purchase_user: ['', [Validators.required]],
  //   //purchase_id: ['', [Validators.required]],
  //   purchase_company: ['', [Validators.required]],
  //   purchase_department: ['', [Validators.required]],
  //   purchase_item: ['', [Validators.required]],
  //   purchase_prquantity: ['', [Validators.required]],
  //   purchase_price: ['', [Validators.required]],
  //   created_by:['', [Validators.required]]
  // },];


  newDialog(): void {
    this.form.reset()
    this.addData = true;
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
    // console.log("this.data.id" + purchase.purchase_user)
    this.visible = true;
    console.log("this.data" + JSON.stringify(purchase))
    this.form.patchValue(purchase)
    this.id = purchase.purchase_id
    console.log(this.id)
  }

  patch(id:any): void {
    let body = {
      purchase_user: this.form.get('purchase_user')?.value,
      //purchase_id: this.form.controls['purchase_id'].value,
      purchase_company: this.form.get('purchase_company')?.value,
      purchase_department: this.form.get('purchase_department')?.value,
      purchase_item: this.form.get('purchase_item')?.value,
      purchase_prquantity: this.form.get('purchase_prquantity')?.value,
      purchase_price: this.form.get('purchase_price')?.value,
      created_by: this.form.get('created_by')?.value,
    }
    this.HttpApi.patchRequest(id, body)
      .subscribe(request => {
        console.log(request)
      })
    this.visible = false;
    this.addData = false;
    this.getAll()
    Swal.fire({
      icon: 'success',
      title: '儲存完畢',
    })
  }

  //D
  delete(id: any) {
    // const index = this.data.indexOf(selectedData);
    // if (index > -1) {
    // this.data.splice(index, 1);
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.HttpApi.deleteRequest(id)
          .subscribe(request => {
            console.log(request)
            Swal.fire(
              '刪除成功'
            )
          }
          )
          this.getAll()
      }
    })
  }

  // confirm(): void {
  //   this.visible = false;
  //   this.addData = false;
  //   Swal.fire({
  //     icon: 'success',
  //     title: '儲存完畢',
  //   })
  // }

  cancel(): void {
    this.visible = false;
    this.addData = false;
  }

}
