import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agent-returnables',
  templateUrl: './agent-returnables.component.html',
  styleUrls: ['./agent-returnables.component.scss']
})
export class AgentReturnablesComponent implements OnInit {
  products: any = []
  constructor() { }

  ngOnInit() {
  }

}
