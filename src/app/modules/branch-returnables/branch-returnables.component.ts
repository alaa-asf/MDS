import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-branch-returnables',
  templateUrl: './branch-returnables.component.html',
  styleUrls: ['./branch-returnables.component.scss']
})
export class BranchReturnablesComponent implements OnInit {
  products: any = []
  constructor() { }

  ngOnInit() {
  }

}
