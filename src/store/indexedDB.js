import { openDB } from 'idb';

const DATABASE_NAME = 'templateFormDB';
const STORE_NAME = 'policies';
const DATABASE_VERSION = 1;

export const initDB = async () => {
  return openDB(DATABASE_NAME, DATABASE_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
      }
    },
  });
};

export const addPolicy = async (policy) => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  await tx.objectStore(STORE_NAME).add(policy);
  await tx.done;
};

export const getPolicies = async () => {
  const db = await initDB();
  return db.transaction(STORE_NAME).objectStore(STORE_NAME).getAll();
};

export const getPolicy = async (id) => {
  const db = await initDB();
  return db.transaction(STORE_NAME).objectStore(STORE_NAME).get(id);
};

export const updatePolicy = async (id, updatedPolicy) => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  await tx.objectStore(STORE_NAME).put({ ...updatedPolicy, id });
  await tx.done;
};

export const deletePolicy = async (id) => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  await tx.objectStore(STORE_NAME).delete(id);
  await tx.done;
};
