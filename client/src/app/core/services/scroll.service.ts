import { EventManager } from '@angular/platform-browser';
import { Injectable } from '@angular/core';
import { Observable, Subject, interval } from 'rxjs';
import { throttle, map } from 'rxjs/operators';

interface Position {
  scrollHeight: number;
  scrollTop: number;
  clientHeight: number;
}

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private _scrollPercent = 80;
  private scrollSubject: Subject<Document> = new Subject();

  constructor(private eventManager: EventManager) {
    this.eventManager.addGlobalEventListener(
      'window',
      'scroll',
      this.onScroll.bind(this)
    );
  }

  private onScroll = (event: UIEvent) =>
    this.scrollSubject.next(event.target as Document)

  private isUserScrollingDown = (positions: Array<Position>) =>
    positions[0].scrollTop < positions[1].scrollTop

  private isScrollExpectedPercent = (position: Position, percent: number) =>
    (position.scrollTop + position.clientHeight) / position.scrollHeight >
    percent / 100

  getScrollPercent(): number {
    return this._scrollPercent;
  }

  setScrollPercent(scrollPercent: number) {
    this._scrollPercent = scrollPercent;
  }

  get onScroll$(): Observable<Document> {
    return this.scrollSubject.asObservable();
  }

  get onScrolledDown$(): Observable<Position> {
    return this.onScroll$
      .pipe(throttle(() => interval(50)))
      .pipe(
        map(doc => {
          return {
            scrollHeight: doc.documentElement.scrollHeight,
            scrollTop: doc.documentElement.scrollTop || doc.body.scrollTop,
            clientHeight: doc.documentElement.clientHeight,
          };
        })
      );
  }
}
