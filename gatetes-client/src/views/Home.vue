<template>
  <div class="home">
    <div style="margin: 1em;">
      <a class="button is-primary" @click="addPost()">Añadir post</a>
    </div>
    <b-modal :active.sync="addingPost" has-modal-card>
        <cat-post-form @create="savedPostForm"
                       @close="closePostForm"/>
    </b-modal>
    <div class="columns is-multiline">
      <div class="column is-half" v-for="catPost in posts" :key="catPost.title">
        <cat-post :data="catPost"/>
        <b-modal :active.sync="catPost.isEdited" has-modal-card>
          <cat-post-form :postData="catPost"
                          @update="updatedPostForm"
                          @delete="deletedPostForm" 
                          @editPost="openEditPost"
                          @close="closePostForm"/>
        </b-modal>
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios'
// @ is an alias to /src
import CatPost from '@/components/CatPost.vue'
import CatPostForm from '@/components/CatPostForm.vue'

export default {
  name: 'home',
  components: {
    CatPost,
    CatPostForm
  },
  mounted: function(){
    let self = this;
    axios.get('http://localhost:3000/api/gatetes').then(function(response){
      self.posts = response.data
      self.post = response.data.map((el)=>{ self.$set(el, 'isEdited', false); return el;})

    })
  },  
  data: function(){
    return {
      posts: [],
      addingPost: false,
    }
  }, 
  methods: {
    addPost(){
      this.openPostForm();

    },
    openEditPost(id){      
      this.posts.find(el=>el.id==id).isEdited=true
    },
    openPostForm(){
      this.addingPost = true;
    },
    closePostForm(){
      this.addingPost = false;
    },
    savedPostForm(data){
      if(data){
        this.posts.push(data)        
      }
      this.closePostForm();
      
    },
    updatedPostForm(data){
      if(data){
        let elIndex = this.posts.findIndex(el=>el.id==data.id)
        this.$set(this.posts, elIndex, data)    
      }
      this.posts.find(el=>el.id==data.id).isEdited=false 
            
    },
    deletedPostForm(data){
      let elIndex = this.posts.findIndex(el=>el.id==data.id)
      this.posts.splice(elIndex, 1)
      //this.posts.find(el=>el.id==data.id).isEdited=false 
    }
  }
}
</script>
<style>
.home{
  margin-top:2em;
}
</style>
