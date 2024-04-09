import admin from 'firebase-admin'
import functions from 'firebase-functions'

export const fireAddCollection = async (col, data) => {
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

export const fireSet = async (col, id, data) => {
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

export const fireUpdate = async (col, id, data) => {
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

export const fireGetCollectionWhere = async (col, key, val) => {
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

export const fireGetCollectionWhereDouble = async (
  col,
  key,
  val,
  _key2,
  val2,
) => {
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

export const fireGetCollectionWhereArray = async (col, key, val) => {
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

export const fireGetCollectionWhereLimit = async (col, key, val, limit) => {
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

export const fireGetCollection = async (col) => {
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

export const fireGetSingle = async (col, id) => {
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

export const fireDeleteItem = async (col, id) => {
  console.log('fireDeleteItem', col, id)

  admin.firestore().collection(col).doc(id).delete()
}

export const fireDeleteItems = async (col, data) => {
  console.log('fireDeleteItems', col, data.length)
  for (let i = 0; i < data.length; i++) {
    let dels = await admin.firestore().collection(col).doc(data[i].id).delete()
    console.log('deleted', dels)
  }

  return true
}

export const fireDeleteItemsBatch = async (col, data) => {
  const db = admin.firestore()
  const batch = db.batch()
  for (let i = 0; i < data.length; i++) {
    var removedAdminRef = admin.firestore().collection(col).doc(data[i].id)
    batch.delete(removedAdminRef)
  }

  batch.commit()
  return true
}

export const fireAdd = functions.https.onRequest(async (request, response) => {
  let data = request.body
  const add = await fireAddCollection(data.collection, data.data)
  response.send(add)
})

export const fireSetFunc = functions.https.onRequest(
  async (request, response) => {
    let data = request.body
    const add = await fireSet(data.collection, data.id, data.data)
    response.send(add)
  },
)

export const fireUpdateFunc = functions.https.onRequest(
  async (request, response) => {
    let data = request.body
    const add = await fireUpdate(data.collection, data.id, data.data)
    response.send(add)
  },
)

export const fireGet = functions.https.onRequest(async (request, response) => {
  let data = request.body
  const add = await fireGetCollection(data.collection)
  response.send(add)
})

export const fireGetWhere = functions.https.onRequest(
  async (request, response) => {
    let data = request.body
    const add = await fireGetCollectionWhere(
      data.collection,
      data.key,
      data.val,
    )
    response.send(add)
  },
)

export const fireGetWhereArray = functions.https.onRequest(
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

export const fireGetWhereLimit = functions.https.onRequest(
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

export const fireGetWhereDouble = functions.https.onRequest(
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

export const fireGetSingleFunc = functions.https.onRequest(
  async (request, response) => {
    let data = request.body
    const add = await fireGetSingle(data.collection, data.id)
    response.send(add)
  },
)

export const fireDelete = functions.https.onRequest(
  async (request, response) => {
    let data = request.body
    const add = await fireDeleteItem(data.collection, data.id)
    response.send(add)
  },
)

export const fireDeleteItemsFunc = functions.https.onRequest(
  async (request, response) => {
    let data = request.body
    const add = await fireDeleteItems(data.collection, data.data)
    response.send(add)
  },
)

export const fireDeleteItemsBatchFunc = functions.https.onRequest(
  async (request, response) => {
    let data = request.body
    const add = await fireDeleteItemsBatch(data.collection, data.data)
    response.send(add)
  },
)

export const fireDeleteAll = functions.https.onRequest(
  async (request, response) => {
    let data = request.body
    const add = await fireDeleteAllFunc(data.collection)
    response.send(add)
  },
)
