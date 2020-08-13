import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.sass']
})
export class SkillsComponent implements OnInit {

  languages: string[] = [
    'c++',
    'c-sharp',
    'java',
    'rust',
    'python',
    'go',
    'typescript',
    'javascript',
    'html',
  ];

  frameworks: string[] = [
    'angular',
    'django',
    '.net',
    'firebase',
    'docker',
    'postgres'
  ];

  constructor() { }

  ngOnInit(): void {}

}
