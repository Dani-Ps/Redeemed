import 'fake-indexeddb/auto'

// Node 25 ships a built-in global `localStorage` that shadows jsdom's and
// lacks a working Storage API (no clear()). Install a small, correct,
// in-memory Storage so both app code and tests share one reliable store.
class MemoryStorage implements Storage {
  private map = new Map<string, string>()
  get length() {
    return this.map.size
  }
  clear() {
    this.map.clear()
  }
  getItem(key: string) {
    return this.map.has(key) ? this.map.get(key)! : null
  }
  setItem(key: string, value: string) {
    this.map.set(key, String(value))
  }
  removeItem(key: string) {
    this.map.delete(key)
  }
  key(index: number) {
    return Array.from(this.map.keys())[index] ?? null
  }
}

const store = new MemoryStorage()
for (const target of [globalThis, window] as const) {
  Object.defineProperty(target, 'localStorage', {
    value: store,
    configurable: true,
    writable: true,
  })
}

// Ensure a clean persistence layer between tests.
beforeEach(() => {
  store.clear()
})
