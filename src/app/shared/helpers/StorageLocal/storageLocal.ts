export class StorageLocal {
  constructor() {}

  saveItem(name, item) {
    return localStorage.setItem(name, JSON.stringify(item));
  }

  getItem(name) {
    return JSON.parse(localStorage.getItem(name));
  }
}
