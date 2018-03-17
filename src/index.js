import dva from 'dva'
import createLoading from 'dva-loading'
import createHistory from 'history/createBrowserHistory'
import './reset.css'
import models from './models'
import 'antd/dist/antd.css'
const modelKeys = Object.keys(models)

// 1. Initialize
const app = dva({
  ...createLoading({
    effects: true
  }),
  history: createHistory(),
  onError (error, dispatch) {
    console.log(error)
  }
})

modelKeys.forEach(modelKey => {
  app.model(models[modelKey].default)
})

// 3. Router
app.router(require('./router'))

// 4. Start
app.start('#root')
