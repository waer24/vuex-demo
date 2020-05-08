import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

const store = new Vuex.Store({
  //变量data
  state: {
    count: 100,
    people: [
      { name: '小A', age: 8, address: '北京' },
      { name: '小B', age: 18, address: '上海' },
      { name: '小C', age: 28, address: '广州' }
    ]
  },

  //类似于计算属性computed
  getters: {
    getPeople: (state) => {
      return state.people.filter((n) => n.age > 10)
    },
    getPeopleLength: (state, getter) => {
      return getter.getPeople.length
    },
    getPeopleByAge: (state) => (age) => {
      return state.people.find(n => n.age === age)
    },
    /* 等同于 */
    getPeopleByAge2: function (state) {
      return function (age) {
        return state.people.find(function (n) {
          return n.age === age
        })
      }
    }
  },

  //方法methods,相当于事件，注意写法，函数名后面没有冒号
  mutations: {
    increment(state) {
      state.count++;
    },

    decrement(state) {
      state.count--;
    },
    mul(state, payload) {
      state.count *= payload.amount;
    },
    div(state, payload) {
      state.count /= payload.amount;
    },
  },

  //异步操作   为什么这个是异步操作？ 需要先执行上一步的操作：div
  actions: {
    division(context) {
      context.commit({
        type: "div",
        amount: 10,
      });
    },
  },

  //模块
  modules: {}
});


export default store;