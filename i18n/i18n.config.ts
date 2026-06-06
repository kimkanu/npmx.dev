import { currentLocales, datetimeFormats, numberFormats, pluralRules } from '../config/i18n'

function getKoreanJosa(
  text: unknown,
  isRo: boolean,
  withFinalConsonant: string,
  withoutFinalConsonant: string,
) {
  if (typeof text !== 'string') return text

  // Strip out all non-Korean non-alphanumeric characters.
  const normalizedText = text.replace(/[^ㄱ-ㅎㅏ-ㅣ가-힣a-z0-9]/gi, '')

  if (typeof normalizedText !== 'string' || normalizedText.length === 0)
    return withoutFinalConsonant

  // If `text` ends with two or more consecutive latin alphabets,
  // apply the following syllable final sound huristic:
  if (/[a-z]{2,}$/.test(normalizedText)) {
    return /(?:\w[lm]|[aeiouwy][ckpqt])e?$/i.test(normalizedText)
      ? withFinalConsonant
      : withoutFinalConsonant
  }

  // If `text` ends with complete Korean characters,
  // check if it has a syllable final sound and return the appropriate one.
  if (/[가-힣]$/.test(normalizedText)) {
    const code = normalizedText.charCodeAt(normalizedText.length - 1) - 0xac00
    const hasFinalConsonant = !(code % 28 === 0 || (isRo && code % 28 === 8))
    return hasFinalConsonant ? withFinalConsonant : withoutFinalConsonant
  }

  // The case `text` ends with incomplete Korean characters (consonants or vowels)
  if (isRo && normalizedText.endsWith('ㄹ')) return withoutFinalConsonant
  if (/[ㄱ-ㅎ]$/.test(normalizedText)) return withFinalConsonant
  if (/[ㅏ-ㅣ]$/.test(normalizedText)) return withoutFinalConsonant

  // The case `text` ends with a single latin alphabet or a digit
  const singleAlphabetOrNumericRegex = isRo ? /[mn036]$/i : /[lmnr013678]$/i
  return singleAlphabetOrNumericRegex.test(normalizedText)
    ? withFinalConsonant
    : withoutFinalConsonant
}

export default defineI18nConfig(() => {
  return {
    availableLocales: currentLocales.map(l => l.code),
    fallbackLocale: 'en-US',
    fallbackWarn: true,
    missingWarn: true,
    datetimeFormats,
    numberFormats,
    pluralRules,
    modifiers: {
      koreanI: text => getKoreanJosa(text, false, '이', '가'),
      koreanEun: text => getKoreanJosa(text, false, '은', '는'),
      koreanEul: text => getKoreanJosa(text, false, '을', '를'),
      koreanWa: text => getKoreanJosa(text, false, '과', '와'),
      koreanRo: text => getKoreanJosa(text, true, '으로', '로'),
    },
  }
})
