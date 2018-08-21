import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlComponent } from './control.component';
import {ControlRoutingModule} from './control-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ControlRoutingModule
  ],
  declarations: [ControlComponent]
})
export class ControlModule { }
