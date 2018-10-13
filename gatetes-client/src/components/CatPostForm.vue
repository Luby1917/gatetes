<template>
  <div>
    <div class="modal-card">
      <header class="modal-card-head">
          <p v-if="isNew" class="modal-card-title">Crear post</p>
          <p v-if="!isNew" class="modal-card-title">Editar post</p>
      </header>
      <section class="modal-card-body">
        <div class="field">
          <label class="label">Título</label>
          <div class="control">
            <input class="input" type="text" placeholder="Título" v-model="post.title">
          </div>
        </div>
        <img :src="post.url"/>
        <div class="field">
          <div class="file has-name is-fullwidth">
            <label class="file-label">
              <input  ref="file" 
                      class="file-input" 
                      type="file"
                      name="file"
                      accept="image/*"
                      @change="handleFileUpload()">
              <span class="file-cta">
                <span class="file-icon">
                  <i class="fas fa-upload"></i>
                </span>
                <span class="file-label">
                  Elegir imagen…
                </span>
              </span>
            </label>
          </div>
        </div>
        <div class="field">
          <div class="control">
            <textarea class="textarea" placeholder="Escribe algo que quieras añadir" v-model="post.text"></textarea>
          </div>
        </div>
        <div class="field is-grouped">
          <p class="control">
            <a class="button is-primary" style="margin:0.2rem" @click="savePost()">Guardar</a>
            <a class="button is-warning" style="margin:0.2rem" @click="discardPost()">Descartar</a>
            <a class="button is-danger" style="margin:0.2rem" @click="deletePost()">Eliminar</a>
          </p>
        </div>
      </section>
      
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'CatPostForm',
  props: ['postData'],
  data: function(){
    return {
      file: [],
      image: "",
      post: {
        title: '',
        text: '',
        date: new Date(),
        url: ''
      },
      isNew: true
    }
  }, 
  created(){
    console.log(this.postData);
    if(this.postData){
      this.$set(this, 'post', Object.assign({},this.postData))
      this.isNew = false
    } else {
      this.isNew = true
    }
  },
  methods: {
    handleFileUpload(){
      this.file = this.$refs.file.files[0];      
      this.upload();
    },
    upload(){
      let formData = new FormData();
      /*
          Add the form data we need to submit
      */
      formData.append('file', this.file);
      let self = this;
      axios.post( 'http://localhost:3000/api/uploads/images/upload',
        formData,
        {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
        }
      ).then(function(response){
        let uploadedFile = response.data.result.files.file[0]
        //http://localhost:3000/api/uploads/images/download/75620.jpg
        self.post.url=`http://localhost:3000/api/uploads/${uploadedFile.container}/download/${uploadedFile.name}`
        console.log('SUCCESS!!');
      })
      .catch(function(){
        console.log('FAILURE!!');
      });
    } ,
    savePost(){
      let self = this;
      if(self.isNew){
        axios.post('http://localhost:3000/api/gatetes', this.post ).then(function(response){
          self.$emit('create', response.data)
        })
      }else{
        axios.put(`http://localhost:3000/api/gatetes/${this.post.id}`, this.post ).then(function(response){
          self.$emit('update', response.data)
        })
      }
    },
    discardPost(){
      this.$emit('close');
    },
    deletePost(){
      let self = this;
      axios.delete(`http://localhost:3000/api/gatetes/${this.post.id}`, this.post ).then(function(response){
        self.$emit('delete', {id: self.post.id})
      })
      
    }
  }
}
</script>

<style>
</style>
