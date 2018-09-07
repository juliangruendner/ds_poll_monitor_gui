import { Component, OnInit } from '@angular/core';
import { ControlService } from '../services/control.service';
declare var UIkit:any;
export const uikit = UIkit;

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent implements OnInit {

  pollActive: boolean
  error_activating_message: string

  constructor(private controlService: ControlService) { }

  ngOnInit() {

    this.pollActive = true;
    this.controlService.getPollActive().subscribe(resp => {
      console.log("isactive = " + resp.status);
      this.pollActive = resp.status;
    });
  }


  getProcesses() {
    this.controlService.getAll().subscribe(resp => {
      console.log(resp)
      var alertString = "";

      resp.forEach(proc => {
        console.log(proc)
        alertString += "Process, pid = " + proc.id + " command = " + proc.cmd + "\n"
      });

      alert(alertString)
    });
  }

  startPoll(){
    this.controlService.startPoll().subscribe(resp => {
      this.pollActive = resp.status

      console.log(this.pollActive)
      if(! this.pollActive){
        uikit.notification({
          message: 'Poll could not be activated',
          status: 'danger',
          pos: 'top-center',
          timeout: 1000
      });
      }
    });

  }

  stopPoll(){
    this.controlService.stopPoll().subscribe(resp => {
      console.log(resp);
      this.pollActive = resp.status
    });
  }

}


