const router = require('express').Router()
const nodemailer = require('nodemailer')

module.exports = router

router.post('/:orderId', async (req, res, next) => {
  const transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
    auth: {
			type: "login",
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
	})

	const userEmail = req.body.email;
	const address = req.body.address;
	const mailOptions = {
    from: process.env.EMAIL_USERNAME, // sender address
    to: userEmail, // list of receivers
    subject: `Order #${req.params.orderId} from Grace-Chopper`, // Subject line
    text: `You bought some stuff. It's being processed and shipped to ${address}`
	};

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error)
    } else {
      console.log('Message sent: ' + info.response)
      res.json({message: info.response})
    }
  })
})
