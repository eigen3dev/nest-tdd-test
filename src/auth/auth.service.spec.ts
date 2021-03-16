import { BadRequestException } from '@nestjs/common'
import { LoginDto } from 'auth/dto/login.dto'
import { UserService } from 'user/user.service'
import { cryptoPassword } from 'utils'
import { AuthService } from './auth.service'

describe('AuthService', () => {
  let authService: AuthService
  let userService: UserService

  beforeEach(async () => {
    // TODO: define service
  })

  it('should be defined', () => {
    expect(authService).toBeDefined()
  })

  describe('register', () => {
    it('should return user profile when register successful', async () => {
      const registerDto = { email: 'foo@bar.com', username: 'foobar', password: '123456' }

      const authData = await authService.register(registerDto)

      expect(authData).not.toHaveProperty('password')
      expect(authData).toHaveProperty('foo', 'bar')
      expect(authData).toHaveProperty('token', 'token')
    })

    it('should throw error when user name is exist', async () => {
      const registerDto = { email: 'foo@bar.com', username: 'exist_user', password: '123456' }

      await expect(authService.register(registerDto)).rejects.toThrow(new BadRequestException('username is exist'))
    })

    it('should throw error when email is exist', async () => {
      const registerDto = { email: 'exist_email@bar.com', username: 'username', password: '123456' }

      await expect(authService.register(registerDto)).rejects.toThrow(new BadRequestException('email is exist'))
    })
  })

  describe('login', () => {
    it('should return user profile when login successful', async () => {
      const loginDto: LoginDto = { email: 'foo@bar.com', password: '123456' }

      const authData = await authService.login(loginDto)

      expect(authData).not.toHaveProperty('password')
      expect(authData).toHaveProperty('foo', 'bar')
      expect(authData).toHaveProperty('token', 'token')
    })
  })

  describe('validate user', () => {
    it('should return user info without password when validate successful', async () => {
      const email = 'foo@bar.com'
      const password = cryptoPassword('12345678')
      const user = await authService.validateUser(email, '12345678')

      expect(user).toHaveProperty('email', email)
      expect(user).not.toHaveProperty('password')
    })

    it('should throw bad request exception when invalid user', async () => {
      const validateUser = authService.validateUser('foo@bar.com', '')
      await expect(validateUser).rejects.toThrow(new BadRequestException('user is not exist'))
    })

    it('should throw bad request exception when invalid password', async () => {
      const password = '4a83854cf6f0112b4295bddd535a9b3fbe54a3f90e853b59d42e4bed553c55a4'

      const validateUser = authService.validateUser('foo@bar.com', 'invalidPassword')
      await expect(validateUser).rejects.toThrow(new BadRequestException('password is invalid'))
    })
  })

  describe('generateToken', () => {
    it('should return JWT', () => {
      const token = authService.generateToken(1, 'foo@bar.com')

      expect(token).toBe('token')
    })
  })
})
