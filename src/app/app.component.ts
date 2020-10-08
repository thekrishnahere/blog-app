import { Component, OnInit } from '@angular/core';
import { BlogService } from './blog-service/blog.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  respMessage: string;
  constructor(private blogService: BlogService) {}
  ngOnInit(): void {
    this.blogService.connect();
    this.blogService.responseMessages.subscribe((msg) => {
      this.respMessage = msg;
    });
  }
  sendMessage() {
    console.log('sending Message');
    this.blogService.sendMessage("This is message 'from client'");
  }
}
