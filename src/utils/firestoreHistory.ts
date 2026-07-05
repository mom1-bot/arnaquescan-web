import {
  collection, addDoc, getDocs, deleteDoc, doc, query, where, orderBy, limit,
  serverTimestamp, Timestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import type { HistoryEntry } from "../types";

const COL = "analyses";

export async function saveAnalysis(entry: Omit<HistoryEntry, "id" | "date">): Promise<void> {
  await addDoc(collection(db, COL), {
    ...entry,
    createdAt: serverTimestamp(),
  });
}

export async function loadUserHistory(userId: string): Promise<HistoryEntry[]> {
  const q = query(
    collection(db, COL),
    where("userId", "==", userId),
    orderBy("createdAt", "desc"),
    limit(200)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => {
    const data = d.data();
    const ts = data.createdAt as Timestamp | null;
    return {
      ...(data as Omit<HistoryEntry, "id" | "date">),
      id:   d.id,
      date: ts ? ts.toDate().toISOString() : new Date().toISOString(),
    };
  });
}

export async function deleteAnalysis(id: string): Promise<void> {
  await deleteDoc(doc(db, COL, id));
}
