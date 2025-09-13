/**
 * Offline manager using IndexedDB for browser-native data persistence
 * Handles caching, sync, and offline functionality
 */

import type { BenefitProgram } from './apiClient';

interface CachedProgram extends BenefitProgram {
  lastUpdated: number;
  offline: boolean;
}

interface UserSearchHistory {
  id: string;
  query: string;
  filters: any;
  timestamp: number;
  results: number;
}

interface OfflineQueue {
  id: string;
  action: string;
  data: any;
  timestamp: number;
  retries: number;
}

class OfflineManager {
  private dbName = 'LifelineNavigatorDB';
  private version = 1;
  private db: IDBDatabase | null = null;

  async initialize(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // Programs store
        if (!db.objectStoreNames.contains('programs')) {
          const programStore = db.createObjectStore('programs', { keyPath: 'id' });
          programStore.createIndex('category', 'category', { unique: false });
          programStore.createIndex('state', 'state', { unique: false });
          programStore.createIndex('audienceTier', 'audienceTier', { unique: false });
          programStore.createIndex('lastUpdated', 'lastUpdated', { unique: false });
        }

        // Search history store
        if (!db.objectStoreNames.contains('searchHistory')) {
          const searchStore = db.createObjectStore('searchHistory', { keyPath: 'id' });
          searchStore.createIndex('timestamp', 'timestamp', { unique: false });
        }

        // Offline queue store
        if (!db.objectStoreNames.contains('offlineQueue')) {
          const queueStore = db.createObjectStore('offlineQueue', { keyPath: 'id' });
          queueStore.createIndex('timestamp', 'timestamp', { unique: false });
        }

        // User favorites store
        if (!db.objectStoreNames.contains('favorites')) {
          const favoritesStore = db.createObjectStore('favorites', { keyPath: 'programId' });
          favoritesStore.createIndex('timestamp', 'timestamp', { unique: false });
        }

        // Application tracking store
        if (!db.objectStoreNames.contains('applications')) {
          const appsStore = db.createObjectStore('applications', { keyPath: 'id' });
          appsStore.createIndex('status', 'status', { unique: false });
          appsStore.createIndex('programId', 'programId', { unique: false });
        }
      };
    });
  }

  // Programs management
  async cachePrograms(programs: BenefitProgram[]): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    const transaction = this.db.transaction(['programs'], 'readwrite');
    const store = transaction.objectStore('programs');

    const cachedPrograms: CachedProgram[] = programs.map(program => ({
      ...program,
      lastUpdated: Date.now(),
      offline: false,
    }));

    for (const program of cachedPrograms) {
      store.put(program);
    }

    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  }

  async getCachedPrograms(filters?: {
    category?: string;
    state?: string;
    audienceTier?: string;
    maxAge?: number;
  }): Promise<CachedProgram[]> {
    if (!this.db) throw new Error('Database not initialized');

    const transaction = this.db.transaction(['programs'], 'readonly');
    const store = transaction.objectStore('programs');

    return new Promise((resolve, reject) => {
      const request = store.getAll();
      
      request.onsuccess = () => {
        let programs = request.result as CachedProgram[];

        // Apply filters
        if (filters) {
          const maxAge = filters.maxAge || 24 * 60 * 60 * 1000; // 24 hours default
          const cutoff = Date.now() - maxAge;

          programs = programs.filter(program => {
            if (program.lastUpdated < cutoff) return false;
            if (filters.category && program.category !== filters.category) return false;
            if (filters.audienceTier && program.audienceTier !== filters.audienceTier) return false;
            return true;
          });
        }

        resolve(programs);
      };

      request.onerror = () => reject(request.error);
    });
  }

  // Search history management
  async saveSearchHistory(query: string, filters: any, resultCount: number): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    const transaction = this.db.transaction(['searchHistory'], 'readwrite');
    const store = transaction.objectStore('searchHistory');

    const searchEntry: UserSearchHistory = {
      id: `search-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      query,
      filters,
      timestamp: Date.now(),
      results: resultCount,
    };

    store.add(searchEntry);

    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  }

  async getSearchHistory(limit = 50): Promise<UserSearchHistory[]> {
    if (!this.db) throw new Error('Database not initialized');

    const transaction = this.db.transaction(['searchHistory'], 'readonly');
    const store = transaction.objectStore('searchHistory');
    const index = store.index('timestamp');

    return new Promise((resolve, reject) => {
      const request = index.openCursor(null, 'prev');
      const results: UserSearchHistory[] = [];

      request.onsuccess = (event) => {
        const cursor = (event.target as IDBRequest).result;
        if (cursor && results.length < limit) {
          results.push(cursor.value);
          cursor.continue();
        } else {
          resolve(results);
        }
      };

      request.onerror = () => reject(request.error);
    });
  }

  // Favorites management
  async addToFavorites(programId: string): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    const transaction = this.db.transaction(['favorites'], 'readwrite');
    const store = transaction.objectStore('favorites');

    const favorite = {
      programId,
      timestamp: Date.now(),
    };

    store.put(favorite);

    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  }

  async removeFromFavorites(programId: string): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    const transaction = this.db.transaction(['favorites'], 'readwrite');
    const store = transaction.objectStore('favorites');

    store.delete(programId);

    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  }

  async getFavorites(): Promise<string[]> {
    if (!this.db) throw new Error('Database not initialized');

    const transaction = this.db.transaction(['favorites'], 'readonly');
    const store = transaction.objectStore('favorites');

    return new Promise((resolve, reject) => {
      const request = store.getAll();
      
      request.onsuccess = () => {
        const favorites = request.result.map((fav: any) => fav.programId);
        resolve(favorites);
      };

      request.onerror = () => reject(request.error);
    });
  }

  // Application tracking
  async saveApplication(application: {
    id: string;
    programId: string;
    status: string;
    submittedDate: number;
    documents: string[];
    notes: string;
  }): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    const transaction = this.db.transaction(['applications'], 'readwrite');
    const store = transaction.objectStore('applications');

    store.put(application);

    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  }

  async getApplications(): Promise<any[]> {
    if (!this.db) throw new Error('Database not initialized');

    const transaction = this.db.transaction(['applications'], 'readonly');
    const store = transaction.objectStore('applications');

    return new Promise((resolve, reject) => {
      const request = store.getAll();
      
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  // Offline queue management
  async addToOfflineQueue(action: string, data: any): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    const transaction = this.db.transaction(['offlineQueue'], 'readwrite');
    const store = transaction.objectStore('offlineQueue');

    const queueItem: OfflineQueue = {
      id: `queue-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      action,
      data,
      timestamp: Date.now(),
      retries: 0,
    };

    store.add(queueItem);

    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  }

  async processOfflineQueue(): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    const transaction = this.db.transaction(['offlineQueue'], 'readwrite');
    const store = transaction.objectStore('offlineQueue');

    return new Promise((resolve, reject) => {
      const request = store.getAll();
      
      request.onsuccess = async () => {
        const queueItems = request.result as OfflineQueue[];
        
        for (const item of queueItems) {
          try {
            await this.processQueueItem(item);
            store.delete(item.id);
          } catch (error) {
            console.error('Failed to process queue item:', error);
            
            if (item.retries < 3) {
              item.retries++;
              store.put(item);
            } else {
              store.delete(item.id);
            }
          }
        }
        
        resolve();
      };

      request.onerror = () => reject(request.error);
    });
  }

  private async processQueueItem(item: OfflineQueue): Promise<void> {
    // Process different types of offline actions
    switch (item.action) {
      case 'saveApplication':
        // Process saved application when back online
        break;
      case 'updateFavorites':
        // Sync favorites changes
        break;
      default:
        console.warn('Unknown queue action:', item.action);
    }
  }

  // Cleanup methods
  async clearOldData(maxAge = 30 * 24 * 60 * 60 * 1000): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    const cutoff = Date.now() - maxAge;
    const transaction = this.db.transaction(['programs', 'searchHistory'], 'readwrite');

    // Clear old programs
    const programStore = transaction.objectStore('programs');
    const programIndex = programStore.index('lastUpdated');
    const programRange = IDBKeyRange.upperBound(cutoff);
    programIndex.openCursor(programRange).onsuccess = (event) => {
      const cursor = (event.target as IDBRequest).result;
      if (cursor) {
        cursor.delete();
        cursor.continue();
      }
    };

    // Clear old search history
    const searchStore = transaction.objectStore('searchHistory');
    const searchIndex = searchStore.index('timestamp');
    const searchRange = IDBKeyRange.upperBound(cutoff);
    searchIndex.openCursor(searchRange).onsuccess = (event) => {
      const cursor = (event.target as IDBRequest).result;
      if (cursor) {
        cursor.delete();
        cursor.continue();
      }
    };

    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  }

  async getStorageInfo(): Promise<{
    programsCount: number;
    favoritesCount: number;
    applicationsCount: number;
    searchHistoryCount: number;
    queueCount: number;
  }> {
    if (!this.db) throw new Error('Database not initialized');

    const transaction = this.db.transaction(['programs', 'favorites', 'applications', 'searchHistory', 'offlineQueue'], 'readonly');

    const counts = await Promise.all([
      this.getStoreCount(transaction.objectStore('programs')),
      this.getStoreCount(transaction.objectStore('favorites')),
      this.getStoreCount(transaction.objectStore('applications')),
      this.getStoreCount(transaction.objectStore('searchHistory')),
      this.getStoreCount(transaction.objectStore('offlineQueue')),
    ]);

    return {
      programsCount: counts[0],
      favoritesCount: counts[1],
      applicationsCount: counts[2],
      searchHistoryCount: counts[3],
      queueCount: counts[4],
    };
  }

  private getStoreCount(store: IDBObjectStore): Promise<number> {
    return new Promise((resolve, reject) => {
      const request = store.count();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
}

export const offlineManager = new OfflineManager();