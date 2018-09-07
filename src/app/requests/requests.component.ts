import { Component, OnInit, ModuleWithComponentFactories } from '@angular/core';
import {Request} from '../models/request.model';
import {RequestsService} from '../services/requests.service';
import * as moment from 'moment';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {

  requests: Array<Request>
  newestFirst: boolean
  requestPollingActive: boolean = false
  pollRequests: any
  lastRequestTime: string
  cutoff: number

  timeFrom: string
  timeTo: string

  timeFromValid: boolean = true
  timeToValid: boolean = true
  

  constructor(private requestsService: RequestsService) { 
    this.requests = [];
    this.newestFirst = true;
  }

  ngOnInit() {

    this.requests.sort(function(a,b){ if (a.time > b.time) return -1; else return 1;})
    this.newestFirst = true;
    var tmpList = this.requests;
    this.requests = tmpList;
    this.cutoff = 5;
    this.timeFrom = this.timeTo = ""

  }

  pollRequestsFunc(){

   this.lastRequestTime = moment().format('YYYYMMDDhhmmss');

    if (this.requests.length > 0){
      var lastRequestTime = this.requests[0].time;
      lastRequestTime = lastRequestTime.replace(" ", "");
      lastRequestTime = lastRequestTime.replace(/:/g, "");
      lastRequestTime = lastRequestTime.replace(/-/g, "");
      this.lastRequestTime = String(Number(lastRequestTime) + 1) ;
    }

    
    this.requestsService.getByTimestamp(this.lastRequestTime).subscribe(resp => {
      resp.sort(function(a,b){ if (a.time > b.time) return -1; else return 1;})

      if(this.requests.length <= 0 ){
        var tmp = resp.concat(this.requests)
        this.newestFirst = true;
        this.requests = tmp
      } else if(resp.length > 0 && resp[0].time != this.requests[0].time){
        var tmp = resp.concat(this.requests)
        this.newestFirst = true;
        this.requests = tmp
        if (this.requests.length > this.cutoff){
          this.requests = this.requests.slice(0, this.cutoff)
        }
      }
      this.pollRequests = setTimeout(()=>{this.pollRequestsFunc()}, 1000)

    }); 

  }

  startShowingRequests(){

   if(this.requestPollingActive == true){
     return;
   }

   this.requestPollingActive = true;
   this.pollRequestsFunc()
  }

  stopShowingRequests(){
    clearTimeout(this.pollRequests)
    this.requestPollingActive = false;
  }

  toggleBody(id: string){
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


  downloadLog(){

    this.timeFromValid = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/.test(this.timeFrom)
    this.timeToValid = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/.test(this.timeTo)

    if( ! this.timeFromValid ||  ! this.timeToValid){
      alert("date format incorrect, has to be YYYY-MM-DD")
      return;
    }

    if(this.timeFrom >= this.timeTo){
      alert("ensure from date is smaller than to date")
      return;
    }

    this.requestsService.downloadLogs(this.timeFrom.replace(/-/g, ""), this.timeTo.replace(/-/g, ""));
    
  }

}


