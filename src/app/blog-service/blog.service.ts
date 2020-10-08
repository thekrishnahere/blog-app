import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as Stomp from 'stompjs';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private serverUrl = 'ws://localhost:8899/websocket/websocket';
  private stompClient;
  public responseMessages: Subject<string>;

  constructor() {
    this.responseMessages = new Subject();
  }

  connect() {
    const socket = new WebSocket(this.serverUrl);
    this.stompClient = Stomp.over(socket);

    let that = this;
    this.stompClient.connect({}, () => {
      that.stompClient.subscribe('/topic/blog', (frame: Stomp.Frame) => {
        if (frame.command === 'MESSAGE') {
          this.responseMessages.next(frame.body);
          console.log('message received from server', frame);
        }
      });
    });
  }

  sendMessage(message: string) {
    this.stompClient.send('/app/topic/activity', {}, message);
  }
}
