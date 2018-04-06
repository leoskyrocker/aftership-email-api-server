import email from '../controllers/emailController'

export default function(app) {
  app.route('/emails')
    .get(email.create)
}
