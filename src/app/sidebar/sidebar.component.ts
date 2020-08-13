import {Component, Input, OnInit} from '@angular/core';
import {NavLink} from "../models/NavLink";
import {LinkLogo} from "../models/LinkLogo";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input()
  get routes(): NavLink[] { return this._routes; }
  set routes(routes: NavLink[]) {
    this._routes = routes;
  }
  private _routes: NavLink[] = [];

  @Input()
  get logos(): LinkLogo[] { return this._logos; }
  set logos(logos: LinkLogo[]) {
    this._logos = logos;
  }
  private _logos: LinkLogo[] = [];

}
