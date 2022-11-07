import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IComment, ICommentForUpdate } from '../../../../models/comment';
import { CommentService } from '../../../services/comment.service';

@Component({
  selector: 'app-editComment',
  templateUrl: './editComment.component.html',
  styleUrls: ['./editComment.component.css']
})
export class EditCommentComponent implements OnInit {

  comment: IComment = {
    id: 0,
    postId: 0,
    userId: 0,
    content: '',
    createdAt: '',
    updatedAt: '',
    deletedAt: null
  }
  commentForUpdate: ICommentForUpdate = {
    content: '',
  }

  constructor(
    private commentService: CommentService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    let cid = this.route.snapshot.paramMap.get('id')
    this.commentService.getComment(cid).subscribe(
      data => {
        this.comment = data.data
      }
    )
  }

  async onSubmit() {
    this.commentForUpdate.content = this.comment.content
    await this.commentService.updateComment(this.commentForUpdate, this.comment.id).toPromise()
    await this.router.navigate(['/authenticate']);
  }

}
