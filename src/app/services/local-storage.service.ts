import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  // Save a value
  setItem(key: string, value: any): void {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error('Error saving to localStorage', error);
    }
  }

  // Retrieve a value
  getItem<T>(key: string): T | null {
    const data = localStorage.getItem(key);
    if (!data) return null;

    try {
      return JSON.parse(data) as T;
    } catch {
      return null;
    }
  }

  // Remove a key
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  // Clear all keys
  clear(): void {
    localStorage.clear();
  }
  
}
