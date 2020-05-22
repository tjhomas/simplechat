export interface User {
  uid: string;
  name: string;
  email: string;
  photo: string;
}

export interface Conversation {
  owner: string;
  created: string;
  users: User[];
  messages: Message[];
}

export interface Message {
  content: string;
  timestamp: string;
  uid: string;
}
