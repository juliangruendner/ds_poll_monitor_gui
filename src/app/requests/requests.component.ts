import { Component, OnInit } from '@angular/core';
import { ControlService } from '../services/control.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {

  pollActive: boolean

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
      console.log(resp);
      this.pollActive = resp.status
    });

  }

  stopPoll(){
    this.controlService.stopPoll().subscribe(resp => {
      console.log(resp);
      this.pollActive = resp.status
    });
  }

}


