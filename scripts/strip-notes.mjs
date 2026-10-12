/**
 * Removes <!-- ... --> blocks that sit outside fenced code blocks.
 *
 * In a Slidev deck these blocks are the speaker notes, which Slidev bundles
 * into the built JavaScript.
 */
export function stripNotes(markdown) {
  const kept = []
  let inFence = false
  let inComment = false
  for (const line of markdown.split('\n')) {
    if (!inComment && /^\s*```/.test(line)) inFence = !inFence
    if (inFence) {
      kept.push(line)
      continue
    }
    if (inComment) {
      if (line.includes('-->')) inComment = false
      continue
    }
    if (line.trimStart().startsWith('<!--')) {
      if (!line.includes('-->')) inComment = true
      continue
    }
    kept.push(line)
  }
  return kept.join('\n').replace(/\n{3,}/g, '\n\n')
}
