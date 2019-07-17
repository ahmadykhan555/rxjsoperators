import { Component } from '@angular/core';
import * as rxjs from 'rxjs';
import {
  map,
  shareReplay,
} from 'rxjs/operators';
import { OperatorService } from './operator.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'rxjsDemo';
  readonly key = 'id';
  source$ = rxjs.timer(2000, 1000);
  beginnerCourses$: rxjs.Observable<any[]>;
  advancedCourses$: rxjs.Observable<any[]>;
  readonly arrayOfValues = [1, 2, 3, 4, 5, 6, 'one', 'two'];
  navigationTabs = ['Basic', 'Intermediate', 'Advanced'];

  constructor(protected operatorService: OperatorService) {}
}

