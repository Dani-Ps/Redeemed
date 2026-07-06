import { openDB, type DBSchema, type IDBPDatabase } from 'idb'

// ------------------------------------------------------------------
// IndexedDB is used ONLY for Grace-evidence photo blobs. Everything
// lighter lives in localStorage. Kept behind this tiny module so
// components never touch idb directly.
// ------------------------------------------------------------------

interface RedeemedDB extends DBSchema {
  fotos: {
    key: string
    value: Blob
  }
}

const DB_NAME = 'redeemed-db'
const STORE = 'fotos'

let dbPromise: Promise<IDBPDatabase<RedeemedDB>> | null = null

function getDB(): Promise<IDBPDatabase<RedeemedDB>> {
  if (!dbPromise) {
    dbPromise = openDB<RedeemedDB>(DB_NAME, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE)) {
          db.createObjectStore(STORE)
        }
      },
    })
  }
  return dbPromise
}

export async function savePhoto(id: string, blob: Blob): Promise<void> {
  const db = await getDB()
  await db.put(STORE, blob, id)
}

export async function getPhoto(id: string): Promise<Blob | undefined> {
  const db = await getDB()
  return db.get(STORE, id)
}

export async function deletePhoto(id: string): Promise<void> {
  const db = await getDB()
  await db.delete(STORE, id)
}
