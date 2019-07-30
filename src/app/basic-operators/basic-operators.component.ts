import { Component, OnInit } from '@angular/core';
import { OperatorService, Operators } from '../operator.service';


@Component({
  selector: 'app-basic-operators',
  templateUrl: './basic-operators.component.html',
  styleUrls: ['./basic-operators.component.scss']
})
export class BasicOperatorsComponent implements OnInit {
  operators: string[];
  output = '';
  constructor(private operatorService: OperatorService) { }

  ngOnInit() {
    this.operators = this.operatorService.basicOperators();
  }

  executeOperation(operator: Operators) {
    switch (operator) {
      case Operators.Filter: { return this.operatorService.demoFilter(); }
      case Operators.Empty: { return this.operatorService.demoEmpty(); }
      case Operators.Pluck: { return this.operatorService.demoPluck(); }
      case Operators.StartWith: { return this.operatorService.demoStartWith(); }
      case Operators.Every: { return this.operatorService.demoEvery(); }
      case Operators.DistinctUntilChanged: { return this.operatorService.demoDistinctUntilChanged(); }
      case Operators.DefaultIfEmpty: { return this.operatorService.demoDefaultIfEmpty(); }
    }
  }
}
