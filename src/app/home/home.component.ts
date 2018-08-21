import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  quote: string;
  isLoading: boolean;

  listTitle:string;

  

  constructor() {}

  ngOnInit() {
    this.listTitle = "Titel meiner Checkliste";
    this.isLoading = true;
    setTimeout(() => { this.isLoading = false; }, 1000);
  }

}
