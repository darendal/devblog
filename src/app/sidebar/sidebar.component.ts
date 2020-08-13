import {Component, Input, OnInit} from '@angular/core';
import {NavLink} from '../models/NavLink';
import {LinkLogo} from '../models/LinkLogo';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  @Input()
  get routes(): NavLink[] { return this._routes; }
  set routes(routes: NavLink[]) {
    this._routes = routes;
  }

  @Input()
  get logos(): LinkLogo[] { return this._logos; }
  set logos(logos: LinkLogo[]) {
    this._logos = logos;
  }

  private _routes: NavLink[] = [];
  private _logos: LinkLogo[] = [];

  ngOnInit(): void {
  }

}
