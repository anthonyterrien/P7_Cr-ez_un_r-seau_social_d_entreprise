import { Component, OnInit } from '@angular/core';
import { ILike, IPost } from '../../../../models/post';
import { PostService } from '../../../services/post.service';
import { TokenService } from '../../../services/token.service';
import { ITokenUser } from '../../../../models/user';
import { IComment } from '../../../../models/comment';
import { UserService } from '../../../services/user.service';
import { CommentService } from '../../../services/comment.service';

@Component({
  selector: 'app-postMainPage',
  templateUrl: './postMainPage.component.html',
  styleUrls: ['./postMainPage.component.scss']
})
export class PostMainPageComponent implements OnInit {

  commentList: IComment[] = []
  commentListFilter: IComment[] = []
  postList: IPost[] = []
  likeList: ILike[] = []
  likeListFilter: ILike[] = []
  user: ITokenUser = {
    id: 0,
    role: '',
    lastName: '',
    firstName: '',
    email: ''
  }
  comment: IComment = {
    id: 0,
    postId: 0,
    userId: 0,
    content: '',
    createdAt: '',
    updatedAt: '',
    deletedAt: null
  }
  editPost: boolean | undefined;
  editComment: boolean | undefined;
  modifiedPost: boolean | undefined;
  modifiedComment: boolean | undefined;
  open: any;
  userList: any;

  constructor(private postService: PostService,
              private commentService: CommentService,
              private userService: UserService,
              private tokenService: TokenService) {
  }

  ngOnInit(): void {
    this.loadContentPage()
  }

  loadContentPage() {
    this.initUserList();
    this.initPostList();
    this.initCommentList();
    this.initLikeList();
    this.user = this.tokenService.getPayload()
  }

  initUserList() {
    this.userService.getAllUsers().subscribe(
      data => {
        this.userList = data.data
      })
  }

  async initPostList() {
    this.postService.getAllPosts().subscribe(
      async data => {
        await this.sortedByDate(data).then(
          data => {
            this.postList = data
          })
      }
    )
  }

  async initCommentList() {
    this.commentService.getAllComments().subscribe(
      async data => {
        await this.sortedByDate(data).then(
          data => {
            this.commentList = data
          })
      }
    )
  }

  initLikeList() {
    this.postService.getLikes().subscribe(
      data => {
        this.likeList = data.data
      })
  }

  async sortedByDate(data: any) {
    return data.data.sort((a: { createdAt: Date; }, b: { createdAt: Date; }) => {
      const dateA = new Date(a.createdAt as Date);
      const dateB = new Date(b.createdAt as Date);
      if (dateA < dateB) {
        return 0;
      }
      if (dateA > dateB) {
        return -1;
      }
      return 1;
    });
  }

  openComment(id: any) {
    if (this.open) {
      this.open = undefined
    } else {
      this.open = id
    }
  }

  permissionModify(post: any, comment: boolean) {
    this.initModified(post, comment)
    this.displayComment(post.id);
    this.displayLike(post.id);
    if (post.userId === this.user.id || this.user.role === 'admin') {
      if (!comment) {
        this.editPost = true
      } else {
        this.editComment = true
      }
      return 'editeurContainer'
    } else {
      if (!comment) {
        this.editPost = false
      } else {
        this.editComment = false
      }
      return 'editeurContainerTwo'
    }
  }

  initModified(post: any, comment: boolean) {
    if (comment) {
      this.modifiedComment = post.createdAt !== post.updatedAt;
    } else {
      this.modifiedPost = post.createdAt !== post.updatedAt;
    }
  }

  createdBy(listUser: any, uid: any) {
    if (listUser.id === uid) {
      return listUser.pseudo
    }
  }

  displayComment(pId: any) {
    this.commentListFilter = []
    let passingCount: number = 0
    for (let comment of this.commentList) {
      passingCount++
      if (comment.postId === pId) {
        this.commentListFilter.push(comment)
      }
      if (passingCount === this.commentList.length) {
        return this.commentListFilter
      }
    }
    return
  }

  displayLike(pId: any) {
    this.likeListFilter = []
    let passingCount: number = 0
    for (let like of this.likeList) {
      passingCount++
      if (like.postId === pId) {
        this.likeListFilter.push(like)
      }
      if (passingCount === this.likeList.length) {
        return this.likeListFilter
      }
    }
    return
  }

  async addLike(pId: any) {
    await this.postService.addLike(pId).toPromise()
    this.initLikeList()
    this.displayLike(pId)
  }

  getIfLiked(pId: any) {
    let passingCount: number = 0
    for (let like of this.likeListFilter) {
      passingCount++
      if (like.postId === pId && like.userIdLiked === this.user.id) {
        return true
      } else if (this.likeList.length === passingCount) {
        return false
      }
    }
    return
  }

  async onSubmit(pId: any, f: any) {
    this.comment.userId = this.user.id
    this.comment.postId = pId
    const data = await this.commentService.addComment(this.comment).toPromise();
    if (data) {
      console.log(data.message)
      f.resetForm()
      await this.initCommentList()
    }
  }

  async deletePost(Id: any, comment: boolean) {
    let isExecuted = confirm("Voulez-vous vraiment supprimer ?");
    if (isExecuted && comment) {
      await this.commentService.trashComment(Id).toPromise();
      await this.initCommentList()

    } else if (isExecuted && !comment) {
      await this.postService.trashPost(Id).toPromise();
      await this.initPostList()
    } else {
      return
    }
  }
}
