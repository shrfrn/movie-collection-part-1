import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import MovieIndex from '../pages/MovieIndex.vue'
import MovieDetails from '../pages/MovieDetails.vue'
import MovieEdit from '../pages/MovieEdit.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/movie',
      name: 'MovieIndex',
      component: MovieIndex
    },
    {
      path: '/movie/:id',
      name: 'MovieDetails',
      component: MovieDetails
    },
    {
      path: '/movie/edit/:id?',
      name: 'MovieEdit',
      component: MovieEdit
    },
    {
      path: '/about',
      name: 'About',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../pages/About.vue')
    }
  ]
})

export default router
