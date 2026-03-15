import { apiRequest } from './http'

export function getBooks() {
  return apiRequest('/api/books')
}

export function createReview(payload) {
  return apiRequest('/api/reviews', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
}
