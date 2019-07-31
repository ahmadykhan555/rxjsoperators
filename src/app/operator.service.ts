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
  skipUntil,
  last,
  concatAll,
  concatMap,
  concatMapTo,
  single,
  ignoreElements,
  sample,
  reduce,
  scan,
  groupBy,
  mergeMap,
  toArray,
  merge,
  mergeAll,
  partition,
  throttle,
  throttleTime
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
  SkipUntil = 'skip until',
  Last = 'last',
  Concat = 'concat',
  ConcatAll = 'concat all',
  ConcatMap = 'concat map',
  ConcatMapTo = 'concat map to',
  Single = 'single',
  IgnoreElements = 'ignore elements',
  Sample = 'sample',
  Reduce = 'reduce',
  Scan = 'scan',
  GroupBy = 'group by',
  Merge = 'merge',
  MergeAll = 'merge all',
  MergeMap = 'merge map',
  Partition = 'partition',
  Throttle = 'throttle',
  ThrottleTime = 'throttle time',
  Zip = 'zip',
  CombineLatest = 'combine latest',
  ForkJoin = 'fork join',
  Publish = 'publish',
  Share = 'share',
  Multicast = 'multicast',
  Race = 'race',
  Retry = 'retry',
  RetryWhen = 'retry when',
  WithLatestFrom = 'with latest from',
  Let = 'let',
  Debounce = 'debounce',
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

  demoLast() {
  // emits the last value of source upon completion that satisfies a condition.
  // const source$ = rxjs.range(1, 9).pipe(
  // last() this will fire once the source completes and will fire the last value since there is no condition specified.
  // );

    const source$ = rxjs.interval(100).pipe(
      take(20),
      tap((v) => this.logOutput(v)),
      // last() // if we omit the take operator, last will never execute since the source never completes.
            // However, including a take operator forces the stream to complete and thus the last value is outputted
      last(n => n % 2 === 0) // this will wait for source to complete then check the last value that matches this condition and logs that.
    );
    source$.subscribe(v => this.logOutput(' last is : ' + v), null, () => console.log('Completed'));

  }

  demoConcat() {
    /*
      * loosely like the array.prototype.concat
      * concatenates one stream to the end of other
      * If end doesn't exist it wont throw an error but there wont be any 'true' concatenation to observe since the source doesn't end
    */

    // const source1$ = rxjs.range(1, 9).pipe(map(v =>  v + ' 1st stream'));
    const source1$ = rxjs.interval(100).pipe(map(v =>  v + ' 1st stream'), take(5));
    const source2$ = rxjs.range(1, 20).pipe(map(v =>  v + ' 2nd stream'));
    rxjs.concat(source1$, source2$).subscribe(v => this.logOutput(v));
  }

  demoConcatAll() {
    /*
      * Concatenates observables.
      * we will have observables that omit observables as values.
      * concatenates values from each observable.
      * Similar working as of a normal concat operator.
    */

    const source$ = rxjs.of(
      rxjs.range(1, 9).pipe(map(v => v + ' 1st')),
      rxjs.interval(100).pipe(
        take(5),
        map(v => v + ' 2nd')
      )
    );
    source$.pipe(concatAll()).subscribe(v => this.logOutput(v));
  }

  demoConcatMap() {
    /*
      * Similar to map
      * a simple map doesn't know whether a value is observable or not and if it is it doesnt know to subscribe to it.
      * ConcatMap runs like a map but will subscribe to each of the observable.
      * with a normal map operator it simply will output the returned observable and not the values emitted by that observable.
      * concatMap will subscribe to the value emitted and concatenate them to the next.
    */
    rxjs.range(1, 9).pipe(
      concatMap(v => rxjs.range(0, v + 1).pipe(
        map(value => value + ' from stream: ' + v))
      )
    ).subscribe(v => console.log(v));

  }

  demoConcatMapTo() {
    /*
      * Similar to concatMap, however, here we can specify the observable we want to create irrespective to omitted value.
      * useful if we need to map to the same observable.
    */
    rxjs.range(1, 9).pipe(
      concatMapTo(rxjs.range(0, 10))
    ).subscribe(v => console.log(v));
  }

  demoSingle() {
    /*
      * can be used to check whether only one value exists
      * will throw an error if more than one value is found
      * can be used to check where only one value satisfying a condition is allowed
      * outputs the single value found.
    */

    rxjs.range(0, 9).pipe(
      // single() // throws an error since more than one value exists
      single(n => n >= 8)
    // tslint:disable-next-line:max-line-length
    ).subscribe(v => this.logOutput('In a range from 0-8 with condition value >= 8, we will only get one value (8) that satisfies this conditon: ' + v));
  }

  demoIgnoreElements() {
    /*
      * Used to ignore elements from a stream
    */

    this.output$.next('Running interval 100ms apart for 20 iterations, will ignore all, you will see a complete message in 2 sec');
    rxjs.interval(100).pipe(
      take(20),
      ignoreElements()
    ).subscribe({
      next: v => console.log(v),
      complete: () => this.logOutput('Complete')
    });
  }

  demoSample() {
    /*
      * Sample from source every time the observable fires.
    */
    this.output$.next('This will sample from the interval running after every 2sec. The values of interval are 100ms apart ');
    const source$ = rxjs.interval(100);
    source$.pipe(
      sample(rxjs.timer(0, 2000))
    ).subscribe(v => this.logOutput(v));
  }

  demoReduce() {
    /*
      * Similar to the array.reduce
      * triggers only when the observable completes.
    */

    rxjs.interval(100).pipe(
      take(20),
      reduce((acc, v) => v + acc, 0)
    ).subscribe(v => this.logOutput('The sum of first 20 is: ' + v));
  }

  demoScan() {
    /*
      * Emits value of accumulator every time the accumulator changes.
    */
    rxjs.interval(100).pipe(
      take(20),
      scan((acc, v) => v + acc, 0)
    ).subscribe(v => this.logOutput('Accumulator now: ' + v));
  }

  demoGroupBy() {
    /*
      * Groups things based on provided function.
    */

    rxjs.range(0, 20).pipe(
      groupBy(n => n % 3),
      mergeMap(group => group.pipe(toArray()))
    ).subscribe(v => console.log(v));
  }

  // Merge family, combines observables into one and fires all at once unlike concat where the order is respected

  demoMerge() {
    /*
      * combines observables into one.
      * fire simultaneously
    */

    const source1$ = rxjs.interval(300).pipe(map(v => 'Post from source 1 ' + v));
    const source2$ = rxjs.interval(200).pipe(map(v => 'Post from source 2 ' + v));
    source1$.pipe(
      merge(source2$)
    ).subscribe(v => this.logOutput(v));
  }

  demoMergeAll() {
    const source1$ = rxjs.interval(300).pipe(map(v => 'Post from source 1 ' + v));
    const source2$ = rxjs.interval(200).pipe(map(v => 'Post from source 2 ' + v));
    rxjs.of(source1$, source2$).pipe(
      mergeAll()
    ).subscribe(v => this.logOutput(v));
  }

  demoMergeMap() {
    const source1$ = rxjs.interval(300).pipe(map(v => 'Post from source 1 ' + v));
    const source2$ = rxjs.interval(200).pipe(map(v => 'Post from source 2 ' + v));
    const feed = {
      s1: source1$,
      s2: source2$
    };
    const names = ['s1', 's2'];

    rxjs.from(names).pipe(
      mergeMap(name => feed[name])
    ).subscribe(v => this.logOutput(v));
  }

  demoPartition() {
    /*
      * Partition is a mixture of filter and group by.
      * returns 2 observables
      * subscribe to each separately
    */
    const [even$ , odd$] = rxjs.range(0, 20).pipe(
      partition(v => v %2 === 0)
    );

    even$.subscribe(v => this.logOutput('EVEN: ' + v));
    odd$.subscribe(v => this.logOutput('ODD: ' + v));
  }

  // throttle => control the time between subsequent emissions
  demoThrottle() {
    // throttle based on an observable, throttle until values from observable are emitted
    this.output$.next('Throttle the emission (per 100ms) until x * 2000ms has elapsed');
    rxjs.interval(100).pipe(
      throttle( () => rxjs.interval(2000))
    ).subscribe(v => this.logOutput(v));
  }

  demoThrottleTime() {
    // throttle by time in ms
    this.output$.next('Throttle the emission (per 100ms) by 1 sec');
    rxjs.interval(100).pipe(
      throttleTime(1000)
    ).subscribe(v => this.logOutput(v));
  }

  demoZip() {
    /*
      * Used where two or more sources have different paced emissions
      * indexes must match
      * will emit wrt the slowest emission
      * linked by index
      * outputted as an array of emitted values grouped at one index
      * example below will group the number with its cube
    */
    const slowSource$ = rxjs.interval(500);
    const fastSource$ = rxjs.interval(250).pipe(map(v => Math.pow(v, 3)));
    this.output$.next('This example shows a number and its cube grouped at an index');
    rxjs.zip(slowSource$, fastSource$).subscribe(v => this.logOutput(v));
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
      'scan',
      'merge',
      'merge all',
      'merge map',
      'partition',
      'throttle',
      'throttle time'
    ];
  }

  advanceOperators() {
    return [
      'zip',
      'combine latest',
      'fork join',
      'publish',
      'share',
      'multicast',
      'race',
      'retry',
      'retry when',
      'with latest from',
      'let',
      'debounce'
    ];
  }

  logOutput(output: any) {
    this.output$.next((this.output$.value || '') + '\n' + output);
  }
}
