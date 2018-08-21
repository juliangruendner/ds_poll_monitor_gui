import { Component, OnInit } from '@angular/core';
import { ControlService } from '../services/control.service';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent implements OnInit {

  constructor(private controlService: ControlService) { }

  ngOnInit() {
  }


  getProcesses() {
    this.controlService.getAll().subscribe(resp => {
      console.log(resp)
      var alertString = "";

      resp.forEach(proc => {
        console.log(proc)
        alertString += "Process, pid = " + proc.pid + " command = " + proc.cmd_line[0] + " " + proc.cmd_line[1] + "\n"
      });

      alert(alertString)
    });
  }

}


