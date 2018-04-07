import {expect} from 'chai'
import httpMocks from 'node-mocks-http'
import sinon from 'sinon'

import emailController from '../../controllers/emailController'

describe('# Email Controller', () => {
  it('can send email successfully', async () => {
    const {req, res} = httpMocks.createMocks({
      method: 'POST',
      url: '/emails',
      body: {
        subject: 'abc',
        to_address: 'abc@gmail.com',
        message: 'Hey there!',
      },
    })
    global.ReliableMailer = {send: () => null}
    const sendResult = new Promise(resolve => resolve({succeeded: true}))
    sinon.stub(global.ReliableMailer, 'send').returns(sendResult)
    await emailController.create(req, res)
    expect(res.statusCode).to.equal(200)
  })

  it('returns 400 when missing to_address', async () => {
    const {req, res} = httpMocks.createMocks({
      method: 'POST',
      url: '/emails',
      body: {
        subject: 'abc',
        message: 'Hey there!',
      },
    })
    await emailController.create(req, res)
    expect(res.statusCode).to.equal(400)
    expect(JSON.parse(res._getData()).error).to.match(/recipient email.*required/i)
  })

  it('returns 400 when missing subject', async () => {
    const {req, res} = httpMocks.createMocks({
      method: 'POST',
      url: '/emails',
      body: {
        to_address: 'abc@gmail.com',
        message: 'Hey there!',
      },
    })
    await emailController.create(req, res)
    expect(res.statusCode).to.equal(400)
    expect(JSON.parse(res._getData()).error).to.match(/subject.*required/i)
  })

  it('returns 400 when missing message', async () => {
    const {req, res} = httpMocks.createMocks({
      method: 'POST',
      url: '/emails',
      body: {
        subject: 'abc',
        to_address: 'abc@gmail.com',
      },
    })
    await emailController.create(req, res)
    expect(res.statusCode).to.equal(400)
    expect(JSON.parse(res._getData()).error).to.match(/message.*required/i)
  })
})
