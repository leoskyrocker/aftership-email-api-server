import ReliableMailer from '../services/ReliableMailer'

const create = async (req, res) => {
  const mailer = new ReliableMailer()
  const {succeeded, error, tryCount} = await mailer.send({
    from: 'Aftership Challenger <aftership.email.challenge@gmail.com>',
    subject: req.body.subject || 'No Subject',
    to: req.body.to_address || '4leolei@gmail.com',
    text: req.body.message || 'testing mailgun',
  })

  if (succeeded) {
    res.json({tryCount})
  } else {
    res.status(500).json({error, tryCount})
  }
}

export default {create}
