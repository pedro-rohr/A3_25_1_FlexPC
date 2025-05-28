<template>
    <div class="bg-light-blue-2 pads">
      <div class="textoCentro text-light-blue-10">
        <h2 style="font-weight: bold; font-size: 40px">Produtos</h2>
      </div>
      <div class="container">
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          <CardProduto
            v-for="prod in produtos"
            v-bind:key="prod"
            :titulo="prod.titulo"
            :urlFoto="prod.urlFoto"
            :preco="prod.preco"
          />
        </div>
      </div>
    </div>
  </template>
  <script>
  import CardProduto from './CardProduto.vue'
  export default {
    name: 'ListaProduto',
    components: { CardProduto },
    data() {
      return {
        // produtos: new Array(),
        produtos: [{
            titulo: 'Pinguins',
            urlFoto: 'https://gru.ifsp.edu.br/images/phocagallery/galeria2/image03_grd.png',
            preco: 1000,
            },
            {
            titulo: 'Tigre',
            urlFoto: 'https://static.vecteezy.com/ti/fotos-gratis/t2/36324708-ai-gerado-cenario-do-uma-tigre-caminhando-dentro-a-floresta-foto.jpg',
            preco: 2000,
        },
        // {
        //     titulo: 'Pinguins',
        //     urlFoto: 'https://gru.ifsp.edu.br/images/phocagallery/galeria2/image03_grd.png',
        //     preco: 1000,
        //     },
        //     {
        //     titulo: 'Tigre',
        //     urlFoto: 'https://static.vecteezy.com/ti/fotos-gratis/t2/36324708-ai-gerado-cenario-do-uma-tigre-caminhando-dentro-a-floresta-foto.jpg',
        //     preco: 2000,
        // },
        // {
        //     titulo: 'Pinguins',
        //     urlFoto: 'https://gru.ifsp.edu.br/images/phocagallery/galeria2/image03_grd.png',
        //     preco: 1000,
        //     },
        //     {
        //     titulo: 'Tigre',
        //     urlFoto: 'https://static.vecteezy.com/ti/fotos-gratis/t2/36324708-ai-gerado-cenario-do-uma-tigre-caminhando-dentro-a-floresta-foto.jpg',
        //     preco: 2000,
        // },
    ]
      }
    },
    created() {
    //   fetch('http://localhost:3000/produtos')
    //     .then((res) => {
    //       res.json().then((dados) => {
    //         this.produtos = dados
    //       })
    //     })
    //     .catch()
    },
  }
  </script>
<style>
.pads {
  padding: 20px;
}
.textoCentro {
  text-align: center;
  font-family: 'Courier New', Courier, monospace;
}
</style>