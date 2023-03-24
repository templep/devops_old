import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {Association} from "../mock-data";
import {
  AssociationListItemExpandComponent
} from "../association-list-item-expand/association-list-item-expand.component";

@Component({
  selector: 'app-associations-list-item',
  templateUrl: './associations-list-item.component.html',
  styleUrls: ['./associations-list-item.component.css']
})
export class AssociationsListItemComponent implements OnInit {
  /************************************************************************************************/
  /*                                          Attributes                                          */
  /************************************************************************************************/
  @Input() public association!: Association;

  public nb_members!: number;

  /************************************************************************************************/
  /*                                         Constructor                                          */
  /************************************************************************************************/
  constructor(private http: HttpClient, private dialog: MatDialog) {
  }

  /************************************************************************************************/
  /*                                        Initialization                                        */
  /************************************************************************************************/
  ngOnInit() {
    // set headcount with association users array length
    this.nb_members = this.association.users.length;
  }

  /************************************************************************************************/
  /*                                          Functions                                           */
  /************************************************************************************************/
  expand() {
    // open association expend component on click
    this.dialog.open(AssociationListItemExpandComponent, {data: this.association.id})
  }
}

