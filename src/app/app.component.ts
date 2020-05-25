import { Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { AuthService } from './services/auth.service';
import { skip, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  private destroy$: Subject<void> = new Subject<void>();

  constructor(public readonly auth: AuthService) {}

  ngOnInit(): void {
    this.auth.user$
      .pipe(
        skip(1),
        takeUntil(this.destroy$),
        tap(() => this.loading$.next(false))
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
  }

  login(): void {
    this.loading$.next(true);
    this.auth.login();
  }

  logout(): void {
    this.auth.logout();
  }
}
