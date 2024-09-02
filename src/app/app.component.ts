import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { concat, from, interval, Observable, of, take } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  ngOnInit() {
  }
  usingOf() {
    console.log(' ');
    const numbers = of(1, 2, 3, 4, 5);
    console.log('observable operators: Of');
    console.log('observable action: of(1, 2, 3, 4, 5)');
    numbers.subscribe({
      next: value => console.log('Number:', value),
      complete: () => console.log('Sequence completed!')
    });
  }

  usingFrom() {
    console.log(' ');
    const colors = ['Red', 'Green', 'Blue', 'Yellow'];
    const colors$ = from(colors);
    console.log(`observable operators: from`);
    console.log(`observable action: from['Red', 'Green', 'Blue', 'Yellow']`);
    colors$.subscribe({
      next: color => console.log('Color:', color),
      complete: () => console.log('All colors emitted!')
    });
  }

  usingInterval() {
    console.log(' ');
    const interval$ = interval(1000).pipe(take(5));
    console.log(`observable operators: interval`);
    console.log(`observable action: interval(1000).pipe(take(5))`);
    interval$.subscribe({
      next: value => console.log(`Value: ${value}, Timestamp: ${new Date().toLocaleTimeString()}`),
      complete: () => console.log('Interval completed!')
    });
  }

  combiningOperators() {
    console.log(' ');
    const numbers$ = of(1, 2, 3);
    const colors$ = from(['Red', 'Green', 'Blue']);
    const combined$ = concat(numbers$, colors$);
    console.log(`observable operators: 'of', 'from', 'concat'`);
    combined$.subscribe({
      next: value => console.log('Value:', value),
      complete: () => console.log('Combined sequence completed!')
    });
  }

  handlingError(){
    console.log(' ');
    console.log(`observable operators: observer.error`);
    const errorObservable$ = new Observable(observer => {
      observer.next('First value');
      observer.next('Second value');
      observer.error('Oops! Something went wrong.');
      observer.complete(); 
    });

    errorObservable$.subscribe({
      next: value => console.log('Value:', value),
      error: err => console.error('Error occurred:', err),
      complete: () => console.log('Sequence completed!')
    });
  }
}
