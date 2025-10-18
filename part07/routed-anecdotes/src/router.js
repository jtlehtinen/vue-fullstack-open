import { createRouter, createWebHistory } from 'vue-router'
import About from './pages/about.vue'
import AnecdoteList from './pages/anecdote-list.vue'
import CreateNew from './pages/create-new.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: AnecdoteList },
    { path: '/about', component: About },
    { path: '/create', component: CreateNew },
  ],
})
