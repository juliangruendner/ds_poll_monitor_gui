import { Component, OnInit } from '@angular/core';
import { ControlService } from '../services/control.service';
import {Request} from '../models/request.model';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {

  pollActive: boolean
  requests: Array<Request>
  newestFirst: boolean

  constructor(private controlService: ControlService) { 
    this.requests = [];
    this.newestFirst = true;
  }

  ngOnInit() {

    var req1 = new Request();
    var req2 = new Request();

    req1.time = 1238323623006
    req2.time = 1288323223006;
    req1.requestLine = " REQUEST Line of first REQUEST this request line is really really really really really really really really really really really really long";
    req2.requestLine = " REQUEST Line of second REQUEST";
    req2.requestBody = "request 2 body LOREM IPSUM  LOREM IPSUM LOREM IPSUM LOREM IPSUM LOREM IPSUM LOREM IPSUM LOREM IPSUM LOREM IPSUM LOREM IPSUM LOREM IPSUM LOREM IPSUM LOREM IPSUM LOREM IPSUM LOREM IPSUM LOREM IPSUM LOREM IPSUM LOREM IPSUM LOREM IPSUM LOREM IPSUM LOREM IPSUM LOREM IPSUM LOREM IPSUM LOREM IPSUM LOREM IPSUM LOREM IPSUM LOREM IPSUM";

    this.requests.push(req1);
    this.requests.push(req2);

    this.requests.sort(function(a,b){ if (a.time > b.time) return -1; else return 1;})
    this.newestFirst = true;
    var tmpList = this.requests;
    this.requests = tmpList;
  }

  startShowingRequests(){
    this.controlService.startPoll().subscribe(resp => {
      console.log(resp);
      this.pollActive = resp.status
    });

  }

  stopShowingRequests(){
    this.controlService.stopPoll().subscribe(resp => {
      console.log(resp);
      this.pollActive = resp.status
    });
  }

  toggleBody(id: string){

    console.log(id)
    let elm = <HTMLElement>document.querySelector("#id_" + id);
    elm.hidden =  ! elm.hidden;
  }

  toggleRequestOrder(){

    this.newestFirst = !this.newestFirst;

    if(this.newestFirst){
      this.requests.sort(function(a,b){ if (a.time > b.time) return -1; else return 1;})
    }else{
      this.requests.sort(function(a,b){ if (a.time > b.time) return 1; else return -1;})
    }

    var tmpList = this.requests;
    this.requests = tmpList;
    
  }

}


