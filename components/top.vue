<template>  
  <!-- 顶部视图容器，应用类名 'top' 和 'bgColor' -->  
  <view class="top bgColor">  
    <!-- 导航栏容器，应用类名 'bar' -->  
    <view class="bar">  
      <!-- 如果 imgRoot 存在，显示分类图标 -->  
      <image v-if="imgRoot" :src="imgRoot + 'icons/sort_1_blank.png'" class="icon type"></image>  
      <!-- 导航栏内容容器 -->  
      <view class="barContent">  
        <!-- 左侧按钮，显示文字 '我的' -->  
        <view class="left_btn">我的</view>  
        <!-- 中间选择按钮，显示文字 '音乐馆' -->  
        <view class="sel" style="color: black;">音乐馆</view>  
        <!-- 右侧按钮，显示文字 '发现' -->  
        <view class="right_btn">发现</view>  
      </view>  
      <!-- 如果 imgRoot 存在，显示添加图标 -->  
      <image v-if="imgRoot" :src="imgRoot + 'icons/add_blank.png'" class="icon add"></image>  
    </view>  
    <!-- 搜索框容器，应用类名 'serch' 和 'bgDeepColor' -->  
    <view class="serch bgDeepColor">  
      <!-- 输入框，类型为 'text'，占位符为 '搜索' -->  
      <input type="text" placeholder="搜索" />  
      <!-- 如果 imgRoot 存在，显示搜索图标 -->  
      <image class="icon" v-if="imgRoot" :src="imgRoot + 'icons/search_color.png'"></image>  
    </view>  
  </view>  
</template>

<script>
	export default {
		name:"top",
		data() {
			return {
				imgRoot:'../static/image',
			};
		}
	}
</script>

<style lang="scss" scoped> // scoped表示作用于当前组件的范围内。  

// 搜索输入框样式  
.search_input {  
  color: rgba(255, 255, 255, .8); // 输入框文字颜色，带有透明度  
  border-radius: 5upx; // 输入框边框圆角  
}  

// 顶部样式  
.top {  
  padding: 40upx 20upx; // 内边距  
  width: 100%; // 宽度  
  box-sizing: border-box; // 盒模型  
  color: #fff; // 文字颜色  
  font-size: 32upx; // 字体大小  

  // 顶部栏样式  
  .bar {  
    display: flex; // 弹性布局  
    justify-content: space-between; // 项目之间的间距  
    line-height: 30upx; // 行高  

    // 图标样式  
    .icon {  
      width: 30upx; // 宽度  
      height: 30upx; // 高度  
    }  

    // 顶部栏内容样式  
    .barContent {  
      display: flex; // 弹性布局  
      width: 360upx; // 宽度  
      margin: 0 auto; // 居中对齐  
      justify-content: center; // 内容居中  

      // 选择项样式  
      .sel {  
        font-size: 36upx; // 字体大小  
        font-weight: 600; // 字重  
      }  

      // 左右按钮样式  
      .left_btn,  
      .right_btn {  
        margin: 0upx 20upx; // 外边距  
      }  
    }  
  }  
}  

// 搜索栏样式  
.serch {  
  position: relative; // 相对定位  
  margin-top: 32upx; // 上外边距  
  padding: 10upx 20upx; // 内边距  
  height: 76upx; // 高度  
  line-height: 60upx; // 行高  
  box-sizing: border-box; // 盒模型  
  border-radius: 5px; // 边框圆角  
  color: rgba(255, 255, 255, 1); // 文字颜色  

  // 输入框样式  
  input {  
    padding-left: 60upx; // 左内边距  
    height: 100%; // 高度  
  }  

  // 图标样式  
  .icon {  
    position: absolute; // 绝对定位  
    top: 20upx; // 顶部距离  
    left: 20upx; // 左侧距离  
    width: 40upx; // 宽度  
    height: 40upx; // 高度  
  }  
}  
</style>