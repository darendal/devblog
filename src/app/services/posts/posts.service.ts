import { Injectable } from '@angular/core';
import {Post, posts} from '../../models/Post';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor() { }

  getLatestPosts(limit: number): Observable<Post[]> {
    return of(posts
      .sort((a, b) =>  a.publishDate.getTime() - b.publishDate.getTime())
      .slice(0, limit)
    );
  }

  getPostById(id: number): Observable<Post> {
    return of(posts.find(e => e.id === id));
  }
}
