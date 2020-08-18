import {Component, Input, OnInit} from '@angular/core';
import {LinkLogo} from '../models/LinkLogo';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  @Input()
  get logos(): LinkLogo[] { return this._logos; }
  set logos(logos: LinkLogo[]) {
    this._logos = logos;
  }

  private _logos: LinkLogo[] = [];

  ngOnInit(): void {
  }
}
