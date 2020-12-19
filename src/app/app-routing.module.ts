import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResourcesComponent } from './resources/resources.component';
import { AuthGuard } from './auth/auth.guard';
import {ProjectComponent} from './project/project.component';
import {FormulaComponent} from './formula/formula.component';
import {TemplateComponent} from './template/template.component';

const routes: Routes = [
  {path: '', loadChildren: () => import('./auth/auth.module')
      .then(mod => mod.AuthModule)},
  {path: 'resources', component: ResourcesComponent, canActivate: [AuthGuard]},
  {path: 'project', component:ProjectComponent, canActivate: [AuthGuard]},
  {path: 'formula', component:FormulaComponent, canActivate: [AuthGuard]},
  {path: 'template', component:TemplateComponent, canActivate : [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [AuthGuard],
  exports: [RouterModule]
})
export class AppRoutingModule { }
