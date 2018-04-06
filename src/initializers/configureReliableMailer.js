import AftershipMailer from '@leoskyrocker/aftership-reliable-emailer'

export default function() {
  global.ReliableMailer = global.ReliableMailer || new AftershipMailer()
}
