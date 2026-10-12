// Builds a hostable copy of the deck with speaker notes removed.
//
// Slidev bundles speaker notes (the HTML comments under each slide) into the
// built JavaScript, so anyone can read them in the browser. This script builds
// from a temporary copy of slides.md without those comments, so the source
// keeps its notes while the published site does not.
import { spawnSync } from 'node:child_process'
import { readFileSync, rmSync, writeFileSync } from 'node:fs'
import { stripNotes } from './strip-notes.mjs'

const base = process.env.BASE ?? '/'
const out = process.env.OUT ?? 'dist-public'
const entry = 'slides.public.md'

writeFileSync(entry, stripNotes(readFileSync('slides.md', 'utf8')))
try {
  const result = spawnSync('npx', ['slidev', 'build', entry, '--base', base, '--out', out], {
    stdio: 'inherit',
  })
  process.exitCode = result.status ?? 1
} finally {
  rmSync(entry, { force: true })
}
