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
  pollRequests: any
  lastRequestTime: string
  cutoff: number

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
  }

  startShowingRequests(){

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
      } else if(resp[0].time != this.requests[0].time){
        var tmp = resp.concat(this.requests)
        this.newestFirst = true;
        this.requests = tmp
        if (this.requests.length > this.cutoff){
          this.requests = this.requests.slice(0, this.cutoff)
        }
      }
      this.pollRequests = setTimeout(()=>{this.startShowingRequests()}, 1000)

    }); 

  }

  stopShowingRequests(){
    clearTimeout(this.pollRequests)
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

}


