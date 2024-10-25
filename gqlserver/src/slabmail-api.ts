import { RESTDataSource } from '@apollo/datasource-rest';
import { Message } from './__generated__/resolvers-types';

export class SlabmailAPI extends RESTDataSource {
  override baseURL = 'http://localhost:3000/api/';

  async getMessage(id: string): Promise<Message> {
    return this.get<Message>(`messages/${encodeURIComponent(id)}`);
  }

  async getMessages(): Promise<Message[]> {
    return this.get<Message[]>('messages');
  }

  async starMessage(id: string): Promise<Message> {
    return this.put<Message>(`messages/${encodeURIComponent(id)}/star`);
  }

  async unstarMessage(id: string): Promise<Message> {
    return this.put<Message>(`messages/${encodeURIComponent(id)}/unstar`);
  }
}