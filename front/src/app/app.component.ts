import { Component } from '@angular/core';
import { ApiErrorService } from './services/apiError.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Groupomania';
  message = ''
  display = false

  constructor(private apiErrorService: ApiErrorService){}

  ngOnInit(){
    this.apiErrorService.apiError.subscribe(
      data => {
        this.message = data
        this.display = true
      }
    )
  }

  clearMessage(){
    this.message = ''
    this.display = false
  }

}
