/**
 * Get the correct Korean particle following the given word.
 *
 * Korean usually has a pair of two particles, which is chosen depending on
 * whether a word ends with a consonant or a vowel.
 * This function deals with such Korean particles, with a plausible heuristic
 * for non-Korean characters.
 *
 * @param text
 * @param isRo whether the particle pair is 으로/로 or not
 *        If isRo is true, `withFinalConsonant` excludes ㄹ (L sound) from
 *        its consonant set.
 * @param withFinalConsonant a version in case ending with a consonant
 * @param withoutFinalConsonant a version in case ending with a vowel
 * @returns the correct particle
 */
function getKoreanJosa<T>(
  text: T,
  isRo: boolean,
  withFinalConsonant: string,
  withoutFinalConsonant: string,
): string {
  if (typeof text !== 'string') return withoutFinalConsonant

  // Strip out all non-Korean (vowels, consonants, and complete characters)
  // non-alphanumeric characters.
  const normalizedText = text.replace(/[^\u3131-\u3163\uac00-\ud7a3a-z0-9]/gi, '')

  if (typeof normalizedText !== 'string' || normalizedText.length === 0)
    return withoutFinalConsonant

  // If `text` ends with two or more consecutive latin alphabets,
  // apply the following syllable final sound huristic:
  if (/[a-z]{2,}$/i.test(normalizedText)) {
    return /(?:\w[lm]|[aeiouwy][ck-npqt])e?$/i.test(normalizedText)
      ? withFinalConsonant
      : withoutFinalConsonant
  }

  // If `text` ends with complete Korean characters,
  // check if it has a syllable final sound and return the appropriate one.
  if (/[\uac00-\ud7a3]$/.test(normalizedText)) {
    const code = normalizedText.charCodeAt(normalizedText.length - 1) - 0xac00
    const hasFinalConsonant = !(code % 28 === 0 || (isRo && code % 28 === 8))
    return hasFinalConsonant ? withFinalConsonant : withoutFinalConsonant
  }

  // The case `text` ends with incomplete Korean characters (consonants or vowels)
  if (isRo && normalizedText.endsWith('ㄹ')) return withoutFinalConsonant
  // Consonant cases
  if (/[\u3131-\u314e]$/.test(normalizedText)) return withFinalConsonant
  // Vowel cases
  if (/[\u314f-\u3163]$/.test(normalizedText)) return withoutFinalConsonant

  // The case `text` ends with a single latin alphabet or a digit
  const singleAlphabetOrNumericRegex = isRo ? /[mn036]$/i : /[lmnr013678]$/i
  return singleAlphabetOrNumericRegex.test(normalizedText)
    ? withFinalConsonant
    : withoutFinalConsonant
}

export const koreanModifiers = {
  koreanI: <T>(text: T) => getKoreanJosa(text, false, '이', '가'),
  koreanEun: <T>(text: T) => getKoreanJosa(text, false, '은', '는'),
  koreanEul: <T>(text: T) => getKoreanJosa(text, false, '을', '를'),
  koreanWa: <T>(text: T) => getKoreanJosa(text, false, '과', '와'),
  koreanRo: <T>(text: T) => getKoreanJosa(text, true, '으로', '로'),
}
