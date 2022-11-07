import { Component, OnInit } from '@angular/core';
import { IPost, IPostForUpdate } from '../../../../models/post';
import { PostService } from '../../../services/post.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addPost',
  templateUrl: './addPost.component.html',
  styleUrls: ['./addPost.component.css']
})
export class AddPostComponent implements OnInit {

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

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.initEmptyForm();
  }

  async onSubmit() {
    await this.postService.addPost(this.postForm.get('image')!.value, this.post).toPromise()
    await this.router.navigate(['/authenticate']);
  }

  initEmptyForm() {
    this.postForm = this.formBuilder.group({
      image: ['', Validators.required],
    });
  }

  // TODO refactor (editPost)
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
}
