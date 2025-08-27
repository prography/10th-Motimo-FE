export const DB_NAME = "motimo-guest";
const DB_VERSION = 1;
type StoreName =
  | "users"
  | "goals"
  | "subGoals"
  | "todos"
  | "todoResults"
  | "groups"
  | "cheers"
  | "points";
class IndexedDBService {
  private db: IDBDatabase | null = null;

  // DB 연결을 초기화하는 메서드. 앱 시작 시 한 번만 호출하면 됨.
  public async init(): Promise<void> {
    // 이미 연결되어 있다면 다시 실행하지 않음
    if (this.db) {
      return;
    }

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => {
        console.error("IndexedDB를 열 수 없습니다.");
        reject(request.error);
      };

      request.onsuccess = () => {
        this.db = request.result;
        console.log("IndexedDB가 성공적으로 연결되었습니다.");
        resolve();
      };

      // DB 버전이 변경되거나 처음 생성될 때 호출됨 (스키마 정의)
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // id를 keyPath로 지정하여 고유 키로 사용
        if (!db.objectStoreNames.contains("users")) {
          const store = db.createObjectStore("users", {
            keyPath: "id",
          });
          store.add({
            id: "me",
            email: "-",
          });

          // 'title'로 검색할 수 있도록 인덱스 생성 (선택 사항)
          store.createIndex("title_idx", "title", { unique: false });
        }
        // id를 keyPath로 지정하여 고유 키로 사용
        if (!db.objectStoreNames.contains("points")) {
          const store = db.createObjectStore("points", { keyPath: "id" });
          store.add({ point: 0, id: "me" });
        }
        // id를 keyPath로 지정하여 고유 키로 사용
        if (!db.objectStoreNames.contains("cheers")) {
          const store = db.createObjectStore("cheers", { keyPath: "id" });
          store.add({
            cheerPhrase: "힘내세요!",
            id: "me",
          });

          // 'title'로 검색할 수 있도록 인덱스 생성 (선택 사항)
          store.createIndex("title_idx", "title", { unique: false });
        }
        // id를 keyPath로 지정하여 고유 키로 사용
        if (!db.objectStoreNames.contains("goals")) {
          const store = db.createObjectStore("goals", {
            keyPath: "id",
            autoIncrement: true,
          });

          // 'title'로 검색할 수 있도록 인덱스 생성 (선택 사항)
          store.createIndex("title_idx", "title", { unique: false });
        }
        // id를 keyPath로 지정하여 고유 키로 사용
        if (!db.objectStoreNames.contains("subGoals")) {
          const store = db.createObjectStore("subGoals", {
            keyPath: "id",
            autoIncrement: true,
          });

          // 'title'로 검색할 수 있도록 인덱스 생성 (선택 사항)
          store.createIndex("title_idx", "title", { unique: false });
        }
        // id를 keyPath로 지정하여 고유 키로 사용
        if (!db.objectStoreNames.contains("todos")) {
          const store = db.createObjectStore("todos", {
            keyPath: "id",
            autoIncrement: true,
          });

          // 'title'로 검색할 수 있도록 인덱스 생성 (선택 사항)
          store.createIndex("title_idx", "title", { unique: false });
        }
        // id를 keyPath로 지정하여 고유 키로 사용
        if (!db.objectStoreNames.contains("todo-results")) {
          const store = db.createObjectStore("todo-results", {
            keyPath: "id",
            autoIncrement: true,
          });

          // 'title'로 검색할 수 있도록 인덱스 생성 (선택 사항)
          //   store.createIndex("title_idx", "title", { unique: false });
        }
      };
    });
  }

  // DB 인스턴스를 가져오는 private 헬퍼 메서드
  private async getDB(): Promise<IDBDatabase> {
    if (!this.db) {
      await this.init();
    }
    return this.db!;
  }

  // --- CRUD 메서드 ---

  // 데이터 추가 (Create)
  public async add<T>(storeName: StoreName, data: Omit<T, "id">): Promise<T> {
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, "readwrite");
      const store = transaction.objectStore(storeName);
      const request = store.add(data);

      request.onsuccess = () => {
        // 추가된 데이터의 ID를 포함하여 반환
        const insertedId = request.result as number;
        resolve({ ...data, id: insertedId } as T);
      };
      request.onerror = () => reject(request.error);
    });
  }

  // 모든 데이터 조회 (Read All)
  public async getAll<T>(storeName: StoreName): Promise<T[]> {
    const db = await this.getDB();

    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, "readonly");

      const store = transaction.objectStore(storeName);

      const request = store.getAll();

      request.onsuccess = () => resolve(request.result);
      request.onerror = (ev) => {
        return reject(request.error);
      };
    });
  }

  // 특정 데이터 조회 (Read One)
  public async get<T>(
    storeName: StoreName,
    id: string,
  ): Promise<T | undefined> {
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, "readonly");
      const store = transaction.objectStore(storeName);
      const request = store.get(id);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  // 데이터 수정 (Update)
  public async put<T extends { id: string }>(
    storeName: StoreName,
    data: T,
  ): Promise<T> {
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, "readwrite");
      const store = transaction.objectStore(storeName);
      // put은 데이터가 있으면 수정, 없으면 추가함
      const request = store.put(data);

      request.onsuccess = () => resolve(data);
      request.onerror = () => reject(request.error);
    });
  }

  // 데이터 삭제 (Delete)
  public async delete(storeName: StoreName, id: string): Promise<void> {
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, "readwrite");
      const store = transaction.objectStore(storeName);
      const request = store.delete(id);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }
}

// 싱글톤 인스턴스를 생성하여 export
export const dbService = new IndexedDBService();
