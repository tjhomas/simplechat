import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConversationComponent } from './conversation.component';
import { FormsModule } from '@angular/forms';
import {
  NbInputModule,
  NbButtonModule,
  NbFormFieldModule,
  NbChatComponent,
  NbChatModule,
} from '@nebular/theme';

@NgModule({
  declarations: [ConversationComponent],
  imports: [
    CommonModule,
    FormsModule,
    NbInputModule,
    NbButtonModule,
    NbFormFieldModule,
    NbChatModule,
  ],
  exports: [ConversationComponent],
})
export class ConversationModule {}
