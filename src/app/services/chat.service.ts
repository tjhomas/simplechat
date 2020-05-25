import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Conversation } from '../models/user';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private readonly collection: string = 'conversations';

  constructor(
    private readonly afs: AngularFirestore,
    private readonly auth: AuthService
  ) {}

  public getChat(conversationId: string): Observable<Conversation> {
    return this.afs
      .collection(this.collection)
      .doc(conversationId)
      .snapshotChanges()
      .pipe(map((doc) => doc.payload.data() as Conversation));
  }

  public createChat(): Promise<DocumentReference> {
    const user = this.auth.user$.getValue();
    return this.afs.collection(this.collection).add({
      created: firebase.firestore.FieldValue.serverTimestamp(),
      owner: user.uid,
      users: { [user.uid]: user },
      pendingApproval: [],
      messages: [],
    } as Conversation);
  }

  public sendMessage(conversationId: string, message: string): Promise<any> {
    const data = {
      uid: this.auth.user$.getValue().uid,
      timestamp: firebase.firestore.Timestamp.now(),
      content: message,
    };
    return this.afs
      .collection(this.collection)
      .doc(conversationId)
      .update({
        messages: firebase.firestore.FieldValue.arrayUnion(data),
      });
  }
}
