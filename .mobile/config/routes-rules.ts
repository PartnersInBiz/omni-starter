import { isProduction } from 'std-env'

const staticAssetsRule = isProduction
  ? {
      headers: {
        'Cache-Control': 'public, max-age=31536000',
      },
    }
  : {}

const staticPageRule = isProduction
  ? {
      prerender: false,
      cache: {
        maxAge: 3600,
        swr: true,
        staleMaxAge: 3600,
      },
      headers: {
        'Cache-Control':
          'public, max-age=3600, s-maxage=3600, stale-while-revalidate=3600, stale-if-error=3600',
      },
    }
  : {}

export const demoRules = {
  '/img/**': staticAssetsRule,
  '/shiki/**': staticAssetsRule,
  '/api/**': staticAssetsRule,
  '/dashboards/**': staticPageRule,
  '/layouts/**': staticPageRule,
  '/wizard/**': staticPageRule,
  '/auth/**': staticPageRule,
}

export const landingRules = {
  '/_ipx/**': staticAssetsRule,
  '/': staticPageRule,
  '/demos': staticPageRule,
}

export const documentationRules = {
  '/documentation/**': staticPageRule,
}

export const corsRules = {
  '/**': {
    // enable CORS
    cors: true, // if enabled, also needs cors-preflight-request.ts Nitro middleware to answer CORS preflight requests
    headers: {
      // CORS headers
      'Access-Control-Allow-Origin': '*', // 'http://example:6006', has to be set to the requesting domain that you want to send the credentials back to
      'Access-Control-Allow-Methods': '*', // 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS'
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Headers': '*', // 'Origin, Content-Type, Accept, Authorization, X-Requested-With'
      'Access-Control-Expose-Headers': '*',
      // 'Access-Control-Max-Age': '7200', // 7200 = caching 2 hours (Chromium default), https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Max-Age#directives
    },
  },
}
