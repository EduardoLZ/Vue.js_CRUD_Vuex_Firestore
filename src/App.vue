<template>
  <Crud />
</template>

<script>
import { onMounted } from 'vue';
import Crud from "./components/Crud.vue";
import { useStore } from 'vuex';
import {db} from './firebase'

export default {
  name: "App",
  components: {
    Crud,
  },
  setup(){
    const store = useStore()
    onMounted(()=>{
       db.collection("books").orderBy('timestamp')
    .onSnapshot((querySnapshot) => {
        store.dispatch('cleanStore')
        querySnapshot.forEach((doc) => {
           
            store.dispatch('addAllBooks',doc.data())
        });
        
    });
    })
    return {

    }
  }
};
</script>

<style></style>
