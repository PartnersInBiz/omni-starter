export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    console.log('body', body)
    // // const config =
    // const accountSid = body.accountSid
    // const authToken = body.authToken
    // console.log(accountSid, authToken)
    // const send = {
    //   body: body.body,
    //   from: body.from.replace(/\s/g, ""),
    //   to: body.to,
    // }

    // console.log("send", send)
    // const client = require("twilio")(accountSid, authToken)
    // console.log("client", client)
    // client.messages
    //   .create(send)
    //   .then((message: { sid: any }) => {
    //     console.log(message.sid)
    //     console.log(message)
    //   })
    //   .catch((error: any) => {
    //     console.log("err", error)
    //   })
  } catch (error) {
    console.log('error', error)
    return {
      type: 'error',
      verdict: '',
    }
  }
})
