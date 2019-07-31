import { Component, OnInit } from '@angular/core';
import { OperatorService, Operators } from '../operator.service';

@Component({
  selector: 'app-advance-operators',
  templateUrl: './advance-operators.component.html',
  styleUrls: ['./advance-operators.component.scss']
})
export class AdvanceOperatorsComponent implements OnInit {
  operators = [];
  constructor(private operatorService: OperatorService) { }

  ngOnInit() {
    this.operators = this.operatorService.advanceOperators();
  }

  executeOperation(operator: Operators) {
    switch (operator) {
      case Operators.Zip: { return this.operatorService.demoZip(); }
      case Operators.CombineLatest: { return this.operatorService.demoCombineLatest(); }
      case Operators.ForkJoin: { return; }
      case Operators.Publish: { return; }
      case Operators.Share: { return; }
      case Operators.Multicast: { return; }
      case Operators.Race: { return; }
      case Operators.Retry: { return; }
      case Operators.RetryWhen: { return; }
      case Operators.WithLatestFrom: { return; }
      case Operators.Let: { return; }
      case Operators.Debounce: { return; }
    }
  }

}
