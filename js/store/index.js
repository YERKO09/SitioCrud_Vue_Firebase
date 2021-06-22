const store = new Vuex.Store({
  state: {
    productos: [],
    objeto:{}, //objeto principal del formulario (enviardatos)
    objEditar:{}, //objeto donde se reciben los datos a editar
    mostrar: false, //para el nuevo input de editar
    objEditado:{},  //objeto que envia los datos editados a la base de datos Firestore
  },
  mutations: {
    //nuevodato: (state, payload) => {state.nuevoobjeto = payload},
    enviar(state, payload){
      fetch('https://juegos-4160c-default-rtdb.firebaseio.com/juego.json',{ //promesa
        method:'POST',
        headers:{
          'Content-Type':'Application/json' //el tipo de archivo que se envia
        },
        body: JSON.stringify(state.objeto = payload)
      })  
      .then(response => response.json())//Promesa: respuesta del servidor => transformada a json
      .then(data => console.log('data enviada',data)) //Promesa: 'data' es el resultado de response.json()
                                                      // esta promesa es para ver los datos
      .catch(error => {
        alert('Ha ocurrido un error!',)
        console.log('error',error)
      })
      alert('Juego ingresado correctamente!')//agregar validacion con if
    },
    cargarJuegos(state){
      fetch('https://juegos-4160c-default-rtdb.firebaseio.com/juego.json',{
        method: 'GET',
      })
      .then(respuesta => respuesta.json()) 
      .then(data => {    //en esta promesa se realiza la accion con la peticion
        (state.productos = data);
        console.log('Datos Obtenidos',data);
      })
      .catch(error => {
        alert('Ha ocurrido un error!')
        console.log('Error al Obtener los Datos',error)
      })    
    },
    borrar(state, id){
      fetch(`https://juegos-4160c-default-rtdb.firebaseio.com/juego/${id}.json`,{
        method: 'DELETE',
      })
      .then(respuesta => respuesta.json()) 
      .catch(error => {
        alert('Error al borrar')
        console.log('Error al Obtener los Datos',error)        
      })  
      console.log('Se borro:',state.productos[id].nombre) 
      alert('Se borro: '+state.productos[id].nombre) 
    },
    dataitem(state, payload){ //recibimos el objeto a editar
      state.objEditar = payload
    },
    upMostrar(state, payload){ //muestra el input para editar
      state.mostrar = payload
    },
    nuevoupdate(state, payload){ //cargamos los datos ya editados
      state.objEditado = payload
    },
    editarJuegos(state, index){
      const metodopatch = {
        method: 'PATCH',
        headers: {
          'Content-type':'application/json'
        },
        body: JSON.stringify(state.objEditado)
      }
      fetch(`https://juegos-4160c-default-rtdb.firebaseio.com/juego/${index}.json`, metodopatch)
      //fetch('https://juegos-4160c-default-rtdb.firebaseio.com/juego'+'/'+index+'.json', metodopatch)
        .then(response => response.json())
        .then(data => console.log('data',data))
        .catch(error => console.log('ERROR!!!!!!!!!!!!!!!!',error))
      //console.log('Se ha actualizado: ', state.productos[index].nombre);
    }

  },
  actions: {
  },
  modules: {
  }
})
