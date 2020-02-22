import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { registerLocaleData } from '@angular/common';
import localeCl from '@angular/common/locales/es-CU';

registerLocaleData(localeCl, 'es-CU');

import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

import { CoreModule } from '@app/core/core.module';
import { SharedModule } from '@app/shared/shared.module';
import { environment } from '../environments/environment';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./views/+home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./views/+auth/auth.module').then(m => m.AuthModule)
  },
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    CoreModule,
    SharedModule.forRoot(),
    BrowserAnimationsModule,
    RouterModule.forRoot(routes,
      {
        preloadingStrategy: PreloadAllModules
      }),
    HttpClientModule,
    HttpClientJsonpModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

