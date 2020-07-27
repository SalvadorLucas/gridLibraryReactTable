import React from 'react'
import ReactDOM from 'react-dom'
// Component to be Test
import AddFilter from './addFilter'
import RemoveFilter from './removeFilter'
// Test Library
import { render, cleanup } from '@testing-library/react'
import '@testing-library/dom'
import '@testing-library/jest-dom/extend-expect'

afterEach(cleanup)
test('Report name', () => {
  const div = document.createElement('div')
  ReactDOM.render(<AddFilter></AddFilter>, div)
})
test('Report name', () => {
  const div = document.createElement('div')
  ReactDOM.render(<RemoveFilter></RemoveFilter>, div)
})
// Props to send component to be rendered
const props = {
  properyName: 'Value',
}
test('Render correctly', () => {
  const { getByTestId } = render(<AddFilter {...props}></AddFilter>)
  expect(getByTestId('IconsTestId')).toBeInTheDocument()
})
test('Render correctly', () => {
  const { getByTestId } = render(<RemoveFilter {...props}></RemoveFilter>)
  expect(getByTestId('IconsTestId')).toBeInTheDocument()
})