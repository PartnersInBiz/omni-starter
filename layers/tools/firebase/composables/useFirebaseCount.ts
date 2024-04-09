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

import { collection, getCountFromServer, query } from 'firebase/firestore'
export const useFirebaseCount = () => {
  const { firestore } = useFirebase()

  const countCol = async (col: string) => {
    const coll = collection(firestore, col)
    const snapshot = await getCountFromServer(coll)
    console.log('count: ', snapshot.data().count)
    return snapshot.data().count
  }

  const countColWhere = async (col: string) => {
    const { whereData } = useAccount()

    const coll = collection(firestore, col)
    const q = query(coll, whereData())
    const snapshot = await getCountFromServer(q)
    console.log('count: ', snapshot.data().count)
    return snapshot.data().count
  }

  return {
    countCol,
    countColWhere,
  }
}
