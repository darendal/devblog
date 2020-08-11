import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'devblog';

  navLinks = [
    {path: 'about', label: 'About', isActive: true},
    {path: 'experience', label: 'Experience', isActive: false},
    {path: 'skills', label: 'Skills', isActive: false}
  ]

  test() {
    console.log(this.navLinks)
  }
}

