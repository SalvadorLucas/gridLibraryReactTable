import React from 'react'
import ReactDOM from 'react-dom'
// Component to be Test
import Checkbox from './checkbox'
// Test Library
import { render, cleanup } from '@testing-library/react'
import '@testing-library/dom'
import '@testing-library/jest-dom/extend-expect'

afterEach(cleanup)

test('Report name', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Checkbox></Checkbox>, div)
})

// Props to send component to be rendered
const props = {}

test('Render correctly', () => {
  const { getByTestId } = render(<Checkbox {...props}></Checkbox>)
  expect(getByTestId('CheckboxTestId')).toBeInTheDocument()
})
