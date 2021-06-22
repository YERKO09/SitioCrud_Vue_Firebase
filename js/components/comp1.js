data.component('comp1',{
  template: /*html*/
  `
    <div class="mb-5 p-3 tablahome border border-info">
      <h1>Agregar Juego</h1>
      <div class="row">
          <div class="col-6 p-3">
              <div class="input-group mb-3">
                <span class="input-group-text">Nombre</span>
                <input type="text" class="form-control" v-model="obj.nombre">
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text">Género</span>
                <input type="text" class="form-control" v-model="obj.genero">
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text">Plataforma</span>
                <input type="text" class="form-control" v-model="obj.plataforma">
              </div>
          </div>

          <div class="col-6 p-3">
              <div class="input-group mb-3">
                <span class="input-group-text">Imagen</span>
                <input type="text" class="form-control" v-model="obj.imagen" placeholder="copiar dirección de imagen o URL">
              </div>            
              <div class="input-group mb-3">
                <span class="input-group-text">Precio</span>
                <input type="text" class="form-control" v-model="obj.precio">
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text">Estado</span>
                <input type="text" class="form-control" v-model="obj.estado">
              </div>
          </div>
        <button class="btn btn-warning w-25 text-center mx-auto mb-3"
         @click.prevent="agregar">Agregar</button>
      </div>
  </div>
  `,
  data(){
    return{
      obj:{
        id: +new Date(), //genera un id
        nombre: '',
        genero: '',
        imagen: '',
        plataforma: '',
        precio: '',
        estado: ''
      }
    }
  },
  methods:{
    ...Vuex.mapMutations(['enviar']),
    agregar(){
      if(this.obj.nombre.trim() === '' || this.obj.genero.trim() === '' ||
          this.obj.imagen.trim() === '' || this.obj.plataforma.trim() === '' ||
          this.obj.precio.trim() === '' || this.obj.estado.trim() === ''){
        alert('Completar los campos vacios')
        return
      }
      this.enviar(this.obj)
      console.log('objeto',this.obj)
      this.obj = { //resetea los input
        id: +new Date(),
        nombre: '',
        genero: '',
        imagen: '',
        plataforma: '',
        precio: '',
        estado: ''
      }
    }
  }

})