/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import admin from 'firebase-admin'
import functions from 'firebase-functions'
admin.initializeApp()
import { onRequest } from 'firebase-functions/v2/https'
import logger from 'firebase-functions/logger'

import pkg from '@woocommerce/woocommerce-rest-api'
const WooCommerceRestApi = pkg.default

const WooCommerce = new WooCommerceRestApi({
  url: 'https://doodlehub.co.za/ada/',
  consumerKey: 'ck_f2014bee776c90414d78a5f76117c16d164b0d82',
  consumerSecret: 'cs_327dab784e5d34c5e3e3620f5144d0dc14888944',
  version: 'wc/v3',
})

const test = onRequest((request, response) => {
  logger.info('Hello logs!', { structuredData: true })
  response.send('Hello from Firebase!')
})

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

const fireAddCollection = async (col, data) => {
  const docRef = admin.firestore().collection(col)
  return await docRef
    .add(data)
    .then((doc) => {
      return doc.id
    })
    .catch(() => {
      return false
    })
}

const fireSet = async (col, id, data) => {
  logger.info('fireSet', col, id, data)
  const docRef = admin.firestore().collection(col).doc(id)
  return await docRef
    .set(data)
    .then((doc) => {
      return doc.id
    })
    .catch((_err) => {
      return false
    })
}

const fireUpdate = async (col, id, data) => {
  const docRef = admin.firestore().collection(col).doc(id)
  return await docRef
    .update(data)
    .then((doc) => {
      return doc.id
    })
    .catch((_err) => {
      return false
    })
}

const fireGetCollectionWhere = async (col, key, val) => {
  const docRef = admin.firestore().collection(col).where(key, '==', val)
  return await docRef
    .get()
    .then((querySnapshot) => {
      const result = []
      querySnapshot.forEach((doc) => {
        result.push({ id: doc.id, ...doc.data() })
      })
      return result
    })
    .catch(() => {
      return false
    })
}

const fireGetCollectionWhereDouble = async (col, key, val, _key2, val2) => {
  const docRef = admin
    .firestore()
    .collection(col)
    .where(key, '==', val)
    .where('key2', '==', val2)
  return await docRef
    .get()
    .then((querySnapshot) => {
      const result = []
      querySnapshot.forEach((doc) => {
        result.push({ id: doc.id, ...doc.data() })
      })
      return result
    })
    .catch(() => {
      return false
    })
}

const fireGetCollectionWhereArray = async (col, key, val) => {
  const docRef = admin
    .firestore()
    .collection(col)
    .where(key, 'array-contains', val)
  return await docRef
    .get()
    .then((querySnapshot) => {
      const result = []
      querySnapshot.forEach((doc) => {
        result.push({ id: doc.id, ...doc.data() })
      })
      return result
    })
    .catch(() => {
      return false
    })
}

const fireGetCollectionWhereLimit = async (col, key, val, limit) => {
  console.log('fire', col, key, val, limit)
  const docRef = admin
    .firestore()
    .collection(col)
    .where(key, '==', val)
    .limit(limit)
  return await docRef
    .get()
    .then((querySnapshot) => {
      const result = []
      querySnapshot.forEach((doc) => {
        result.push({ ...doc.data(), id: doc.id })
      })
      console.log('result', result.length)
      return result
    })
    .catch(() => {
      return false
    })
}

const fireGetCollection = async (col) => {
  const docRef = admin.firestore().collection(col)
  return await docRef
    .get()
    .then((querySnapshot) => {
      const result = []
      querySnapshot.forEach((doc) => {
        result.push({ id: doc.id, ...doc.data() })
      })
      return result
    })
    .catch(() => {
      return false
    })
}

const fireGetSingle = async (col, id) => {
  const docRef = admin.firestore().collection(col).doc(id)
  return await docRef
    .get()
    .then((doc) => {
      if (!doc.exists) return false

      const payload = doc.data()

      return payload
    })
    .catch(() => {
      return false
    })
}

const fireDeleteItem = async (col, id) => {
  console.log('fireDeleteItem', col, id)

  admin.firestore().collection(col).doc(id).delete()
}

const fireDeleteItems = async (col, data) => {
  console.log('fireDeleteItems', col, data.length)
  for (let i = 0; i < data.length; i++) {
    let dels = await admin.firestore().collection(col).doc(data[i].id).delete()
    console.log('deleted', dels)
  }

  return true
}

const fireDeleteItemsBatch = async (col, data) => {
  const db = admin.firestore()
  const batch = db.batch()
  for (let i = 0; i < data.length; i++) {
    var removedAdminRef = admin.firestore().collection(col).doc(data[i].id)
    batch.delete(removedAdminRef)
  }

  batch.commit()
  return true
}

const fireAdd = functions.https.onRequest(async (request, response) => {
  let data = request.body
  const add = await fireAddCollection(data.collection, data.data)
  response.send(add)
})

const fireSetFunc = functions.https.onRequest(async (request, response) => {
  let data = request.body
  const add = await fireSet(data.collection, data.id, data.data)
  response.send(add)
})

const fireUpdateFunc = functions.https.onRequest(async (request, response) => {
  let data = request.body
  const add = await fireUpdate(data.collection, data.id, data.data)
  response.send(add)
})

const fireGet = functions.https.onRequest(async (request, response) => {
  let data = request.body
  const add = await fireGetCollection(data.collection)
  response.send(add)
})

const fireGetWhere = functions.https.onRequest(async (request, response) => {
  let data = request.body
  const add = await fireGetCollectionWhere(data.collection, data.key, data.val)
  response.send(add)
})

const fireGetWhereArray = functions.https.onRequest(
  async (request, response) => {
    let data = request.body
    const add = await fireGetCollectionWhereArray(
      data.collection,
      data.key,
      data.val,
    )
    response.send(add)
  },
)

const fireGetWhereLimit = functions.https.onRequest(
  async (request, response) => {
    let data = request.body
    const add = await fireGetCollectionWhereLimit(
      data.collection,
      data.key,
      data.val,
      data.limit,
    )
    response.send(add)
  },
)

const fireGetWhereDouble = functions.https.onRequest(
  async (request, response) => {
    let data = request.body
    const add = await fireGetCollectionWhereDouble(
      data.collection,
      data.key,
      data.val,
      data.key2,
      data.val2,
    )
    response.send(add)
  },
)

const fireGetSingleFunc = functions.https.onRequest(
  async (request, response) => {
    let data = request.body
    const add = await fireGetSingle(data.collection, data.id)
    response.send(add)
  },
)

const fireDelete = functions.https.onRequest(async (request, response) => {
  let data = request.body
  const add = await fireDeleteItem(data.collection, data.id)
  response.send(add)
})

const fireDeleteItemsFunc = functions.https.onRequest(
  async (request, response) => {
    let data = request.body
    const add = await fireDeleteItems(data.collection, data.data)
    response.send(add)
  },
)

const fireDeleteItemsBatchFunc = functions.https.onRequest(
  async (request, response) => {
    let data = request.body
    const add = await fireDeleteItemsBatch(data.collection, data.data)
    response.send(add)
  },
)

const fireDeleteAll = functions.https.onRequest(async (request, response) => {
  let data = request.body
  const add = await fireDeleteAllFunc(data.collection)
  response.send(add)
})

export const woocoupon = onRequest(async (request, response) => {
  logger.info('Hello logs!', { structuredData: true })
  const data = {
    code: '100off-',
    discount_type: 'percent',
    amount: '100',
    individual_use: true,
    exclude_sale_items: true,
    minimum_amount: '100.00',
  }

  let woo = await WooCommerce.post('coupons', data)
    .then((response) => {
      console.log(response.data)
    })
    .catch((error) => {
      console.log(error.response.data)
    })
})

export const activate = onRequest(async (request, response) => {
  logger.info('Hello logs!', { structuredData: true })
  const vin = request.query.vin
  logger.info('Hello logs vin!' + vin, { structuredData: true })
  const data_code = {
    code: '100off-' + vin,
    discount_type: 'percent',
    amount: '100',
    individual_use: true,
    exclude_sale_items: true,
    minimum_amount: '100.00',
  }

  logger.info('Hello logs code!' + data_code.code, { structuredData: true })
  try {
    const res = await WooCommerce.post('coupons', data_code)
    logger.info('Woocommerce coupon!', res)
  } catch (error) {
    logger.info('Woccom error!', error)
  }

  try {
    const data = await fireGetCollectionWhere('messages', 'vin', vin)
    logger.info('messages!', data)
    logger.info('messages!', data.length)
    if (data.length > 0) {
      const res = await fireSet('vehicles', data[0].id, {
        ...data[0],
        status: 'active',
      })
      logger.info('vehicles!', res)
      response.send('activate ' + vin)
      const smsBody = `Dear Client, \n\n Your Honda Dealer has allocated your free Honda training. \n Please use the below vouchercode to claim your Free Training at the Honda Academy. \n\n Voucher Code: ${data_code.code} \n\n Should you require any further assistance, please WhatsApp 079 637 5465 or Email info@adasa.co.za. \n\n Regards, \n Honda & ADA`

      let mobile = data[0].mobile

      logger.info('mobile before!', mobile)
      if (mobile.startsWith('0')) {
        //remove first 0 and add +27
        mobile = mobile.replace('0', '+27')
      }
      logger.info('mobile after!', mobile)

      let newdata = {
        ...data[0],
        status: 'active',
        to: mobile,
        body: smsBody,
      }

      logger.info('newdata!', newdata.mobile)
      let new_id = data[0].id + vin
      const res2 = await fireSet('messages', new_id, newdata)
      logger.info('messages!', res2)
      response.send('activate ' + vin)
    }
  } catch (error) {
    logger.info('messages!', error)
  }
})

export const decline = onRequest((request, response) => {
  logger.info('Hello logs!', { structuredData: true })
  const vin = request.query.vin
  fireGetCollectionWhere('messages', 'vin', vin).then((data) => {
    if (data.length > 0) {
      fireSet('vehicles', data[0].id, { ...data, status: 'decline' }).then(
        () => {
          response.send('decline ' + vin)
        },
      )
    } else {
      response.send('not found ' + vin)
    }
  })
})
