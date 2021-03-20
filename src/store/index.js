import { createStore } from 'vuex'
import { db } from '@/firebase'
export default createStore({
  state: {
    books: []
  },
  mutations: {
    addAllBooks(state, payload) {
      state.books.push(payload)
    },
    cleanStore(state) {
      state.books = []
    }
  },
  actions: {
    addBook({ commit }, book) {
      db.collection('books').add(book).then((docref) => {

        db.collection('books').doc(docref.id).update({
          id: docref.id
        })

      })
    },
    deleteBook({ commit }, book) {
      db.collection('books').doc(book.id).delete()
    },
    updateBook({ commit }, book) {
      db.collection('books').doc(book.id).update({
        title: book.title
      })
    },
    addAllBooks({ commit }, book) {
      commit('addAllBooks', book)
    },
    cleanStore({ commit }) {
      commit('cleanStore')
    },
  },
  getters: {
    getAllBooks(state) {
      return state.books
    }
  },
  modules: {

  }
})
