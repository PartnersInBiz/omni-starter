export default function useTwilio() {
  const twilioAuthDetials: any = useState('twilioAuthDetials', () => {
    return {
      accountSid: 'ACa7d817bdb793e0dff6a8d779141c8b9c',
      authToken: 'f7e02e27b2eae9f43ccd9563800b2da7',
      from: '+1 912 348 8187',
    }
  })

  const sendSms = async (to: any, body: any) => {
    const { data, pending, error, refresh } = await $fetch('/api/twilio/sms', {
      method: 'POST',
      body: {
        ...twilioAuthDetials.value,
        to,
        body,
      },
    })

    return {
      data,
      pending,
      error,
      refresh,
    }
  }

  return {
    sendSms,
  }
}
