import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Game from './components/main.js'
import './assets/main.css'

const app = createApp(App)

app.use(router)
app.component('Game', Game);
app.mount('#app')
