/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */

const functions = require('firebase-functions');
const axios = require('axios');
const USER_ERROR_CODES = ['missing-input-response', 'invalid-input-response']

exports.sendRecaptcha = functions.https.onRequest(async (req, res) => {
  res.set('Access-Control-Allow-Origin', functions.config().recaptcha.origin);

  const secret = functions.config().recaptacha.key;
  const token = req.query.token;
  console.log("token", token);

  try {
    const response = await axios.get(`https://recaptcha.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`);

    const data = response.data;
    console.log("response data: ", data);
    if (data.success) {
      return res.status(200).send({ score: data.score })
    }

    const errorCodes = data['error-codes'];
    if (errorCodes.length == 1 && USER_ERROR_CODES.includes(errorCodes[0])) {
      return res.status(400).send('Invalid Input')
    }
    return res.status(500).send('Internal Error');
  } catch (error) {
    console.log("error: ", error);
    res.status(500).send('Internal Error');
  }
});
