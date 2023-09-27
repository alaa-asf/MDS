import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'datom-spinner',
  templateUrl: './datom-spinner.component.html',
  styleUrls: ['./datom-spinner.component.scss']
})
export class DatomSpinnerComponent implements OnInit {
ngOnInit(): void {}
@Input() width:string = '30px'


}
