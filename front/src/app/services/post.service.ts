import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDataLike, IDataPost, IPostForUpdate, ISinglePost } from '../../models/post';
import { IApi } from '../../models/api';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) {
  }

  getAllPosts(): Observable<IDataPost> {
    return this.http.get<IDataPost>(environment.base_url_posts + '/all')
  }

  getPost(cid: string | null): Observable<ISinglePost> {
    return this.http.get<ISinglePost>(environment.base_url_posts + '/' + cid)
  }

  getLikes(): Observable<IDataLike> {
    return this.http.get<IDataLike>(environment.base_url_posts + '/like')
  }

  addLike(cid: string | null): Observable<IApi> {
    return this.http.post<IApi>(environment.base_url_posts + '/' + cid + '/like', {})
  }

  addPost(image: File, post: IPostForUpdate): Observable<IApi> {
    const formData = new FormData();
    formData.append('post', JSON.stringify(post));
    formData.append('image', image);
    return this.http.put<IApi>(environment.base_url_posts, formData)
  }

  updatePost(image: File, post: IPostForUpdate, postId: number | undefined): Observable<IApi> {
    const formData = new FormData();
    formData.append('post', JSON.stringify(post));
    formData.append('image', image);
    return this.http.patch<IApi>(environment.base_url_posts + '/' + postId, formData)
  }

  trashPost(cid: number | undefined): Observable<IApi> {
    return this.http.delete<IApi>(environment.base_url_posts + '/trash/' + cid)
  }
}
