export function assert (condition, msg) {
  if (!condition) throw new Error(`[Apior] ${msg}`)
}
