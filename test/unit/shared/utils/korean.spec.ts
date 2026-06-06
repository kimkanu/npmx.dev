import { describe, expect, it } from 'vitest'
import { koreanModifiers } from '#shared/utils/korean'

describe('getKoreanJosa', () => {
  it('chooses the correct one for words ending with korean characters', () => {
    expect(koreanModifiers.koreanI('')).toBe('가')
    expect(koreanModifiers.koreanI('한국어')).toBe('가')
    expect(koreanModifiers.koreanI('얼룩말')).toBe('이')
    expect(koreanModifiers.koreanI('엔피엠엑스')).toBe('가')
    expect(koreanModifiers.koreanI('자바스크립트')).toBe('가')
    expect(koreanModifiers.koreanI('로봇')).toBe('이')
    expect(koreanModifiers.koreanI('관련')).toBe('이')
  })

  it('chooses the correct one for words ending with digits', () => {
    expect(koreanModifiers.koreanI('테스트123')).toBe('이')
    expect(koreanModifiers.koreanI('3500')).toBe('이')
    expect(koreanModifiers.koreanI('ax18')).toBe('이')
    expect(koreanModifiers.koreanI('10935')).toBe('가')
    expect(koreanModifiers.koreanI('is-number-2024')).toBe('가')
    expect(koreanModifiers.koreanRo('테스트123')).toBe('으로')
    expect(koreanModifiers.koreanRo('ax18')).toBe('로')
    expect(koreanModifiers.koreanRo('2017')).toBe('로')
    expect(koreanModifiers.koreanRo('10935')).toBe('로')
  })

  it('chooses the correct one for words ending with latin alphabets', () => {
    expect(koreanModifiers.koreanI('test')).toBe('가') // 테스트 - vowel
    expect(koreanModifiers.koreanI('neighbor')).toBe('가') // 네이버 - vowel
    expect(koreanModifiers.koreanI('one')).toBe('이') // 원 - consonant
    expect(koreanModifiers.koreanI('robot')).toBe('이') // 로봇 - consonant
    expect(koreanModifiers.koreanI('art')).toBe('가') // 아트 - vowel
    expect(koreanModifiers.koreanI('korean')).toBe('이') // 코리안 - consonant

    // single alphabet cases
    expect(koreanModifiers.koreanI('마징가Z')).toBe('가') // 마징가제트 - vowel
    expect(koreanModifiers.koreanRo('마징가Z')).toBe('로') // 마징가제트 - vowel
    expect(koreanModifiers.koreanI('버전R')).toBe('이') // 버전알 - consonant ㄹ
    expect(koreanModifiers.koreanRo('버전R')).toBe('로') // 버전알 - consonant ㄹ
    expect(koreanModifiers.koreanI('버전M')).toBe('이') // 버전엠 - consonant
    expect(koreanModifiers.koreanRo('버전M')).toBe('으로') // 버전엔 - consonant
  })

  it('chooses the correct one for null cases', () => {
    expect(koreanModifiers.koreanI('')).toBe('가')
    expect(koreanModifiers.koreanEun('')).toBe('는')
    expect(koreanModifiers.koreanEul('')).toBe('를')
    expect(koreanModifiers.koreanWa('')).toBe('와')
    expect(koreanModifiers.koreanRo('')).toBe('로')
  })

  it('i/ga and other regular particle pairs behave in the same way', () => {
    expect(koreanModifiers.koreanI('한국어')).toBe('가')
    expect(koreanModifiers.koreanEun('한국어')).toBe('는')
    expect(koreanModifiers.koreanEul('한국어')).toBe('를')
    expect(koreanModifiers.koreanWa('한국어')).toBe('와')

    expect(koreanModifiers.koreanI('얼룩말')).toBe('이')
    expect(koreanModifiers.koreanEun('얼룩말')).toBe('은')
    expect(koreanModifiers.koreanEul('얼룩말')).toBe('을')
    expect(koreanModifiers.koreanWa('얼룩말')).toBe('과')
  })
})
