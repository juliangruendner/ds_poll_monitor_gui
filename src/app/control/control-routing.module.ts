import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route } from '../core/route.service';
import { extract } from '../core/i18n.service';
import { ControlComponent } from './control.component';

const routes: Routes = Route.withShell([
  { path: 'control', component: ControlComponent, data: { title: extract('Control') } }
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ControlRoutingModule { }
