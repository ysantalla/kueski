import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subject } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '@app/core/services/auth.service';
import { Router } from '@angular/router';

import { environment as env } from '@env/environment';

import {FadeInOut} from '@app/core/animations/app.animation';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [FadeInOut]
})
export class LayoutComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;
  email$: Observable<string>;

  envName = env.envName;
  appName = env.appName;
  year = new Date().getFullYear();
  isProd = env.production;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isAuthenticated();
    this.email$ = this.authService.getEmail();
  }

  logout(): void {
    this.authService.logout();
    this.snackBar.open('Usted a cerrado su sesión', 'X', {duration: 3000});
    this.router.navigate(['auth', 'login']);
  }
}
