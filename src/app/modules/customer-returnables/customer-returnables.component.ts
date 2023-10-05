import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-returnables',
  templateUrl: './customer-returnables.component.html',
  styleUrls: ['./customer-returnables.component.scss']
})
export class CustomerReturnablesComponent implements OnInit {
  products:any=[]
  constructor() { }

  ngOnInit() {
  }

}
