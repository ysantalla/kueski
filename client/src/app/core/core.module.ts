import {
  NgModule,
  SkipSelf,
  Optional,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  HttpClientModule,
} from '@angular/common/http';

import { AuthGuard } from '@app/core/guards/auth.guard';
import { RedirectGuard } from './guards/redirect.guard';
import { HomeGuard } from './guards/home.guard';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    AuthGuard,
    HomeGuard,
    RedirectGuard
  ],
  declarations: []
})
export class CoreModule {

  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule,
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}
