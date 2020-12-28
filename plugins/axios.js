import Element from 'element-ui'

export default function ({ $axios, isDev }) {
  // Set baseURL to something different
  $axios.setBaseURL(process.env.BASE_URL)

  $axios.onRequest((config) => {
    if (isDev) {
      console.log(
        config.method.toUpperCase(),
        config.url,
        config.method === 'post' || config.method === 'put'
          ? config.data
          : config.params
      )
    }
  })

  $axios.onResponse((res) => {
    if (isDev) {
      console.log('RETURN from', res.config.url, res.data)
    }
  })

  $axios.onError((error) => {
    // const { status, data } = error.response
    const { data } = error.response

    Element.Message.error(data.msg)
    // if (status === 500) {
    //   Element.Message.error(data.msg)
    // }
  })
}
