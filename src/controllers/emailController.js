import ReliableMailer from '../services/ReliableMailer'

const create = async (req, res) => {
  const mailer = new ReliableMailer()
  const {succeeded, error, tryCount} = await mailer.send({
    from: 'aftership-email-challenge@gmail.com',
    name: 'Aftership Challenger',
    subject: 'test',
    to: '4leolei@gmail.com',
    text: 'testing mailgun',
  })

  if (succeeded) {
    res.json({
      tryCount,
    })
    // res.send(`Your email has been sent after ${tryCount} trial(s).`)
  } else {
    res.status(500).json({
      error,
      tryCount,
    })
    // res.send(`Some error continued to happen after ${tryCount} trial(s): ${error}`)
  }
}

export default {create}
