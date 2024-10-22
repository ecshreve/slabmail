import Dexie from 'dexie';
import { Message } from './types/Email';
import { Label } from './types/Label';

export class SlabMailDatabase extends Dexie {
  labels: Dexie.Table<Label, string>;
  messages: Dexie.Table<Message, string>;

  constructor() {
    super('SlabMailDatabase');
    this.version(1).stores({
      labels: 'id, name',
      messages: 'id, *labelIds'
    });
    this.labels = this.table('labels');
    this.messages = this.table('messages');
    
  }

  async saveLabels(labels: Label[]) {
    await this.labels.bulkPut(labels);
  }

  async getLabels(): Promise<Label[]> {
    return await this.labels.toArray();
  }

  async getLabelById(id: string): Promise<Label | undefined> {
    return await this.labels.get(id);
  }

  async deleteLabel(id: string) {
    await this.labels.delete(id);
  }

  async saveMessages(messages: Message[]) {
    await this.messages.bulkPut(messages);
  }

  async getMessages(): Promise<Message[]> {
    return await this.messages.toArray();
  }

  async getMessageById(id: string): Promise<Message | undefined> {
    return await this.messages.get(id);
  }

  async deleteMessage(id: string) {
    await this.messages.delete(id);
  }

  async getMessagesByLabelId(labelId: string): Promise<Message[]> {
    return await this.messages.where('labelIds').equals(labelId).toArray();
  }

}

export const slabMailDB = new SlabMailDatabase();
