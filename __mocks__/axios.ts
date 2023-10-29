import { vi } from 'vitest'

const axios: any = async () => {
  const actual: any = await vi.importActual('axios')
  const mockedRequests = {
    get: vi.fn((route) => {
      return Promise.resolve({ route: route, data: [] })
    }),
    post: vi.fn((route, data) => {
      return Promise.resolve({ route: route, data: data })
    }),
    put: vi.fn((route, data) => {
      return Promise.resolve({ route: route, data: data })
    }),
    delete: vi.fn((route) => {
      return Promise.resolve({ route: route, data: [] })
    }),
  }
  return {
    ...actual.default,
    create: vi.fn(() => ({
      ...mockedRequests,
      interceptors: {
        request: { use: vi.fn(), eject: vi.fn() },
        response: { use: vi.fn(() => 2), eject: vi.fn() },
      },
    })),
    ...mockedRequests,
  }
}

export default await axios()
