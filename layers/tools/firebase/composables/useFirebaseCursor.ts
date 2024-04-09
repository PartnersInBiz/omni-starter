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
  collection,
  endAt,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  startAt,
} from 'firebase/firestore'

export const useFirebaseCursor = () => {
  const { firestore } = useFirebase()

  const getColStart = async (col: string, by: string, start: any) => {
    const q = query(collection(firestore, col), orderBy(by), startAt(start))
    const data: any = []
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      data.push({ ...doc.data(), id: doc.id })
    })
    return data
  }

  const getColEnd = async (col: string, by: string, end: any) => {
    const q = query(collection(firestore, col), orderBy(by), endAt(end))
    const data: any = []
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      data.push({ ...doc.data(), id: doc.id })
    })
    return data
  }

  const getDocCursor = async (col: string, doc: string, by: any) => {
    const Ref = collection(firestore, col)

    const docSnap = await getDoc(doc(Ref, doc))

    // Get all cities with a population bigger than San Francisco
    const docCursor = query(Ref, orderBy(by), startAt(docSnap))
    // ...
    return docCursor
  }

  const getPagination = async (col: string, by: string, num: number) => {
    const first = query(collection(firestore, col), orderBy(by), limit(num))
    const documentSnapshots = await getDocs(first)

    // Get the last visible document
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1]

    return {
      data: documentSnapshots,
      lastVisible: lastVisible,
    }
  }

  const getPaginationNext = async (
    col: string,
    by: string,
    num: number,
    lastVisible: any,
  ) => {
    const next = await query(
      collection(firestore, col),
      orderBy(by),
      startAfter(lastVisible),
      limit(num),
    )

    const documentSnapshots = await getDocs(next)

    const lastVisibles =
      documentSnapshots.docs[documentSnapshots.docs.length - 1]
    return next
  }

  const getPaginationWhere = async (col: string, by: string, num: number) => {
    const { whereDataAccountContains } = useAccount()

    const first = query(
      collection(firestore, col),
      // whereData(),
      whereDataAccountContains(),
      orderBy(by),
      limit(num),
    )
    const documentSnapshots = await getDocs(first)
    // Get the last visible document
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1]

    return {
      data: documentSnapshots.docs.map((doc) => {
        return { ...doc.data(), id: doc.id }
      }),
      lastVisible: lastVisible,
    }
  }

  const getPaginationNextWhere = async (
    col: string,
    by: string,
    num: number,
    lastVisible: any,
  ) => {
    const { whereData, whereDataAccount } = useAccount()
    if (!lastVisible) return []
    const next = await query(
      collection(firestore, col),
      orderBy(by),
      whereData(),
      whereDataAccount(),
      startAfter(lastVisible),
      limit(num),
    )

    const documentSnapshots = await getDocs(next)

    const lastVisibles =
      documentSnapshots.docs[documentSnapshots.docs.length - 1]
    return {
      data: documentSnapshots.docs.map((doc) => {
        return { ...doc.data(), id: doc.id }
      }),
      lastVisible: lastVisible,
    }
  }

  return {
    getColStart,
    getColEnd,
    getDocCursor,
    getPagination,
    getPaginationNext,
    getPaginationWhere,
    getPaginationNextWhere,
  }
}
