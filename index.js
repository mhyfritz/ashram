module.exports = (phrase, word, ignoreCase = true) => {
  if (ignoreCase) {
    phrase = phrase.toLowerCase()
    word = word.toLowerCase()
  }

  if (phrase[0] !== word[0]) {
    return false
  }

  const boundaryRe = /\b./g
  const indexes = []
  let match
  while ((match = boundaryRe.exec(`${phrase}$`)) !== null) {
    indexes.push(match.index)
  }

  const boundaries = []
  for (let i = 0; i < indexes.length; i += 2) {
    boundaries.push([indexes[i], indexes[i + 1] - 1])
  }

  let visited = new Array(word.length)
  for (let i = 0; i < phrase.length; i += 1) {
    visited[i] = new Array(phrase.length).fill(false)
  }

  const phraseWordHits = new Array(boundaries.length)
  for (let i = 0; i < boundaries.length; i += 1) {
    phraseWordHits[i] = new Set()
  }
  phraseWordHits[0].add(0)
  const found = traverse(visited, 0, 0, word, phrase, phraseWordHits, boundaries)
  return found
}

function traverse (visited, i, j, word, phrase, phraseWordHits, boundaries) {
  if (i >= word.length || j >= phrase.length) {
    return false
  }

  visited[i][j] = true

  const phraseWordIdx = getWordIndex(boundaries, j)
  if (word[i] === phrase[j] && i === word.length - 1 && all(phraseWordHits, set => set.size > 0)) {
    phraseWordHits[phraseWordIdx].delete(j)
    return true
  }

  if (j < phrase.length - 1 && !visited[i][j + 1]) {
    const found = traverse(visited, i, j + 1, word, phrase, phraseWordHits, boundaries)
    if (found) {
      if (phraseWordIdx !== -1) {
        phraseWordHits[phraseWordIdx].delete(j)
      }
      return true
    }
  }
  if (i < word.length - 1 && j < phrase.length - 1 && word[i + 1] === phrase[j + 1] && !visited[i + 1][j + 1]) {
    phraseWordHits[getWordIndex(boundaries, j + 1)].add(j + 1)
    const found = traverse(visited, i + 1, j + 1, word, phrase, phraseWordHits, boundaries)
    if (found) {
      if (phraseWordIdx !== -1) {
        phraseWordHits[phraseWordIdx].delete(j)
      }
      return true
    }
  }
  if (phraseWordIdx !== -1) {
    phraseWordHits[phraseWordIdx].delete(j)
  }
  return false
}

function getWordIndex (boundaries, phraseIdx) {
  for (let i = 0; i < boundaries.length; i += 1) {
    if (phraseIdx >= boundaries[i][0] && phraseIdx <= boundaries[i][1]) {
      return i
    }
  }
  return -1
}

function all (xs, pred = Boolean) {
  for (const x of xs) {
    if (!pred(x)) {
      return false
    }
  }
  return true
}
