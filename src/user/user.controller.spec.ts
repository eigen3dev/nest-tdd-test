import { UserController } from './user.controller'

describe('User Controller', () => {
  let controller: UserController

  beforeEach(async () => {
    // TODO: define controller
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('profile', () => {
    it('should get user info given a jwt token', async () => {
      const user = await controller.profile({})

      expect(user).toBe(undefined)
    })
  })
})
