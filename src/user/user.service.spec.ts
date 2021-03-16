import { Repository } from 'typeorm'
import { UserEntity } from './user.entity'
import { UserService } from './user.service'

describe('UserService', () => {
  let service: UserService
  let repository: Repository<UserEntity>

  beforeEach(async () => {
    // TODO: define service & repository
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
    expect(repository).toBeDefined()
  })

  describe('create user', () => {
    it('should create user correctly', async function () {
      const user = { email: 'eigen3dev@foxmail.com', username: 'eigen3dev', password: '12345678' }
      expect(repository.save).toBeCalledWith(Object.assign(new UserEntity(), user))
    })
  })

  describe('find user', () => {
    it('should find user correctly', async function () {
      const user = { email: 'eigen3dev@foxmail.com', username: 'eigen3dev' }
      const userResult = null

      expect(userResult).toBe(user)
      expect(userResult).not.toHaveProperty('password')
      expect(repository.findOne).toBeCalledWith({ where: { username: user.username } })
    })

    it('should find user without password when pass withoutPassword true', async () => {
      const user = { email: 'eigen3dev@foxmail.com', username: 'eigen3dev', password: '12345678' }
      repository.metadata.propertiesMap = { username: 'username', password: 'password' }
      const userResult = await service.findUser({ username: user.username }, true)

      expect(userResult).toHaveProperty('password', '12345678')
    })
  })
})
