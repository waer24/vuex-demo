<template>
  <div>
    <div>
      <!--在此使用$store.state.count使用之前声明的count-->
      <!-- 非简写： $store.state.count -->
      <p>state: count:{{ count }}</p>

      <!--在此通过计算属性doubleCount得到count-->
      <p>doubleCount:{{ doubleCount }}</p>
    </div>

    <hr />
    <p>getter:</p>
    <!-- 非简写： $store.getters.getPeople -->
    <div>{{ getPeople }}</div>

    <!-- 非简写：$store.getter.getPeopleLength}}-->
    <p>上面对象的长度是： {{ getPeopleLength }}</p>
    <p>通过getter写个函数，传递第2个参数的例子：{{ getPeopleByAge2(28) }}</p>
    <p>注意，getter 在通过方法访问时，每次都会去进行调用，而不会缓存结果。</p>

    <hr />
    <p>
      更改 Vuex 的 store 中的状态的唯一方法是提交 mutation,Vuex 中的 mutation
      非常类似于事件：每个 mutation 都有一个字符串的 事件类型 (type) 和 一个
      回调函数
      (handler)。这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state
      作为第一个参数.虽然直接对state进行更改也可以得到同样的效果，但是devtool无法监听到state的变化，这将会给项目的维护带来困难，所以对状态更改还是需要使用commit方法.
      store.commit('XXX')触发之后会交给对应的action处理异步操作，然后再通过commit交于mutation实现数据变更，流程可以简单理解为
      store.dispatch => action => $store.commit => mutation`
    </p>
    <div>
      <p>state: count:{{ count }}</p>
      <p>
        doubleCount:{{ doubleCount }}
        <button @click="add">+</button>
        <button @click="sub">-</button>
        <button @click="mul">*10</button>
        <button @click="div">/10</button>
      </p>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "Count",
  props: {
    msg: String,
  },

  computed: {
    ...mapState({ count: (state) => state.count }),
    ...mapGetters(["getPeople", "getPeopleLength", "getPeopleByAge2"]),
    doubleCount() {
      //  return this.$store.state.count * 2;
      return this.count * 3;
    },
  },
  methods: {
    ...mapMutations(["increment", "decrement", "div"]),
    ...mapActions(["division"]),
    add() {
      //  this.$store.commit("increment");
      this.increment();
    },
    sub() {
      // this.$store.commit("decrement");
      this.decrement();
    },
    mul() {
      this.$store.commit({
        type: "mul",
        amount: 10,
      });
    },
    /* devide() {
       直接用mutation也行
      this.div();
    }, */
    div() {
      //  非简写：this.$store.dispatch("division");
      this.division();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
