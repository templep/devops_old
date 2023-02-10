import { Component, OnInit } from "@angular/core";
import Statsig from "statsig-js";
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'DEVOPSFUZZY';

  async ngOnInit(): Promise<void> {
  }
}
