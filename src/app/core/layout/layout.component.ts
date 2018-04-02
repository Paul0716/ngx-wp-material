import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  /**
   * 控制側邊欄開合
   *
   * @memberof LayoutComponent
   */
  public isOpen = false;

  constructor() { }

  ngOnInit() {
  }

}
