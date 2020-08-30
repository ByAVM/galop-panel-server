const PINCODE = 'pinpin'

function login(req, res) {
  if (req.body.pincode == PINCODE) {
    res.json({
      token: 'du8q2eva.erua5sdpeq1wruq3dasdad8.ua5tyh3df'
    })
  } else {
    res.json({
      error: 'Wrong pincode'
    })
  }
}

module.exports = {
  login
}