import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BasicOperatorsComponent } from './basic-operators/basic-operators.component';
import { IntermediateOperatorsComponent } from './intermediate-operators/intermediate-operators.component';
import { AdvanceOperatorsComponent } from './advance-operators/advance-operators.component';
import { RouterLink, RouterLinkActive } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    BasicOperatorsComponent,
    IntermediateOperatorsComponent,
    AdvanceOperatorsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
