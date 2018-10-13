<template>
  <div class="card" style="padding:0.4em">
    <header class="card-header">
      <p class="card-header-title">
        {{data.title}}
      </p>
      <a  class="card-header-icon" 
          @click="editPost()">
        <span class="icon">
          <i class="fas fa-edit"></i>
        </span>
      </a>
    </header>    
    <div  class="card-image"
          v-if="data.url">
      <figure class="image">
        <img :src="data.url">
      </figure>
    </div>
    
    <div class="card-content">
      <div class="content">
        {{data.text}}
        <br>
        <time class="is-size-7 has-text-dark">{{data.date | formatDate}}</time>
      </div>
        
    </div>
  </div>
</template>

<script>
import moment from 'moment'
moment.locale('es')
export default {
  name: 'CatPost',
  props: ['data'], 
  filters: {
    formatDate: function (value) {
      if (value){
        return moment(value).startOf('minutes').fromNow();
      }
      return ""
    }
  },
  methods: {
    editPost(){
      this.data.isEdited = true;
    }
  }
}
</script>


<style>

</style>

