import {
  of,
  map,
  first,
  interval,
  fromEvent,
  filter,
  from,
  single,
  skipWhile,
  findIndex,
  takeUntil,
  range,
  takeLast,
} from 'rxjs';

of(1, 2, 3)
  .pipe(map((x) => x * x))
  .subscribe((v) => console.log(`value: ${v}`));
of(1, 2, 3)
  .pipe(first())
  .subscribe((v) => console.log(`value: ${v}`));

const observable_interval = interval(1000 /* number of milliseconds */);
console.log(observable_interval);

/** New Example */

const source1 = from([
  'Green Arrow',
  'SuperMan',
  'Flash',
  'SuperGirl',
  'Black Canary',
]);
// Skip the heroes until SuperGirl
const example1 = source1.pipe(skipWhile((hero) => hero !== 'SuperGirl'));
// output: SuperGirl, Black Canary
example1.subscribe((femaleHero) => console.log(femaleHero));

const source2 = from([1, 2, 3, 4, 5, 6, 7, 9, 10]);
const example2 = source2.pipe(skipWhile((_, i) => i !== 5));
// output: 6, 7, 9, 10
example2.subscribe((value) => console.log(value));

const source3 = of(
  { name: 'Ben' },
  { name: 'Tracy' },
  { name: 'Laney' },
  { name: 'Lily' }
);
source3
  .pipe(single((x) => x.name.startsWith('B')))
  .subscribe((x) => console.log(x));

/** New Example */

const div = document.createElement('div');
div.style.cssText = 'width: 200px; height: 200px; background: #0ef;';
document.body.appendChild(div);
const clicks = fromEvent(document, 'click');

const result = clicks.pipe(
  findIndex((ev) => (<HTMLElement>ev.target).tagName === 'DIV')
);
result.subscribe((x) => console.log(x));

const clicksOnDivs = clicks.pipe(
  filter((ev) => (<HTMLElement>ev.target).tagName === 'DIV')
);
clicksOnDivs.subscribe((x) => console.log(x));

/** New Example */

const source4 = interval(1000);
const clicks4 = fromEvent(document, 'click');
const result4 = source4.pipe(takeUntil(clicks4));
result.subscribe((x) => console.log(x));

const many = range(1, 100);
const lastThree = many.pipe(takeLast(3));
lastThree.subscribe((x) => console.log(x));
