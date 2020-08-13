import {Component, OnInit} from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {Logo} from './models/Logo';

export interface LinkLogo extends Logo {
  link: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  logos: LinkLogo[] = [
    {id: 'linkedin', filename: 'linkedin.svg', link: 'https://www.linkedin.com/in/brendanrware/'},
    {id: 'stack_overflow', filename: 'stack_overflow.svg', link: 'https://stackoverflow.com/users/2442295/darendal'},
    {id: 'github', filename: 'github.svg', link: 'https://github.com/darendal'},
  ];

  title = 'devblog';

  navLinks = [
    {path: 'about', label: 'About', isActive: true},
    {path: 'experience', label: 'Experience', isActive: false},
    {path: 'skills', label: 'Skills', isActive: false}
  ];


  constructor(private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer) { }

  ngOnInit(): void {

    this.logos.forEach(l => this.matIconRegistry.addSvgIcon(
      l.id,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/${l.filename}`)
    ));
  }
}

