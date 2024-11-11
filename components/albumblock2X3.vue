<template>  
    <view v-if="prodata" class="recommend">  
        <view v-if='prodata.title' class="title">{{prodata.title}}  
            <image v-if="imgSrc" :src="imgSrc+'icons/arrow_pic.png'"></image>  
        </view>  
        <album :prodata="prodata.list" :blockWidth="blockWidth"></album>  
        <view v-if="changeReturnParams" @tap="changeFunc" class="change">  
            <image v-if="imgSrc" :src="imgSrc+'icons/refresh.png'"></image>  
            换一批  
        </view>  
    </view>  
</template>  
  
<script>  
    import album from './album.vue'  
    export default {  
        name: "albumblock",  
        components: {  
            album  
        },  
        props: {  
            prodata: {  
                type: Object,  
                default: {}  
            },  
            changeReturnParams: {  
                type: String,  
                default: ''  
            },  
            blockWidth: {  
                type: String,  
                default: '48%'  
            }  
        },  
        data() {  
            return {  
                imgSrc: '../static/image/',  
            };  
        },  
        methods: {  
            changeFunc: function() {  
                this.$emit('change', this.changeReturnParams)  
            },  
        }  
    }  
</script>  
  
<style lang="scss" scoped>  
    .title {  
        position: relative;  
        height: 100upx;  
        line-height: 100upx;  
        text-align: center;  
        font-size: 32upx;  
        image {  
            width: 40upx;  
            height: 40upx;  
            position: absolute;  
            top: 30upx;  
            right: 40upx;  
            display: block;  
        }  
    }  
    .change {  
        width: 42%;  
        line-height: 56upx;  
        margin: 0 auto;  
        text-align: center;  
        font-size: 26upx;  
        margin-bottom: 20upx;  
        border: solid 1upx #CCCCCC;  
        image {  
            display: inline-block;  
            vertical-align: text-bottom;  
            width: 32upx;  
            height: 32upx;  
        }  
    }  
</style>  
