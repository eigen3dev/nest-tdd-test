import { cryptoPassword } from 'utils'

describe('Utilities', function () {
  it('cryptoPassword', function () {
    const hashedPassword = cryptoPassword('eigen3m!')

    expect(hashedPassword).toBe('69df74573164b3039aaa314d1c1a952a5b34261e3a33b3e076efe0425b2f5868')
  })
})
