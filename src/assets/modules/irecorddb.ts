export interface IRecordDB {
  name: string;
  email: string;
  score: number;
  id?: IDBValidKey;
}
