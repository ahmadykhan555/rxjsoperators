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
      case Operators.Filter: {
        this.operatorService.demoFilter();
        return;
      }
      case Operators.Empty: {
        this.operatorService.demoEmpty();
        return;
      }
      case Operators.Pluck: {
        this.operatorService.demoPluck();
        return;
      }
      case Operators.StartWith: {
        this.operatorService.demoStartWith();
        return;
      }
      case Operators.Every: {
        this.operatorService.demoEvery();
        return;
      }
      case Operators.DistinctUntilChanged: {
        this.operatorService.demoDistinctUntilChanged();
        return;
      }
      case Operators.DefaultIfEmpty: {
        this.operatorService.demoDefaultIfEmpty();
        return;
      }
    }
  }

  logToOutputConsole(result) {
    this.output += result;
    console.log('Logging: ', this.output)
  }
}
