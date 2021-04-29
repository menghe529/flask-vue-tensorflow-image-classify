<template>
  <!-- 创建要控制的区域 -->
  <div id="app">
    <button v-on:click="table" >table</button>

    <div v-if="isShow">
      


    <table class="table table-hover table-bordered table-striped">
      <thead>
        <tr>
          <!-- <th>Id</th> -->
          <th>Top1</th>
          <th>Top2</th>
          <th>Top3</th>
          <th>Top4</th>
          <th>Top5</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="subdata in dataResult">
          <td v-for="item in subdata.data">{{item.name}}:{{item.probability}}</td>
        </tr>
      </tbody>
    </table>
    </div>
  </div>
</template>


<script>
// import dataJSON from '../../../data.json'
export default {
  name: "Product",
  props:['post', 'result'],
  data() {
    let that = this
    return {
      list: [
        { id: 1, name: "奔驰", ctime: new Date() },
        { id: 2, name: "宝马", ctime: new Date() }
      ],
      id: "",
      name: "",
      keywords: "",
      isShow: false,
      dataResult: [],
      // data: dataJSON
    };
  },
  methods: {
    table(){
      this.isShow = !this.isShow
      this.$emit("show")
    },
    add() {
      // vue中已经实现了数据的双向绑定，每当我们修改了data中的数据，Vue会默认监听到
      // 数据的改动，自动把最新的数据，应用到页面上
      this.list.push({ id: this.id, name: this.name, ctime: new Date() });
    },

    del(id) {
      // 根据Id删除数据
      // this.list.some((item, i) => {
      //     if (item.id == id) {
      //         this.list.splice(i, 1)
      //         // 在数组的 some 方法中，如果return true ，就会立即终止这个数组的后续循环
      //         return true
      //     }
      // })

      let index = this.list.findIndex(item => {
        if (item.id == id) {
          return true;
        }
      });

      this.list.splice(index, 1);
    },


    search(keywords) {
      var newList = [];
      // this.list.forEach(item => {
      //     if (item.name.indexOf(keywords) != -1) {
      //         newList.push(item)
      //     }
      // });
      // return newList;

      // forEach some fliter findIndex 这些都属于数组的新方法，
      // 都会对数组的每一项，进行遍历，执行相关的操作
      return this.post.filter(item => {
        //注意:在ES6中，为字符串提供了一个新方法，叫做 String.prototype.includes("要包含的字符串")
        // 如果包含，返回true，反之false
        if (item.name.includes(keywords)) {
          return item;
        }
      });
    }
  },
  mounted(){
    let dataJSON = require('../../../data.json')
    for(let i=0;i<dataJSON.length;i++){
      let obj = {}
      obj.id = i
      let b = []
      for (let j in dataJSON[i].data){
        let temp = {}
        temp.id = j
        temp.name = String(...Object.keys(dataJSON[i].data[j]))
        temp.probability = dataJSON[i].data[j][Object.keys(dataJSON[i].data[j])]
        b.push(temp)
      }
      obj.data = b
      this.dataResult.push(obj)
    }
    console.log("-----tableResult-----")
    console.log(this.dataResult)
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>