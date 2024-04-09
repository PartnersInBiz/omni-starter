export const useSecurity = () => {
  const cipher = (salt: string) => {
    const textToChars = (text: string) =>
      text.split('').map((c: string) => c.charCodeAt(0))
    const byteHex = (n: any) => ('0' + Number(n).toString(16)).substr(-2)
    const applySaltToChar = (code: any) =>
      textToChars(salt).reduce((a: number, b: number) => a ^ b, code)

    return (text: string) =>
      text.split('').map(textToChars).map(applySaltToChar).map(byteHex).join('')
  }

  const decipher = (salt: string) => {
    const textToChars = (text: string) =>
      text.split('').map((c: string) => c.charCodeAt(0))
    const applySaltToChar = (code: any) =>
      textToChars(salt).reduce((a: number, b: number) => a ^ b, code)
    return (encoded: { match: (arg0: RegExp) => any[] }) =>
      encoded
        .match(/.{1,2}/g)
        .map((hex: string) => parseInt(hex, 16))
        .map(applySaltToChar)
        .map((charCode: number) => String.fromCharCode(charCode))
        .join('')
  }

  // To create a cipher
  const createCipher = (salt: string, text: string) => {
    // const myCipher = cipher('mySecretSalt')

    // //Then cipher any text:
    // console.log(myCipher('the secret string'))
    const myCipher = cipher(salt)
    return myCipher(text)
  }

  //To decipher, you need to create a decipher and use it:
  const createDecipher = (salt: string, encoded: any) => {
    // const myDecipher = decipher('mySecretSalt')
    // console.log(myDecipher("7c606d287b6d6b7a6d7c287b7c7a61666f"))

    const myDecipher = decipher(salt)
    return myDecipher(encoded)
  }

  return {
    createCipher,
    createDecipher,
  }
}
