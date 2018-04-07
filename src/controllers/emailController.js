import ReliableMailer from '../services/ReliableMailer'

const create = async (req, res) => {
  const mailer = new ReliableMailer()

  if (!req.body.subject) { res.status(400).json({error: 'Subject is Required.'}); return }
  if (!req.body.to_address) { res.status(400).json({error: 'Recipient Email is Required.'}); return }
  if (!req.body.message) { res.status(400).json({error: 'Message is Required.'}); return }

  const {succeeded, error, tryCount} = await mailer.send({
    from: 'Aftership Challenger <aftership.email.challenge@gmail.com>',
    subject: req.body.subject,
    to: req.body.to_address,
    text: req.body.message,
  })

  res.status(succeeded ? 200 : 500).json({error, tryCount})
}

export default {create}
