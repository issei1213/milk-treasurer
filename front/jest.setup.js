import '@testing-library/jest-dom/extend-expect'
import { advanceTo, clear } from 'jest-date-mock'

const today = '2022-07-14 17:00:00'

beforeAll(() => {
  advanceTo(today)
})

afterAll(() => clear())
