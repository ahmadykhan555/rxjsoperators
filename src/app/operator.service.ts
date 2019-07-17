import { Injectable } from '@angular/core';
import * as rxjs from 'rxjs';
import {
  map,
  filter,
  tap,
  pluck,
  startWith,
  every,
  take,
  distinctUntilChanged,
  defaultIfEmpty,
  takeUntil,
  delay,
  delayWhen,
  takeWhile,
  skip,
  skipWhile,
  skipUntil
} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

export enum Operators {
  Filter = 'filter',
  Empty = 'empty',
  Pluck = 'pluck',
  StartWith = 'start with',
  Every = 'every',
  DistinctUntilChanged = 'distinct until changed',
  DefaultIfEmpty = 'default if empty',
  Delay = 'delay',
  DelayWhen = 'delay when',
  TakeWhile = 'take while',
  Take = 'take',
  TakeUntil = 'take until',
  Throw = 'throw',
  Skip = 'skip',
  SkipWhile = 'skip while',
  SkipUntil = 'skip until'
}

@Injectable({
  providedIn: 'root'
})
export class OperatorService {
  source$ = rxjs.timer(1000, 1000);
  output$: rxjs.BehaviorSubject<any> = new rxjs.BehaviorSubject(null);
  activeOperator$: rxjs.BehaviorSubject<any> = new rxjs.BehaviorSubject(null);
  unsubscribe: rxjs.Subject<void> = new rxjs.Subject();
  constructor() {}

  // operators
  demoFilter() {
    this.activeOperator$.next(Operators.Filter);
    this.source$
    .pipe(
      filter((value) => value % 2 === 0),
      map(value => value * 6),
      tap((value) => this.logOutput('1st map :  ' + value)),
      map(value => value / 10),
      tap((value) => this.logOutput('2nd map :  ' + value)),
      takeUntil(this.unsubscribe)
    )
    .subscribe(value => this.logOutput('value: ' + value)) ;
  }

  demoEmpty() {
    this.activeOperator$.next(Operators.Empty);
    const empty$ = rxjs.empty();
    empty$.subscribe({
      next: e => this.logOutput('subscriber' + e),
      complete: () => this.logOutput('Complete')
    });
  }

  demoPluck() {
    this.activeOperator$.next(Operators.Pluck);
    const source$ = rxjs.interval(1000);
    source$.pipe(
      tap(e => this.logOutput('Value is : ' + e)),
      map(e => {
        return {name: e, randomId: Math.random()};
      }),
      tap((e) => this.logOutput('Before pluck ' + e)),
      pluck('name')
    )
      .subscribe(value => this.logOutput(value));
  }

  demoStartWith() {
    this.activeOperator$.next(Operators.StartWith);
    this.source$.pipe(
      tap(e => this.logOutput('Starting with ' + e)),
      // startWith('Initiating Magic!! ')
      startWith(0)
    ).subscribe(val => this.logOutput(val));
  }

  demoEvery() {
    // tslint:disable-next-line:max-line-length
    // checks the stream for the specified condition. Exits as soon as 1st false is encountered otherwise checks all until either true or false
    this.activeOperator$.next(Operators.Every);
    this.source$
    .pipe(
      take(10),
      tap(value => this.logOutput(value)),
      every( value => value % 2 === 0)
    ).subscribe(value => this.logOutput(value));
  }

  demoDistinctUntilChanged() {
    // emits new value only if its different from the previous one.
    this.activeOperator$.next(Operators.DistinctUntilChanged);
    rxjs.from([1, 2, 2, 2, 3, 3])
    .pipe(
      distinctUntilChanged()
    )
    .subscribe(value => this.logOutput(value));
  }

  demoDefaultIfEmpty() {
    // creates an observable that can take on a default value if the observable never emits a value.
    // If it emits even one value the defaultIfEmpty operator has no effect.

    // no effect case
    this.activeOperator$.next(Operators.DefaultIfEmpty);
    this.source$
    .pipe(
      defaultIfEmpty(20)
    )
    .subscribe(value => this.logOutput(value));

    // effect in action
    rxjs.empty()
    .pipe(
      defaultIfEmpty('Show this if empty')
    )
    .subscribe(value => this.logOutput(value));
  }

  demoDelay() {
    /*
      * delay will open up a timer for each one of the range 1-9 of 1000 sec so it will appear as if they all executed once.
      * this can be resolved by giving each emitted value a different value of timer.
      * */
      this.output$.next('Executing.. You will see the stream in 1 sec');
      rxjs.range(1, 9).pipe(delay(1000)).subscribe(
        val => this.logOutput(val),
        null,
        () => this.logOutput('Done')
      );
  }
  demoDelayWhen() {
    /*
      * delay will open up a timer for each one of the range 1-9 of 1000 sec so it will appear as if they all executed once.
      * this can be resolved by giving each emitted value a different value of timer.
    */
      this.output$.next('Executing.. You will see the stream in 1 sec, one at a time');
      rxjs.range(1, 9).pipe(
      delayWhen(val => rxjs.timer(val * 1000)))
      .subscribe(
      val => this.logOutput(val),
        null,
        () => this.logOutput('Done')
      );
  }

  demoTake() {
    // specify the number of values we wish to get from an observable.
    this.logOutput('Will take only 5 value from the source stream which is a range of numbers from 1 - 20 \n');
    rxjs.range(1, 20)
    .pipe(
      take(5)
    )
    .subscribe(val => this.logOutput(val));
  }

  demoTakeUntil() {
    // specify the number of values we wish to get from an observable.
    this.logOutput('Will take values until value reaches any multiple of 13 \n');
    rxjs.interval(100)
    .pipe(
      takeWhile(v => v * 13 > 90)
    )
    .subscribe(val => this.logOutput(val));
  }

  demoTakeWhile() {
    // take value until an observable completes.
    this.logOutput('take value until an observable completes. In this case our observable is a timer that completes in 8 sec. \n');
    rxjs.interval(1000)
    .pipe(
      takeUntil(rxjs.timer(8000))
    )
    .subscribe(val => this.logOutput(val));

  }

  demoThrow() {
    // similar to the empty operator which fires the complete method, Throw will operator will trigger the error callback.
    rxjs.throwError(null).subscribe(
      {error: () => this.logOutput('Error thrown')}
    );
  }

  demoSkip() {
    // opposite of Take, skip will ignore the first number of emissions from an obeservable.
    this.output$.next('This stream will start after skipping the first 5 emissions, and will thus start from 5 instead of 1');
    rxjs.interval(1000)
    .pipe(
      skip(5)
    )
    .subscribe(v => this.logOutput(v));
  }

  demoSkipWhile() {
    // Similar to take while, only opposite.
    this.output$.next('Skip all values less than or equal to 100');
    rxjs.interval(100).pipe(
      skipWhile(v => v <= 100)
    ).subscribe(v => this.logOutput(v));
  }

  demoSkipUntil() {
    this.output$.next('Skip all values till 2 sec are elapsed.');
    rxjs.interval(100).pipe(
      skipUntil(rxjs.timer(2000))
    ).subscribe(v => this.logOutput(v));
  }


  // helpers
  stopExecution() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
    this.output$.next('Execution Cancelled');
    this.output$.complete();
  }

  basicOperators() {
    return [
      'filter',
      'empty',
      'pluck',
      'start with',
      'every',
      'distinct until changed',
      'default if empty'
    ];
  }

  intermediateOperators() {
    return [
      'delay',
      'delay when',
      'take',
      'take while',
      'take until',
      'throw',
      'skip',
      'skip while',
      'skip until',
      'last',
      'concat',
      'concat all',
      'concat map',
      'concat map to',
      'single',
      'ignore elements',
      'sample',
      'reduce',
    ];
  }

  advanceOperators() {
    return [];
  }

  logOutput(output: any) {
    this.output$.next((this.output$.value || '') + '\n' + output);
  }
}
