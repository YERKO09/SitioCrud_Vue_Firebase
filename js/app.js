//Se define la ruta de los componentes
const Home = { template: /*html*/
    `
    <div class="container">
        <comp1 />
    </div>
    `
  }

const Juegos = { template: /*html*/
    `
    <div class="container">
        <comp2 />
    </div>
    `
}


//Se definen los Routes
const routes = [
    { path: '/', component: Home },
    { path: '/juegos', component: Juegos },
  ]

const router = VueRouter.createRouter({
// 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: VueRouter.createWebHashHistory(),
    routes, // short for `routes: routes`
})

//instancia de Vue
const data = Vue.createApp({ 
});

// abajo de la constante data creadora de Vue, llamar la store:
data.use(store)
data.use(router)