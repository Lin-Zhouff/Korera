import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import {EditColumnPopupComponent, NewColumnPopupComponent, ResourcesComponent} from './resources/resources.component';
import {AuthInterceptor} from './auth/auth-interceptor';
import { ProjectComponent } from './project/project.component';
import {NoCommaPipe} from './project/NoCommaPipe';
import { FormulaComponent } from './formula/formula.component';
import { TemplateComponent } from './template/template.component';
import { FieldFormComponent } from './field-form/field-form.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatSortModule} from '@angular/material/sort';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ResourcesComponent,
    ProjectComponent,
    NoCommaPipe,
    FormulaComponent,
    TemplateComponent,
    FieldFormComponent,
    NewColumnPopupComponent,
    EditColumnPopupComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    NgbModule,
    ReactiveFormsModule,
    MatSortModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
