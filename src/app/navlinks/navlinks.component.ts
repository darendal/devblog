import {Component, OnInit} from '@angular/core';
import {NavLink} from '../models/NavLink';
import {PostsService} from '../services/posts/posts.service';
import {Observable} from 'rxjs';
import {Post} from '../models/Post';

@Component({
  selector: 'app-navlinks',
  templateUrl: './navlinks.component.html',
  styleUrls: ['./navlinks.component.scss']
})
export class NavlinksComponent implements OnInit {

  navLinks: NavLink[] = [
    {path: 'about', label: 'About', isActive: true},
    {path: 'experience', label: 'Experience', isActive: false},
    {path: 'skills', label: 'Skills', isActive: false}
  ];

  latestPosts$: Observable<Post[]>;

  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
    this.latestPosts$ = this.postsService.getLatestPosts(3);
  }


}
