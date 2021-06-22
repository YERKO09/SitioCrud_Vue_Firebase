data.component('comp2',{
    template: /*html*/
    `
  <div>
        <h1 class="display-5 text-warning border border-warning h1juegos">Lista de Juegos</h1>
        <table class="table tablajuegos position-relative">
            <thead>
                <tr class="text-white">
                    <th scope="col" class="border border-2 border-info">ID</th>
                    <th scope="col" class="border border-2 border-info">Nombre</th>
                    <th scope="col" class="border border-2 border-info">Plataforma</th>
                    <th scope="col" class="border border-2 border-info">Género</th>
                    <th scope="col" class="border border-2 border-info">Imagen</th>
                    <th scope="col" class="border border-2 border-info">Precio</th>
                    <th scope="col" class="border border-2 border-info">Estado</th>
                    <th class="border border-2 border-info">Acción</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(prod, index) of productos" :key="index">
                    <td class="text-primary border border-1 border-primary fw-bold pt-5">{{prod.id}}</td>
                    <td class="text-light border border-1 border-primary fw-bold pt-5">{{prod.nombre}}</td>
                    <td class="text-light border border-1 border-primary fw-bold pt-5">{{prod.plataforma}}</td>
                    <td class="text-light border border-1 border-primary fw-bold pt-5">{{prod.genero}}</td>
                    <td class="border border-1 border-primary"><img :src="prod.imagen"></td>
                    <td class="text-success border border-1 border-primary fw-bold pt-5"><span>$</span>{{prod.precio}}</td>
                    <td class="text-info border border-1 border-primary fw-bold pt-5">{{prod.estado}}</td>
                    <td class="border border-1 border-primary pt-5">
                        <div class="d-flex">
                            <button class="btn btn-warning btn-sm me-1" @click="verdatos_aeditar(index)">
                                <i class="fas fa-pen"></i>
                            </button>
                            <button class="btn btn-danger btn-sm" @click="borrar(index);cargarJuegos()">
                                <i class="fas fa-trash-alt fa-lg"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
            <tfoot class="position-absolute top-50 start-50 translate-middle edit" v-show="mostrar">
                <tr>
                    <img :src="objEditar.imagen" class="imagen_edit">
                </tr>
                <tr>
                    <td class="lead text-warning p-3">
                        <label>Nombre</label>
                        <input type="text" class="form-control" v-model="objEditar.nombre">
                        <label>Plataforma</label>
                        <input type="text" class="form-control" v-model="objEditar.plataforma">
                        <label>Género</label>
                        <input type="text" class="form-control" v-model="objEditar.genero">
                        <label>Imagen</label>
                        <input type="text" class="form-control" v-model="objEditar.imagen">
                        <label>Precio</label>
                        <input type="text" class="form-control" v-model="objEditar.precio">
                        <label>Estado</label>
                        <input type="text" class="form-control" v-model="objEditar.estado">
                        <p class="text-warning fs-6 mt-2"><i class="fas fa-exclamation-triangle me-2"></i>¡Modifique y guarde.</p>
                        <button class="btn btn-outline-info me-4" @click="editar(objEditar.id)">Guardar</button>
                        <button class="btn btn-outline-danger" @click="confirmar();cargarJuegos()"><i class="fas fa-times"></i> Cerrar</button>
                    </td>
                </tr>
            </tfoot>
        </table>
  </div>
  `,

    computed:{
        ...Vuex.mapState(['productos','objEditar','objEditado','mostrar'])
    },
    created () {
        this.cargarJuegos()//obtiene los datos automaticamente al cargar la pagina con el created()
    },
    methods:{
        ...Vuex.mapMutations(['borrar','cargarJuegos','editarJuegos','dataitem','upMostrar','nuevoupdate']),
        verdatos_aeditar(index){
            let datos_a_editar = { //asiganmos los datos del array (desde bd) a un objeto nuevo
                id: index,
                nombre : this.productos[index].nombre,
                plataforma : this.productos[index].plataforma,
                genero : this.productos[index].genero,
                imagen : this.productos[index].imagen,
                precio : this.productos[index].precio,
                estado : this.productos[index].estado
            };
            this.dataitem(datos_a_editar); //recibido por el store para ser enviado a un input
            let mostrar = true;
            this.upMostrar(mostrar);
        },
        editar(index){
            let datoupdate = {  //se crea un objeto de los datos ya editados
                //'id': this.objEditar.id,
                'nombre':this.objEditar.nombre,
                'plataforma':this.objEditar.plataforma,
                'genero':this.objEditar.genero,
                'imagen':this.objEditar.imagen,
                'precio':this.objEditar.precio,
                'estado':this.objEditar.estado
            }
            this.nuevoupdate(datoupdate); //envia el objeto al store
            this.editarJuegos(index);     //envia los datos editados a la BD
            console.log('Juego Actualizado: ',this.objEditado);
            //let mostrar = false;
            //this.upMostrar(mostrar);
        },
        confirmar(){
            let mostrar = false;
            this.upMostrar(mostrar);
        }
    }
})