import Dexie from 'dexie';
import { Label } from './types/Label';

export class LabelDatabase extends Dexie {
  labels: Dexie.Table<Label, number>;

  constructor() {
    super('LabelDatabase');
    this.version(1).stores({
      labels: '++id, name'
    });
    this.labels = this.table('labels');
  }

  async saveLabels(labels: Label[]) {
    await this.labels.bulkPut(labels);
  }

  async getLabels(): Promise<Label[]> {
    return await this.labels.toArray();
  }

  async getLabelById(id: number): Promise<Label | undefined> {
    return await this.labels.get(id);
  }

  async deleteLabel(id: number) {
    await this.labels.delete(id);
  }
}

export const labelDB = new LabelDatabase();

