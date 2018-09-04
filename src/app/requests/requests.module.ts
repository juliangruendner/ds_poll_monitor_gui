import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestsComponent } from './requests.component';
import {RequestsRoutingModule} from './requests-routing.module';

@NgModule({
  imports: [
    CommonModule,
    RequestsRoutingModule
  ],
  declarations: [RequestsComponent]
})
export class RequestsModule { }
