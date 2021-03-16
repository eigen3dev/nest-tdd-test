import { AuthService } from 'auth/auth.service'
import { RegisterDto } from 'auth/dto/register.dto'
import { AuthController } from './auth.controller'

describe('Auth Controller', () => {
  let controller: AuthController
  let authService: AuthService

  const mockUserProfile = {
    id: 1,
    email: 'foo@bar.com',
    createdAt: '',
    updatedAt: '',
    username: 'foo',
    bio: null,
    image: null,
    token: 'token',
  }

  beforeEach(async () => {
    // TODO: define service & controller
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('register', () => {
    it('should call register service when call register controller', async () => {
      const registerDto: RegisterDto = { email: 'foo@bar.com', username: 'foo', password: 'bar' }
      const res = await controller.register(registerDto)

      expect(res).toHaveProperty('user')
      expect(res.user).not.toHaveProperty('password')
      expect(res.user).toEqual(mockUserProfile)
    })
  })

  describe('login', () => {
    it('should call login service when call login controller', async () => {
      const res = await controller.login({ email: 'foo@bar.com', password: '123456' })

      expect(res).toHaveProperty('user')
      expect(res.user).not.toHaveProperty('password')
      expect(res.user).toEqual(mockUserProfile)
    })
  })
})
