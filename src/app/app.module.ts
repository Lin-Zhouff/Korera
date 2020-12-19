import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ResourcesComponent } from './resources/resources.component';
import {MatTableModule} from '@angular/material/table';
import {AuthInterceptor} from './auth/auth-interceptor';
import { ProjectComponent } from './project/project.component';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {NoCommaPipe} from './project/NoCommaPipe';
import { FormulaComponent } from './formula/formula.component';
import { TemplateComponent } from './template/template.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ResourcesComponent,
    ProjectComponent,
    NoCommaPipe,
    FormulaComponent,
    TemplateComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    MatSidenavModule,
    MatTableModule,
    MatSelectModule,
    MatCheckboxModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
