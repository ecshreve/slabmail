import { RESTDataSource } from '@apollo/datasource-rest';
import { Message, MessageConnection } from './__generated__/resolvers-types';

export class SlabmailAPI extends RESTDataSource {
  override baseURL = 'http://localhost:3000/api/';

  async getMessage(id: string): Promise<Message> {
    return this.get<Message>(`messages/${encodeURIComponent(id)}`);
  }

  async getMessages(after?: number, first?: number): Promise<MessageConnection> {
    return this.get<MessageConnection>(`messages?${after ? `after=${after}` : ''}${first ? `&first=${first}` : ''}`);
  }

  async starMessage(id: string): Promise<Message> {
    return this.put<Message>(`messages/${encodeURIComponent(id)}/star`);
  }

  async unstarMessage(id: string): Promise<Message> {
    return this.put<Message>(`messages/${encodeURIComponent(id)}/unstar`);
  }
}