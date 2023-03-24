import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit{

  /************************************************************************************************/
  /*                                        Initialization                                        */
  /************************************************************************************************/
  ngOnInit() {
    // Change background
    document.body.style.backgroundImage = "url('../../assets/home_background.jpg')";
    document.body.style.backgroundSize = '100%';
  }

  ngOnDestroy() {
    // Reset background
    document.body.style.background = "url('../../assets/background.jpg')";
    document.body.style.backgroundImage = "100%";
  }
}
