import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  {
    ignores: ['**/node_modules/**', '.next/**', 'dist/**'],
  },
  ...compat.extends('next/core-web-vitals', 'next/typescript', 'prettier'),
  {
    rules: {
      semi: ['error', 'never'],
      quotes: ['error', 'single'],
      indent: ['error', 2],
    },
  },
]

export default eslintConfig
