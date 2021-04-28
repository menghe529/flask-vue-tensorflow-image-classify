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
          <!-- <th>Time</th> -->
          <th>Operation</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="subdata in data">
          <td v-for="item in subdata">{{item.data}}</td>
          <!-- <td>{{item}}</td>
          <td>{{item}}</td> -->
          <td>
            <a href="#" @click.prevent="del(item.id)">Delete</a>
          </td>
        </tr>
      </tbody>
    </table>
    </div>
  </div>
</template>


<script>
import dataJSON from '../../../data.json'
export default {
  name: "Product",
  props:['post'],
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
      data: dataJSON
      // post: that.post
    };
  },
  methods: {
    table(){
      this.data[0]=this.post
      this.isShow = !this.isShow
      this.$emit("show")
      console.log(this.data)

      console.log(dataJSON)
      // var reader = new FileReader(); //这是核心,读取操作就是由它完成.
      // reader.readAsText("../../../../data.json"); //读取文件的内容,也可以读取文件的URL
      // reader.onload = function() {
      //     //当读取完成后回调这个函数,然后此时文件的内容存储到了result中,直接操作即可
      //     console.log(this.result);
      // }
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
    // console.log("----result-----")
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