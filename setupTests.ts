// setupTests.ts
import '@testing-library/jest-dom'
global.structuredClone = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}