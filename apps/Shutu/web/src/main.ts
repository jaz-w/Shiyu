import App from './App.vue'

async function setupApp() {
  const app = createApp(App)

  app.mount('#app')
}

setupApp()
