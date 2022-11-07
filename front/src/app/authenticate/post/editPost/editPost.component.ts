import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../../services/post.service';
import { IPost, IPostForUpdate } from '../../../../models/post';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editPost',
  templateUrl: './editPost.component.html',
  styleUrls: ['./editPost.component.css']
})
export class EditPostComponent implements OnInit {

  post: IPost = {
    id: 0,
    userId: 0,
    title: '',
    content: '',
    pictureUrl: '',
    createdAt: '',
    updatedAt: '',
    deletedAt: null
  }
  postForm!: FormGroup;
  imagePreview!: string;
  postForUpdate: IPostForUpdate = {
    title: '',
    content: '',
  }

  constructor(
    private activated: ActivatedRoute,
    private postService: PostService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    let cid = this.activated.snapshot.paramMap.get('id')
    this.postService.getPost(cid).subscribe(
      data => {
        this.post = data.data
        this.imagePreview = data.data.pictureUrl
      }
    )
    this.initEmptyForm();
  }

  // TODO refactor (addPost)
  onFileAdded(event: Event) {
    const file = (event.target as HTMLInputElement).files![0];
    this.postForm.get('image')!.setValue(file);
    this.postForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  initEmptyForm() {
    this.postForm = this.formBuilder.group({
      image: ['', Validators.required],
    });
  }

  async onSubmit() {
    this.postForUpdate.title = this.post.title
    this.postForUpdate.content = this.post.content
    await this.postService.updatePost(this.postForm.get('image')!.value, this.postForUpdate, this.post.id).toPromise()
    await this.router.navigate(['/authenticate']);
  }

}
