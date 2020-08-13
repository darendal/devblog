import { Component, OnInit } from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {Logo} from '../models/Logo';

const logos: Logo[] = [
  {id: 'angular', filename: 'angular.svg'},
  {id: 'c++', filename: 'C++-01.svg'},
  {id: 'c-sharp', filename: 'C-Sharp-01.svg'},
  {id: 'django', filename: 'django.svg'},
  {id: 'docker', filename: 'docker.svg'},
  {id: 'firebase', filename: 'Firebase-02.svg'},
  {id: 'html', filename: 'HTML-5-01.svg'},
  {id: 'java', filename: 'java.svg'},
  {id: 'javascript', filename: 'javascript.svg'},
  {id: '.net', filename: 'net.svg'},
  {id: 'postgres', filename: 'postgres.svg'},
  {id: 'python', filename: 'python.svg'},
  {id: 'rust', filename: 'rust.svg'},
  {id: 'typescript', filename: 'typescript.svg'},
  {id: 'go', filename: 'go.svg'},
];

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

  constructor(private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer) { }

  ngOnInit(): void {

    logos.forEach(l => this.matIconRegistry.addSvgIcon(
      l.id,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/${l.filename}`)
    ));
  }

}
