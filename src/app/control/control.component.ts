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
  qServer: string = ""
  opalServer: string = ""
  startingPoll: boolean = false

  constructor(private controlService: ControlService) { }

  ngOnInit() {

    this.pollActive = true;
    this.controlService.getPollActive().subscribe(resp => {
      console.log("isactive = " + resp.status);
      this.pollActive = resp.status;
    });

    if (typeof(Storage) !== "undefined") {
      // Code for localStorage/sessionStorage.
      // Store value
      this.qServer = localStorage.getItem("qServer") != null ? localStorage.getItem("qServer") : "";
      this.opalServer = localStorage.getItem("opalServer") != null ? localStorage.getItem("opalServer") : "";
      console.log(this.qServer)

    }
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

    this.startingPoll = true;

    if (typeof(Storage) !== "undefined") {
      // Code for localStorage/sessionStorage.
      // Store value
      localStorage.setItem("qServer", this.qServer);
      localStorage.setItem("opalServer", this.opalServer);
    }

    this.controlService.startPoll(this.qServer, this.opalServer).subscribe(resp => {
      this.pollActive = resp.status


      if(! this.pollActive){
        uikit.notification({
          message: 'Poll could not be activated',
          status: 'danger',
          pos: 'top-center',
          timeout: 1000
      });
      }
      this.startingPoll = false;
    });

  }

  stopPoll(){
    this.controlService.stopPoll().subscribe(resp => {
      console.log(resp);
      this.pollActive = resp.status
    });
  }

}


