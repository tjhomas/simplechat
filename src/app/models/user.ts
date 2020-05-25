export interface User {
  uid: string;
  name: string;
  email: string;
  photo: string;
}

export interface Conversation {
  owner: string;
  created: any;
  users: { [key: string]: User };
  pendingApproval: Array<User>;
  messages: Array<Message>;
}

export interface Message {
  content: string;
  timestamp: any;
  uid: string;
}
