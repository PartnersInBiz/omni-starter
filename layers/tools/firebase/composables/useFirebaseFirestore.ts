/*
< less than
<= less than or equal to
== equal to
> greater than
>= greater than or equal to
!= not equal to
array-contains
array-contains-any
in
not-in
*/

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocFromCache,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
  writeBatch,
} from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
export default function () {
  const { firestore, firebaseApp, storage } = useFirebase()
  const { extraInfo, updateInfo } = useAccount()

  const createData = (formData: any) => {
    let text = ''
    if (formData.embedding) delete formData.embedding
    //loop over formData and if the form data contains a key that is in the schema, add it to the text string
    function processItem(key: string, item: any): string {
      let text = ''
      if (Array.isArray(item)) {
        item.forEach((subItem: any, index: number) => {
          text += processItem(` ${key}[${index}]`, subItem)
        })
      } else if (typeof item === 'object' && item !== null) {
        for (const subKey in item) {
          if (item[subKey] !== undefined) {
            text += processItem(` ${key}.${subKey}`, item[subKey])
          }
        }
      } else {
        text += `${key}: ${item}\n`
      }
      return text
    }

    for (const key in formData) {
      if (formData[key] !== undefined) {
        text += processItem(key, formData[key])
      }
    }

    let payload: any = {
      ...formData,
      // embedding: text,
    }
    // remove any duplicates
    payload = Object.keys(payload).reduce((acc: any, key: any) => {
      if (payload[key]) {
        acc[key] = payload[key]
      }
      return acc
    }, {})
    return payload
  }

  const updateData = (formData: any) => {
    let text = ''
    if (formData.embedding) delete formData.embedding
    //loop over formData and if the form data contains a key that is in the schema, add it to the text string
    for (const key in formData) {
      if (formData[key] !== undefined) {
        //if its formData[key] is object then loop through it and add it to the text string
        if (Array.isArray(formData[key])) {
          //if its formData[key] is array then loop through it and add it to the text string
          formData[key].forEach((item: any) => {
            if (typeof item === 'object') {
              for (const key2 in item) {
                if (item[key2] !== undefined) {
                  text += `${key2}: ${item[key2]}\n`
                }
              }
            } else {
              text += `${key}: ${item}\n`
            }
          })
        } else if (typeof formData[key] === 'object') {
          for (const key2 in formData[key]) {
            if (formData[key][key2] !== undefined) {
              text += `${key2}: ${formData[key][key2]}\n`
            }
          }
        } else {
          text += `${key}: ${formData[key]}\n`
        }
      }
    }

    let payload: any = {
      ...formData,
      // embedding: text,
      // ...extraInfoUpdate(),
    }
    // remove any duplicates
    payload = Object.keys(payload).reduce((acc: any, key: any) => {
      if (payload[key]) {
        acc[key] = payload[key]
      }
      return acc
    }, {})
    return payload
  }
  const cleanData = (data: any) => {
    const match: any = data
    if (match) {
      if (match.variations) {
        if (typeof match.variations === 'string')
          match.variations = JSON.parse(match.variations)
      }

      if (match.billing_info) {
        if (typeof match.billing_info === 'string')
          match.billing_info = JSON.parse(match.billing_info)
      }

      if (match.cartItems) {
        if (typeof match.cartItems === 'string')
          match.cartItems = JSON.parse(match.cartItems)
      }

      if (match.cart_summary) {
        if (typeof match.cart_summary === 'string')
          match.cart_summary = JSON.parse(match.cart_summary)
      }

      if (match.other_address) {
        if (typeof match.other_address === 'string')
          match.other_address = JSON.parse(match.other_address)
      }

      if (match.shipping_address) {
        if (typeof match.shipping_address === 'string')
          match.shipping_address = JSON.parse(match.shipping_address)
      }

      if (match.user) {
        if (typeof match.user === 'string') match.user = JSON.parse(match.user)
      }

      if (match.attributes) {
        if (typeof match.attributes === 'string')
          match.attributes = JSON.parse(match.attributes)
      }

      if (match.categories) {
        if (typeof match.categories === 'string')
          match.categories = JSON.parse(match.categories)
      }

      if (match.access_uid) {
        if (typeof match.access_uid === 'string')
          match.access_uid = JSON.parse(match.access_uid)
      }

      if (match.avatar) {
        if (typeof match.avatar === 'string')
          match.avatar = JSON.parse(match.avatar)
      }
      if (match.customer_uid) {
        if (typeof match.customer_uid === 'string')
          match.customer_uid = JSON.parse(match.customer_uid)
      }

      if (match.access) {
        if (typeof match.access === 'string')
          match.access = JSON.parse(match.access)
      }

      if (match.performance_tracker) {
        if (typeof match.performance_tracker === 'string')
          match.performance_tracker = JSON.parse(match.performance_tracker)
      }

      if (match.brandings) {
        if (typeof match.brandings === 'string')
          match.brandings = JSON.parse(match.brandings)
      }

      if (match.branding_portal) {
        if (typeof match.branding_portal === 'string')
          match.branding_portal = JSON.parse(match.branding_portal)
      }

      // if (match.customer_uid) {
      //   if (typeof match.customer_uid ==="string")
      //     match.customer_uid = JSON.parse(
      //       match.customer_uid
      //     );
      // }

      if (match.default_attributes) {
        if (typeof match.default_attributes === 'string')
          match.default_attributes = JSON.parse(match.default_attributes)
      }
      if (match.tags) {
        if (typeof match.tags === 'string') match.tags = JSON.parse(match.tags)
      }

      if (match.billing_info) {
        if (typeof match.billing_info === 'string')
          match.billing_info = JSON.parse(match.billing_info)
      }

      if (match.cartSummary) {
        if (typeof match.cartSummary === 'string')
          match.cartSummary = JSON.parse(match.cartSummary)
      }

      if (match.formData) {
        if (typeof match.formData === 'string')
          match.formData = JSON.parse(match.formData)
      }

      if (match.ordered_items) {
        if (typeof match.ordered_items === 'string')
          match.ordered_items = JSON.parse(match.ordered_items)
      }

      if (match.other_address) {
        if (typeof match.other_address === 'string')
          match.other_address = JSON.parse(match.other_address)
      }

      if (match.shipping_address) {
        if (typeof match.shipping_address === 'string')
          match.shipping_address = JSON.parse(match.shipping_address)
      }

      if (match.search_attributes) {
        if (typeof match.search_attributes === 'string')
          match.search_attributes = JSON.parse(match.search_attributes)
      }

      if (match.search_brandings) {
        if (typeof match.search_brandings === 'string')
          match.search_brandings = JSON.parse(match.search_brandings)
      }

      if (match.meta_data) {
        if (typeof match.meta_data === 'string')
          match.meta_data = JSON.parse(match.meta_data)
      }

      if (match.search_attributes_options) {
        if (typeof match.search_attributes_options === 'string')
          match.search_attributes_options = JSON.parse(
            match.search_attributes_options,
          )
      }

      if (match.positions) {
        if (typeof match.positions === 'string')
          match.positions = JSON.parse(match.positions)
      }

      if (match.spaces) {
        if (typeof match.spaces === 'string')
          match.spaces = JSON.parse(match.spaces)
      }

      if (match.search_categories) {
        if (typeof match.search_categories === 'string')
          match.search_categories = JSON.parse(match.search_categories)
      }

      if (match.images) {
        if (typeof match.images === 'string')
          match.images = JSON.parse(match.images)
      }
    }
    return match
  }

  const deleteDocu = async (col: string, id: string) => {
    const result = await deleteDoc(doc(firestore, col, id))
    return result
  }

  const setDocu = async (col: string, id: string, data: any) => {
    data = createData(data)
    Object.keys(data).forEach((key) => {
      if (data[key] === null || data[key] === undefined) {
        data[key] = ''
      }
    })
    if (data.createdDate !== undefined) data = { ...data, ...updateInfo() }
    else data = { ...data, ...extraInfo() }
    const colRef = collection(firestore, col)
    try {
      const dc = await setDoc(doc(colRef, id), data)
      return dc
    } catch (err) {
      return err
    }
  }

  const getDocu = async (col: string, id: string) => {
    const docRef = doc(firestore, col, id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return { id: id, ...docSnap.data() }
    } else {
      // docSnap.data() will be undefined in this case
      return { fireError: true }
    }
  }

  const getDocuCache = async (col: string, id: string) => {
    const docRef = doc(firestore, col, id)

    // Get a document, forcing the SDK to fetch from the offline cache.
    try {
      const doc = await getDocFromCache(docRef)
      // Document was found in the cache. If no cached document exists,
      // an error will be returned to the 'catch' block below.
      console.log('Cached document data:', doc.data())
      return doc.data()
    } catch (e) {
      console.log('Error getting cached document:', e)
      return { fireError: true }
    }
  }

  const getCol = async (col: string) => {
    const q = query(collection(firestore, col))
    const data: any = []
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots

      data.push({ ...doc.data(), id: doc.id })
    })
    return data
  }

  const getColWhere = async (
    col: string,
    key: string,
    operator: any,
    val: string,
  ) => {
    const q = query(collection(firestore, col), where(key, operator, val))
    const data: any = []
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots

      data.push({ ...doc.data(), id: doc.id })
    })
    return data
  }

  const getColWhereDouble = async (
    col: string,
    key: string,
    operator: any,
    val: string,
    key2: string,
    operator2: any,
    val2: string,
  ) => {
    const q = query(
      collection(firestore, col),
      where(key, operator, val),
      where(key2, operator2, val2),
    )
    const data: any = []
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots

      data.push({ ...doc.data(), id: doc.id })
    })
    return data
  }

  const getColSub = async (col: string, id: string, col2: string) => {
    const q = query(collection(firestore, col, id, col2))
    const data: any = []
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots

      data.push({ ...doc.data(), id: doc.id })
    })
    return data
  }

  const getColOrderLimit = async (col: string, by: string, num: number) => {
    const q = query(collection(firestore, col), orderBy(by), limit(num))
    const data: any = []
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots

      data.push({ ...doc.data(), id: doc.id })
    })
    return data
  }

  const getColWhereOrderLimit = async (
    col: string,
    key: string,
    operator: any,
    val: string,
    by: string,
    num: number,
  ) => {
    const q = query(
      collection(firestore, col),
      where(key, operator, val),
      orderBy(by),
      limit(num),
    )
    const data: any = []
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots

      data.push({ ...doc.data(), id: doc.id })
    })
    return data
  }

  const getColWhereDoubleOrderLimit = async (
    col: string,
    key: string,
    operator: any,
    val: string,
    key2: string,
    operator2: any,
    val2: string,
    by: string,
    num: number,
  ) => {
    const q = query(
      collection(firestore, col),
      where(key, operator, val),
      where(key2, operator2, val2),
      orderBy(by),
      limit(num),
    )
    const data: any = []
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots

      data.push({ ...doc.data(), id: doc.id })
    })
    return data
  }

  const getColSubOrderLimit = async (
    col: string,
    id: string,
    col2: string,
    by: string,
    num: number,
  ) => {
    const q = query(
      collection(firestore, col, id, col2),
      orderBy(by),
      limit(num),
    )
    const data: any = []
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots

      data.push({ ...doc.data(), id: doc.id })
    })
    return data
  }

  const deleteById = async (col: string, id: string) => {
    const docRef = doc(firestore, col, id)
    await deleteDoc(docRef)
      .then(() => true)
      .catch((_error) => false)
  }

  const set = async (col: string, document: any) => {
    document = createData(document)
    const docRef: any = await setDoc(
      doc(collection(firestore, col)),
      document,
      {
        merge: true,
      },
    )
    return docRef.id
  }

  const setById = async (col: string, id: string, data: any) => {
    console.log('set by', col, id, data)

    if (data.createdDate !== undefined) data = { ...data, ...updateInfo() }
    else data = { ...data, ...extraInfo() }
    const docRefs = doc(firestore, col, id)
    return await setDoc(docRefs, data, {
      merge: true,
    })
      .then((res) => {
        console.log('SETTING RES', res)
        return 'DONE'
      })
      .catch((error) => {
        console.log('ERROR setting', error)
        console.log(error)
      })
  }

  const update = async (col: string, id: string, datas: any) => {
    datas = updateData(datas)
    if (datas.createdDate !== undefined) datas = { ...datas, ...updateInfo() }
    else datas = { ...datas, ...extraInfo() }
    const docRefs = doc(firestore, col, id)
    return await updateDoc(docRefs, datas)
      .then((item) => {
        return 'done'
      })
      .catch((error) => {
        return error
      })
  }

  const add = async (col: string, data: any, ids?: any) => {
    console.log('ADD', col, data)
    data = createData(data)
    try {
      const docRefs = collection(firestore, col)
      // if (data.createdDate !== undefined) data = { ...data, ...updateInfo() }
      // else data = { ...data, ...extraInfo() }
      // data = { ...data, ...extraInfo(ids) }
      const docRef = await addDoc(docRefs, data)
      return { id: docRef.id, ...data }
    } catch (error) {
      console.log('ERROR', error)
      return error
    }
    // const colRef = collection(firestore, col)
    // const docRef = await addDoc(colRef, data)
    // return docRef.id
  }

  const setBatch = async (col: string, arr: any[]) => {
    // Get a new write batch
    const batch = writeBatch(firestore)
    for (let x = 0; x < arr.length; x++) {
      const send_id = arr[x].id ? arr[x].id : makeid(20)
      const setB = doc(firestore, col, send_id)
      batch.set(setB, arr[x])
    }
    // Commit the batch
    return await batch
      .commit()
      .then(() => {
        return true
      })
      .catch((_error) => {
        return false
      })
  }

  const setBatchMore = async (
    col: string,
    id: string,
    col2: string,
    arr: any[],
  ) => {
    // Get a new write batch
    const batch = writeBatch(firestore)
    for (let x = 0; x < arr.length; x++) {
      const send_id = arr[x].id ? arr[x].id : makeid(20)
      const setB = doc(firestore, col, id, col2, send_id)
      batch.set(setB, arr[x])
    }
    // Commit the batch
    return await batch
      .commit()
      .then(() => {
        return true
      })
      .catch((_error) => {
        return false
      })
  }

  const updateBatch = async (col: string, arr: any[]) => {
    // Get a new write batch
    const batch = writeBatch(firestore)
    for (let x = 0; x < arr.length; x++) {
      const setB = doc(firestore, col, arr[x].id)
      batch.update(setB, arr[x])
    }
    // Commit the batch
    return await batch
      .commit()
      .then(() => {
        return true
      })
      .catch(() => {
        return false
      })
  }

  const deleteBatch = async (col: string, arr: any[]) => {
    // Get a new write batch
    const batch = writeBatch(firestore)
    for (let x = 0; x < arr.length; x++) {
      const setB = doc(firestore, col, arr[x].id)
      batch.delete(setB)
    }
    // Commit the batch
    return await batch
      .commit()
      .then(() => {
        return true
      })
      .catch(() => {
        return false
      })
  }

  const del = async (col: any, id: any) => {
    console.log(col, id)
    const docRef = doc(firestore, col, id)
    return await deleteDoc(docRef)
  }
  const progressFiles: any = useState('progressFiles', () => {
    return []
  })
  const progressFilesName: any = useState('progressFilesName', () => {
    return {}
  })
  const upload = async (images: any[], selectedTags: any, index?: number) => {
    const { account, client } = useAccount()
    const loaded: any = []
    for (let i = 0; i < images.length; i++) {
      const file = images[i]
      console.log('file', file)
      // Create the file metadata
      /** @type {any} */
      const metadata = {
        contentType: file.type,
        name: file.name,
        tags: selectedTags,
      }

      const location = `${
        account.value.id ? account.value.id : client.value.id
      }/${file.type}/${file.name}`
      // Upload file and metadata to the object 'images/mountains.jpg'
      const storageRef = ref(storage, location)
      const uploadTask = uploadBytesResumable(storageRef, file.file, metadata)

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        'state_changed',
        (_snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (_snapshot.bytesTransferred / _snapshot.totalBytes) * 100
          progressFiles.value[i] = progress
          progressFilesName.value[file.name] = progress
          switch (_snapshot.state) {
            case 'paused':
              break
            case 'running':
              break
          }
        },
        (error: { code: any }) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break
            case 'storage/canceled':
              // User canceled the upload
              break

            // ...

            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              // Upload completed successfully, now we can get the download URL
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                // const ref = doc(db, "downloads", user.value.uid);
                const document = {
                  type: file.type,
                  name: file.name,
                  src: downloadURL,
                  size: file.size,
                  contentType: file.type,
                }

                try {
                  add('uploads', document).then(() => {
                    images = []
                  })
                } catch (e) {}
              })
              break
          }
        },
        async () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            // const ref = doc(db, "downloads", user.value.uid);
            const document = {
              type: file.type,
              name: file.name,
              src: downloadURL,
              tags: selectedTags,
              size: file.size,
              contentType: file.type,
            }

            try {
              console.log('ADDDDINGGG', document)
              add('uploads', document).then((data) => {
                // images.value = []
                loaded.push(data)
              })
            } catch (e) {
              return e
            }
          })
        },
      )
    }
    return loaded
  }

  function makeid(length: number) {
    let result = ''
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    for (let i = 0; i < length; i++)
      result += characters.charAt(Math.floor(Math.random() * charactersLength))

    return result
  }

  return {
    setDocu,
    getDocu,
    getDocuCache,
    getCol,
    getColWhere,
    getColWhereDouble,
    getColSub,
    getColOrderLimit,
    getColWhereOrderLimit,
    getColWhereDoubleOrderLimit,
    getColSubOrderLimit,
    deleteDocu,
    deleteById,
    set,
    setById,
    update,
    add,
    setBatch,
    setBatchMore,
    updateBatch,
    deleteBatch,
    del,
    upload,
    progressFiles,
    progressFilesName,
  }
}
