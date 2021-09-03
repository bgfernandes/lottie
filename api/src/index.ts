import http from 'http'
import createHttpServer from './http-server'
import config from './config/config'

createHttpServer().then((httpServer: http.Server) => {
  httpServer.listen(config.port, () => {
    return console.log(`Server is listening on http://localhost:${config.port}`)
  })
})
