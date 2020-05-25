import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { Conversation, Message } from 'src/app/models/user';
import { ChatService } from 'src/app/services/chat.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss'],
})
export class ConversationComponent implements OnInit, OnDestroy {
  public conversation$: Observable<Conversation> = new Observable<
    Conversation
  >();
  private destroy$: Subject<void> = new Subject<void>();

  private chatId: string;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly chatService: ChatService,
    public readonly auth: AuthService
  ) {}

  ngOnInit(): void {
    this.initializeConversation();
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
  }

  private initializeConversation(): void {
    this.chatId = this.route.snapshot.paramMap.get('conversationId');
    this.conversation$ = this.chatService.getChat(this.chatId);
  }

  trackMessageBy(msg: Message) {
    return msg.content;
  }

  sendMessage(ev: { message: string }) {
    this.chatService.sendMessage(this.chatId, ev.message);
  }

  async createChat(): Promise<void> {
    const doc = await this.chatService.createChat();
    await this.router.navigate(['conversation', doc.id]);
    this.initializeConversation();
  }
}
