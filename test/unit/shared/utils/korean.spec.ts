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
    expect(koreanModifiers.koreanI('버전R')).toBe('이') // 버전알 - consonant ㄹ
    expect(koreanModifiers.koreanRo('버전R')).toBe('로') // 버전알 - consonant ㄹ
  })

  it('chooses the correct one for null cases', () => {
    expect(koreanModifiers.koreanI('')).toBe('가')
  })
})
