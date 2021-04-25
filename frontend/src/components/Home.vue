// Home.vue

<template>
<div>
<div class="main">
  <div class="title">
    <h3>Image Classifier</h3>
  </div>

  <div class="panel">
    <input id="file-upload" class="hidden" type="file" accept="image/x-png,image/gif,image/jpeg" />
    <label for="file-upload" id="file-drag" class="upload-box">
      <div id="upload-caption">Drop image here or click to select</div>
      <img id="image-preview" class="hidden" />
    </label>
  </div>
  <div style="margin-bottom: 2rem;">
    <input type="button" value="Submit" class="button" onclick="submitImage();" />
    <input type="button" value="Clear" class="button" onclick="clearImage();" />
  </div>

  <div id="image-box" style="display:none;">
    <img id="image-display" />
    <div id="pred-result" class="hidden"></div>
    <svg id="loader" class="hidden" viewBox="0 0 32 32" width="32" height="32">
      <circle id="spinner" cx="16" cy="16" r="14" fill="none"></circle>
    </svg>
  </div>

  <div>
    <button v-on:click="draw" >drawChart</button>
    <div id="mychart" :style="{width: '300px', height: '300px', margin: '0 auto'}"></div>
    <product v-bind:post="this.result" ></product>
  </div>
  <div class="historyTable">
    
  </div>
</div>



</div>
</template>

<script>
import Product from "./Product"

  export default{
    data(){
      return{
        result: [],
        post:"---post---"
      }
    },
    mounted(){
      const s = document.createElement('script');
      s.type = 'text/javascript';
      s.src = '../../static/js/Home.js';
      document.body.appendChild(s);



    },
    methods:{
     draw:function(){
        show(mychart)
   			this.$on('increment', this.myEcharts)
   			this.$emit('increment')  //触发自定义的increment事件
   		},
      myEcharts(){
        //深拷贝
        // let i=0

        // this.result = result.map(o => {
        //   this.result['id'] = i
        //   i = i+1
        //   this.result['name'] = Object.keys(result[i])
        //   this.result['probability'] = result[i][Object.keys(result[i])]
        // })
        // let data = this.result
        for(let i in result){
          let obj = {}
          obj.id = i
          obj.name = String(...Object.keys(result[i]))
          obj.probability = result[i][Object.keys(result[i])]
          this.result.push(obj)
        }
        let xdata = []
        let ydata = []
        for(let val in result){
          let keys = Object.keys(result[val])
          xdata.push(...keys)
          ydata.push(result[val][keys])
        }
        var myChart = this.$echarts.init(document.getElementById('mychart'));

        // 指定图表的配置项和数据
        var option = {
          title: {
            text: '图像识别top5'
          },
          tooltip: {},
          legend: {
            data:['概率']
          },
          xAxis: {
            data: xdata,
            axisLabel:{
              interval:0,
              rotate:45,
              margin:2,
              textStyle:{
                fontWeight:"bolder",
                color:"#000000"
              }
            }
          },
          yAxis: {},
          series: [{
            name: '概率',
            type: 'bar',
            data: ydata
          }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        }
      },
    components:{
      Product
    }
  }
</script>

<style src="../../static/css/Home.css"></style>




