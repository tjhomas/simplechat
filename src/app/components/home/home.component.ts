import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { tap, takeUntil, skip } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(public auth: AuthService) {}

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
    this.destroy$.next(true);
  }

  login(): void {
    this.loading$.next(true);
    this.auth.login();
  }

  logout(): void {
    this.loading$.next(true);
    this.auth.logout();
  }
}
