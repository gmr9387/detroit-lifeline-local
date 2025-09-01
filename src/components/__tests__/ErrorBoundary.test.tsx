import { render } from '@testing-library/react'
import { vi, describe, test, expect, beforeAll, afterAll } from 'vitest'
import ErrorBoundary from '../ErrorBoundary'

// Test component that throws an error
const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error')
  }
  return <div>No error</div>
}

// Mock console.error to avoid noise in test output
const originalError = console.error
beforeAll(() => {
  console.error = vi.fn()
})

afterAll(() => {
  console.error = originalError
})

describe('ErrorBoundary', () => {
  test('renders children when there is no error', () => {
    const { getByText } = render(
      <ErrorBoundary>
        <ThrowError shouldThrow={false} />
      </ErrorBoundary>
    )
    expect(getByText('No error')).toBeInTheDocument()
  })

  test('renders error fallback when there is an error', () => {
    const { getByText, getByRole } = render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )
    expect(getByText('Something went wrong')).toBeInTheDocument()
    expect(getByText('Please refresh the page or try again later.')).toBeInTheDocument()
    expect(getByRole('button', { name: /refresh page/i })).toBeInTheDocument()
  })

  test('shows custom fallback UI when provided', () => {
    const customFallback = <div>Custom error message</div>
    const { getByText } = render(
      <ErrorBoundary fallback={customFallback}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )
    expect(getByText('Custom error message')).toBeInTheDocument()
  })
})