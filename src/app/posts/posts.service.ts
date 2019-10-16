import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';      // for communicating with server
import { Subject } from 'rxjs';

import { Post } from './post.model';

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  // inject HttpClient into service to communicate with server
  constructor(private httpclient: HttpClient) {}

  getPosts() {
    this.httpclient.get<{message: string, posts: Post[]}>('http://localhost:3000/api/posts')      // Observables are required to "listen" for responses
      .subscribe((postData) => {     // do not need to unsubscribe b/c Observables do that already
        this.posts = postData.posts;      // setting local client posts equal to posts coming from server
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = { id: null, title: title, content: content };
    this.httpclient.post<{message: string}>('http://localhost:3000/api/posts', post)
      .subscribe((responseData) => {
        console.log(responseData.message);
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      });
  }
}
