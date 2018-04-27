import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-cofirm',
  templateUrl: './cofirm.component.html',
  styleUrls: ['./cofirm.component.scss']
})
export class CofirmComponent implements OnInit {

  title: string;

  content: string;

  constructor(
    private _dialogRef: MatDialogRef<CofirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.title = data.title;
    this.content = data.content;
  }

  ngOnInit() {
  }

  /**
   * 確認按鈕功能
   *
   * @memberof CofirmComponent
   */
  confirm() {
    this._dialogRef.close({
      id: this.data.id
    });
  }

  /**
   * 關閉視窗按鈕功能
   *
   * @memberof CofirmComponent
   */
  close() {
    this._dialogRef.close();
  }



}
