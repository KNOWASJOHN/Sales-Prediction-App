import localFont from 'next/font/local'

export const condenso = localFont({
  src: '../public/fonts/Condenso-Demo-BF6892d43a96208.otf',
  variable: '--font-condenso'
})

export const copixel = localFont({
  src: '../public/fonts/Copixel-Demo-BF6873ccc4785f8.otf',
  variable: '--font-copixel'
})

export const epoch = localFont({
  src: '../public/fonts/Epoch-BF6881cf42e6637.otf',
  variable: '--font-epoch'
})

export const ezonix = localFont({
  src: [
    {
      path: '../public/fonts/Ezonix-BF6881b4663a705.otf',
      style: 'normal'
    },
    {
      path: '../public/fonts/Ezonix-italic-BF6881b465e9bcd.otf',
      style: 'italic'
    }
  ],
  variable: '--font-ezonix'
})

export const gunken = localFont({
  src: '../public/fonts/Gunken.otf',
  variable: '--font-gunken'
})

export const highrise = localFont({
  src: [
    {
      path: '../public/fonts/HighriseDemo 400.otf',
      style: 'normal'
    }
  ],
  variable: '--font-highrise'
})

export const lemon = localFont({
  src: [
    {
      path: '../public/fonts/Lemon-Regular.otf',
      style: 'normal'
    }
  ],
  variable: '--font-lemon'
})

export const roxhead = localFont({
  src: '../public/fonts/Roxhead-Demo-BF68a2f3ae3a0d9.otf',
  variable: '--font-roxhead'
})
