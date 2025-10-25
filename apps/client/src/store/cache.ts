type StoreCacheProps<T> = {
  data: T;
  timestamp: number;
};

class StoreCache {
  private _store = new Map<string, StoreCacheProps<any>>();
  private _ttl: number;

  constructor(ttl: number = 60_000) {
    this._ttl = ttl;
  }

  get<T>(key: string): T | null {
    const data = this._store.get(key);
    if (!data) return null;

    const isExpired = Date.now() - data.timestamp > this._ttl;

    if (isExpired) {
      this._store.delete(key);
      return null;
    }

    return data.data;
  }

  set<T extends string, U = any>(key: T, data: U) {
    this._store.set(key, {
      data,
      timestamp: Date.now(),
    });
  }
}

export const cache = new StoreCache(30_000);
