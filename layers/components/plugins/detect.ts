// import { defineNuxtPlugin, useRequestHeaders } from '#app'
// import MobileDetect from 'mobile-detect'

export default defineNuxtPlugin(() => {
  // const headers = useRequestHeaders()

  // const md = process.server
  //   ? new MobileDetect(headers['user-agent'])
  //   : new MobileDetect(navigator.userAgent)

  // console.log(md.mobile()) // 'Sony'
  // console.log(md.phone()) // 'Sony'
  // console.log(md.tablet()) // null
  // console.log(md.userAgent()) // 'Safari'
  // console.log(md.os()) // 'AndroidOS'
  // console.log(md.is('iPhone')) // false
  // console.log(md.is('bot')) // false
  // console.log(md.version('Webkit')) // 534.3
  // console.log(md.versionStr('Build')) // '4.1.A.0.562'
  // console.log(md.match('playstation|xbox')) // false

  // const isMobile = md.phone() !== null || md.mobile() === 'UnknownMobile'
  // const isTablet = md.tablet() !== null || md.mobile() === 'UnknownTablet'
  // const isDesktop = !isMobile && !isTablet
  // const os = md.os()
  // const browser = md.userAgent()

  return {
    // provide: {
    //   isMobile: () => isMobile,
    //   isTablet: () => isTablet,
    //   isDesktop: () => isDesktop,
    //   os: () => os,
    //   browser: () => browser,
    // },
  }
})
