import { renderHook, act } from '@testing-library/react'
import { vi, describe, test, expect } from 'vitest'
import { useAsync } from '../useAsync'

describe('useAsync', () => {
  test('handles successful async function', async () => {
    const mockAsyncFn = vi.fn().mockResolvedValue('success')
    
    const { result } = renderHook(() => useAsync(mockAsyncFn, [], { immediate: false }))
    
    expect(result.current.loading).toBe(false)
    expect(result.current.data).toBe(null)
    expect(result.current.error).toBe(null)
    
    act(() => {
      result.current.execute()
    })
    
    expect(result.current.loading).toBe(true)
    
    await new Promise(resolve => setTimeout(resolve, 0))
    
    expect(result.current.loading).toBe(false)
    expect(result.current.data).toBe('success')
    expect(result.current.error).toBe(null)
  })

  test('handles async function errors', async () => {
    const mockAsyncFn = vi.fn().mockRejectedValue(new Error('Test error'))
    
    const { result } = renderHook(() => useAsync(mockAsyncFn, [], { immediate: false }))
    
    act(() => {
      result.current.execute()
    })
    
    await new Promise(resolve => setTimeout(resolve, 0))
    
    expect(result.current.loading).toBe(false)
    expect(result.current.data).toBe(null)
    expect(result.current.error?.message).toBe('Test error')
  })

  test('executes immediately when immediate is true', async () => {
    const mockAsyncFn = vi.fn().mockResolvedValue('immediate')
    
    renderHook(() => useAsync(mockAsyncFn, [], { immediate: true }))
    
    await new Promise(resolve => setTimeout(resolve, 0))
    
    expect(mockAsyncFn).toHaveBeenCalled()
  })

  test('resets state correctly', () => {
    const mockAsyncFn = vi.fn().mockResolvedValue('data')
    
    const { result } = renderHook(() => useAsync(mockAsyncFn, [], { immediate: false }))
    
    act(() => {
      result.current.reset()
    })
    
    expect(result.current.data).toBe(null)
    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBe(null)
  })
})