import { Component, OnInit } from '@angular/core';
import {GitService} from "../services/git/git.service";

@Component({
  selector: 'app-gitchart',
  templateUrl: './gitchart.component.html',
  styleUrls: ['./gitchart.component.sass']
})
export class GitchartComponent implements OnInit {

  constructor(private gitService: GitService) { }

  ngOnInit(): void {
  }

  test() {
    this.gitService.getStats().subscribe(x => console.log(x));
  }

}
