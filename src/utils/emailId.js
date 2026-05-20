export function emailToDocId(email) {
  return email.trim().toLowerCase().replace(/[@.]/g, '_')
}
