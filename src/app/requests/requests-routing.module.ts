import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route } from '../core/route.service';
import { extract } from '../core/i18n.service';
import { RequestsComponent } from './requests.component';

const routes: Routes = Route.withShell([
  { path: 'requests', component: RequestsComponent, data: { title: extract('Requests') } }
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class RequestsRoutingModule { }
