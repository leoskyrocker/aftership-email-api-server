import configureReliableMailer from '../initializers/configureReliableMailer'

function getMailer() {
  if (!global.ReliableMailer) { configureReliableMailer() }
  return global.ReliableMailer
}

export default getMailer
