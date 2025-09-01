import { renderHook, act } from '@testing-library/react'
import { vi, describe, test, expect, beforeEach } from 'vitest'
import { useLocalStorage } from '../useLocalStorage'

// Mock localStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
}

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
})

describe('useLocalStorage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('returns initial value when localStorage is empty', () => {
    mockLocalStorage.getItem.mockReturnValue(null)
    
    const { result } = renderHook(() => useLocalStorage('test-key', 'default-value'))
    
    expect(result.current[0]).toBe('default-value')
  })

  test('returns stored value from localStorage', () => {
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify('stored-value'))
    
    const { result } = renderHook(() => useLocalStorage('test-key', 'default-value'))
    
    expect(result.current[0]).toBe('stored-value')
  })

  test('updates localStorage when setValue is called', () => {
    mockLocalStorage.getItem.mockReturnValue(null)
    
    const { result } = renderHook(() => useLocalStorage('test-key', 'default-value'))
    
    act(() => {
      result.current[1]('new-value')
    })
    
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('test-key', JSON.stringify('new-value'))
    expect(result.current[0]).toBe('new-value')
  })

  test('handles JSON parse errors gracefully', () => {
    mockLocalStorage.getItem.mockReturnValue('invalid-json')
    
    const { result } = renderHook(() => useLocalStorage('test-key', 'default-value'))
    
    expect(result.current[0]).toBe('default-value')
  })
})