import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  setDoc,
  deleteDoc, // 1. Adicionado o deleteDoc aqui nas importações
} from 'firebase/firestore'
import { db, isFirebaseConfigured } from '../firebase/config'
import { EMAILS_COLLECTION } from '../constants'
import { emailToDocId } from '../utils/emailId'

function assertFirebase() {
  if (!isFirebaseConfigured || !db) {
    throw new Error(
      'Firebase não configurado. Crie o arquivo .env (veja CONFIGURACAO.md).',
    )
  }
}

export function subscribeToEmails(callback) {
  assertFirebase()
  const q = query(
    collection(db, EMAILS_COLLECTION),
    orderBy('createdAt', 'desc'),
  )
  return onSnapshot(q, (snap) => {
    callback(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
  })
}

export async function saveEmail(email) {
  assertFirebase()
  const normalized = email.trim().toLowerCase()
  const ref = doc(db, EMAILS_COLLECTION, emailToDocId(normalized))

  if ((await getDoc(ref)).exists()) {
    return { success: false, error: 'Este e-mail já foi cadastrado.' }
  }

  await setDoc(ref, {
    email: normalized,
    createdAt: serverTimestamp(),
  })

  return { success: true }
}

// 2. Nova função para a lixeira deletar os e-mails
export async function deleteEmail(id) {
  assertFirebase()
  const ref = doc(db, EMAILS_COLLECTION, id)
  await deleteDoc(ref)
}