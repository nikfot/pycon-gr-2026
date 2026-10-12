let count = 0

/** Returns a document-unique prefix for SVG ids (url(#id) refs resolve document-wide). */
export function nextGraphId(): string {
  count += 1
  return `ag${count}`
}
