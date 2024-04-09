export const removeUndefined = (obj: { [x: string]: any }) => {
  const newObj: any = {}

  Object.keys(obj).forEach((key) => {
    if (Array.isArray(obj[key])) {
      console.log('array key', obj[key], ' -- ', key)
      console.log('array typeof', typeof obj[key], ' -- ', key)

      if (obj[key] === null || key === 'place') {
        console.log('array INSIDE', obj[key], ' -- ', key)
        console.log(
          'array convertObjectToArray',
          convertObjectToArray(obj[key]),
          ' -- ',
          key,
        )

        newObj[key] = convertObjectToArray(obj[key])
      } else {
        newObj[key] = obj[key].map((item: any) => removeUndefined(item))
      }
    } else if (obj[key] === Object(obj[key])) {
      newObj[key] = removeUndefined(obj[key])
    } else if (obj[key] !== undefined && obj[key] !== null) {
      newObj[key] = obj[key]
    }
  })
  return newObj
}

export const convertObjectToArray = (inputObject: any) => {
  // Assuming the inputObject has a single key "0"
  const arrayWithoutNumericKey = Object.values(inputObject)

  return arrayWithoutNumericKey
}

// export const extraInfo = () => {
//   return {
//     onb: "999",
//   }
// }
