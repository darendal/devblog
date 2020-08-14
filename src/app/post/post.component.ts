import {Component, Input, OnInit} from '@angular/core';
import {PostsService} from '../services/posts/posts.service';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {Post} from '../models/Post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  post: Observable<Post>;

  constructor(private route: ActivatedRoute,
              private postsService: PostsService) { }

  ngOnInit(): void {
    const postId = Number(this.route.snapshot.paramMap.get('id'));

    this.post = this.postsService.getPostById(postId);
  }

}
