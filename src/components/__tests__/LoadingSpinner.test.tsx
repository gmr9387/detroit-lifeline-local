import { render } from '@testing-library/react'
import { describe, test, expect } from 'vitest'
import LoadingSpinner from '../LoadingSpinner'

describe('LoadingSpinner', () => {
  test('renders with default props', () => {
    const { getByText } = render(<LoadingSpinner />)
    expect(getByText('Loading...')).toBeInTheDocument()
  })

  test('renders with custom text', () => {
    const { getByText } = render(<LoadingSpinner text="Please wait..." />)
    expect(getByText('Please wait...')).toBeInTheDocument()
  })

  test('renders without text when text prop is empty', () => {
    const { queryByText } = render(<LoadingSpinner text="" />)
    expect(queryByText('Loading...')).not.toBeInTheDocument()
  })

  test('applies correct size classes', () => {
    const { rerender } = render(<LoadingSpinner size="sm" />)
    expect(document.querySelector('.h-4')).toBeInTheDocument()

    rerender(<LoadingSpinner size="lg" />)
    expect(document.querySelector('.h-8')).toBeInTheDocument()
  })
})