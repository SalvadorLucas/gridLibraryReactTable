import React from 'react'
import ReactDOM from 'react-dom'
// Component to be Test
import TableGrid from './tablegrid'
// Test Library
import { render, cleanup } from '@testing-library/react'
import '@testing-library/dom'
import '@testing-library/jest-dom/extend-expect'

afterEach(cleanup)

test('Report name', () => {
  const div = document.createElement('div')
  ReactDOM.render(<TableGrid></TableGrid>, div)
})

// Props to send component to be rendered
const props = {}

test('Render correctly', () => {
  const { getByTestId } = render(<TableGrid {...props}></TableGrid>)
  expect(getByTestId('TableGridTestId')).toBeInTheDocument()
})
