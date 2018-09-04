import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestsComponent } from './requests.component';
import {RequestsRoutingModule} from './requests-routing.module';
import { Ng2OrderModule } from 'ng2-order-pipe';

@NgModule({
  imports: [
    CommonModule,
    RequestsRoutingModule,
    Ng2OrderModule
  ],
  declarations: [RequestsComponent]
})
export class RequestsModule { }
