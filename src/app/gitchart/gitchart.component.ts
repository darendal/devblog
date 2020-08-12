import { Component, OnInit } from '@angular/core';
import {GitService} from '../services/git/git.service';
import {Observable, of} from 'rxjs';


@Component({
  selector: 'app-gitchart',
  templateUrl: './gitchart.component.html',
  styleUrls: ['./gitchart.component.sass']
})
export class GitchartComponent implements OnInit {

  options = {
    tooltip: {
      trigger: 'item',
      formatter: '{b} : {c} bytes ({d}%)'
    },
    calculable: true,
    series: [
      {
        name: 'Language',
        type: 'pie',
        data: []
      }
    ]
  };

  asyncOptions: Observable<any>;

  constructor(private gitService: GitService) { }

  ngOnInit(): void {
    this.buildChart();
  }

  buildChart(): void {

    this.gitService.getStats().toPromise().then(
        (map: Map<string, number>) => {
          for (const entry of map.entries()) {
            this.options.series[0].data.push({value: entry[1], name: entry[0]});
          }
        }
      ).then(() => this.asyncOptions = of(this.options));
  }

}
