import { IRecordDB } from '../modules/irecorddb';

class Database {
  public db: IDBDatabase | null = null;

  public init(dbName: string, version?: number): void {
    const iDB = window.indexedDB;
    const openRequest = iDB.open(dbName, version);

    openRequest.onupgradeneeded = () => {
      const database = openRequest.result;
      const store = database.createObjectStore('scoreCollection', {
        keyPath: 'id',
        autoIncrement: true,
      });
      store.createIndex('name', 'name');
      store.createIndex('email', 'email');
      store.createIndex('score', 'score');
      this.db = database;
    };

    openRequest.onsuccess = () => {
      this.db = openRequest.result;
    };

    openRequest.onerror = () => {
      Error('Do not init database');
    };
  }

  public write(_name: string, _email: string, _score: number): void {
    const transaction = this.db!.transaction('scoreCollection', 'readwrite');
    const store = transaction.objectStore('scoreCollection');

    const result = store?.add({
      name: `${_name}`,
      email: `${_email}`,
      score: _score,
    });

    result.onsuccess = () => {
      // console.log(result.result);
    };

    result.onerror = () => {
      Error('Do not write to database');
    };
  }

  public read(collection: string): Promise<Array<IRecordDB>> {
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(collection, 'readwrite');
      const store = transaction.objectStore(collection);
      const result = store.getAll();

      transaction.oncomplete = () => {
        resolve(result.result);
      };

      transaction.onerror = () => {
        reject(new Error('Do not read base'));
      };
    });
  }

  public sortScore(collection: string): Promise<Array<IRecordDB>> {
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(collection, 'readwrite');
      const store = transaction.objectStore(collection);
      const result = store.index('score').openCursor(null, 'prev');
      const data: Array<IRecordDB> = [];

      result.onsuccess = () => {
        const cursor = result.result;
        if (cursor) {
          data.push(cursor.value);
          cursor.continue();
        }
      };

      transaction.oncomplete = () => {
        resolve(data);
      };

      transaction.onerror = () => {
        reject(new Error('Do not read and sort base'));
      };
    });
  }
}

export const database = new Database();
