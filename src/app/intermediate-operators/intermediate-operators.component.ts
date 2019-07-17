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
      case Operators.Delay: {
        this.operatorService.demoDelay();
        return;
      }

      case Operators.DelayWhen: {
        this.operatorService.demoDelayWhen();
        return;
      }

      case Operators.Take: {
        this.operatorService.demoTake();
        return;
      }

      case Operators.TakeUntil: {
        this.operatorService.demoTakeUntil();
        return;
      }

      case Operators.TakeWhile: {
        this.operatorService.demoTakeWhile();
        return;
      }

      case Operators.Throw: {
        this.operatorService.demoThrow();
        return;
      }

      case Operators.Skip: {
        this.operatorService.demoSkip();
        return;
      }

      case Operators.SkipWhile: {
        this.operatorService.demoSkipWhile();
        return;
      }

      case Operators.SkipUntil: {
        this.operatorService.demoSkipUntil();
        return;
      }
    }
  }
}
