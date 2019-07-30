import { Component, OnInit } from '@angular/core';
import { Operators, OperatorService } from '../operator.service';

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
      case Operators.ConcatAll: { return this.operatorService.demoConcatAll(); }
      case Operators.ConcatMap: { return this.operatorService.demoConcatMap(); }
      case Operators.ConcatMapTo: { return this.operatorService.demoConcatMapTo(); }
      case Operators.Single: { return this.operatorService.demoSingle(); }
      case Operators.IgnoreElements: { return this.operatorService.demoIgnoreElements(); }
      case Operators.Sample: { return this.operatorService.demoSample(); }
      case Operators.Reduce: { return this.operatorService.demoReduce(); }
      case Operators.Scan: { return this.operatorService.demoScan(); }
      case Operators.GroupBy: { return this.operatorService.demoGroupBy(); }
      case Operators.Merge: { return this.operatorService.demoMerge(); }
      case Operators.MergeAll: { return this.operatorService.demoMergeAll(); }
      case Operators.MergeMap: { return this.operatorService.demoMergeMap(); }
      case Operators.Partition: { return this.operatorService.demoPartition(); }
    }
  }
}
