import {Component, OnInit} from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer, Title} from '@angular/platform-browser';
import {NavLink} from './models/NavLink';
import {LinkLogo} from './models/LinkLogo';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter, map, mergeMap} from 'rxjs/operators';
import {Logo} from './models/Logo';

const staticLogos: Logo[] = [
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

  navLinks: NavLink[] = [
    {path: 'about', label: 'About', isActive: true},
    {path: 'experience', label: 'Experience', isActive: false},
    {path: 'skills', label: 'Skills', isActive: false}
  ];

  constructor(private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private titleService: Title) { }

  ngOnInit(): void {
    this.enableTitleChange();
    this.loadLogos();
  }

  enableTitleChange(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) { route = route.firstChild; }
        return route;
      }),
      filter(route => route.outlet === 'primary'),
      mergeMap(route => route.data)
    )
      .subscribe((event) => this.titleService.setTitle(event.title));
  }

  loadLogos(): void {
    this.logos.forEach(l => this.matIconRegistry.addSvgIcon(
      l.id,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/${l.filename}`)
    ));

    staticLogos.forEach(l => this.matIconRegistry.addSvgIcon(
      l.id,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/${l.filename}`)
    ));
  }
}

