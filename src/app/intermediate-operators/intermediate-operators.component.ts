import { Component, OnInit } from '@angular/core';
import { OperatorService, Operators } from '../operator.service';

@Component({
  selector: 'app-intermediate-operators',
  templateUrl: './intermediate-operators.component.html',
  styleUrls: ['./intermediate-operators.component.scss']
})
export class IntermediateOperatorsComponent implements OnInit {
  operators: string[];
  constructor(protected operatorService: OperatorService) { }

  ngOnInit() {
    this.operators = this.operatorService.intermediateOperators();
  }

  executeOperation(operator: Operators) {
    switch (operator) {
      case Operators.Delay: { return this.operatorService.demoDelay(); }
      case Operators.DelayWhen: { return this.operatorService.demoDelayWhen(); }
      case Operators.Take: { return this.operatorService.demoTake(); }
      case Operators.TakeUntil: { return this.operatorService.demoTakeUntil(); }
      case Operators.TakeWhile: { return this.operatorService.demoTakeWhile(); }
      case Operators.Throw: { return this.operatorService.demoThrow(); }
      case Operators.Skip: { return this.operatorService.demoSkip(); }
      case Operators.SkipWhile: { return this.operatorService.demoSkipWhile(); }
      case Operators.SkipUntil: { return this.operatorService.demoSkipUntil(); }
      case Operators.Last: { return this.operatorService.demoLast(); }
      case Operators.Concat: { return this.operatorService.demoConcat(); }
    }
  }
}
