import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlComponent } from './control.component';
import {ControlRoutingModule} from './control-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ControlRoutingModule,
    FormsModule
  ],
  declarations: [ControlComponent]
})
export class ControlModule { }
