import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICommentForUpdate, IDataComment, ISingleComment } from '../../models/comment';
import { IApi } from '../../models/api';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) {
  }

  getAllComments(): Observable<IDataComment> {
    return this.http.get<IDataComment>(environment.base_url_comments + '/all')
  }

  getComment(cid: string | null): Observable<ISingleComment> {
    return this.http.get<ISingleComment>(environment.base_url_comments + '/' + cid)
  }

  addComment(post: ICommentForUpdate): Observable<IApi> {
    return this.http.put<IApi>(environment.base_url_comments, post)
  }

  updateComment(post: ICommentForUpdate, postId: number | undefined): Observable<IApi> {
    return this.http.patch<IApi>(environment.base_url_comments + '/' + postId, post)
  }

  trashComment(cid: number | undefined): Observable<IApi> {
    return this.http.delete<IApi>(environment.base_url_comments + '/trash/' + cid)
  }
}
