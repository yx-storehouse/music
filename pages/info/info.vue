<template>  
  <view class="info" :style="bgStyle">  
      <view class="bg"></view>  
      <view class="content">  
          <view class="top">  
              <view class="name">{{audioList[audioPlaySrc].name}}</view>  
              <view class="author">{{audioList[audioPlaySrc].author}}</view>     
              <view class="bar">  
                  <view>标准</view>  
                  <view>音效</view>  
                  <view>视频</view>  
              </view>  
          </view>  
          <view class="micImg">  
              <image :class="playState ? 'album_rotate':''" :src="audioList[audioPlaySrc].img"></image>  
          </view>  
          <view class="bot">  
              <view class="lineBar">  
                  <view class="time star">{{ nowmiaoForc }}</view>  
                  <slider class="line" :value="nowmiao" min="0" :max="allmiao" @change="sliderChange" block-size="15"  
                      activeColor="#55A532" />  
                  <view class="time end">{{ allmiaoForc }}</view>  
              </view>  
              <view class="btn">  
                  <view @tap="audioWayFunc">  
                      <image v-if="audioWay==0" class="iconbtn" src="../../static/image/icons/recircle_play.png">  
                      </image>  
                      <image v-if="audioWay==2" class="iconbtn" src="../../static/image/icons/single_loop.png">  
                      </image>  
                      <image v-if="audioWay==1" class="iconbtn" src="../../static/image/icons/random_play.png">  
                      </image>  
                  </view>  
                  <view class="palybtn">  
                      <view @tap="upPlay">  
                          <image class="iconbtn" src="../../static/image/icons/last_music.png"></image>  
                      </view>  
                      <view @tap="play">  
                          <image v-if="!playState" class="iconbtn play"  
                              src="../../static/image/icons/start_blank.png">  
                          </image>  
                          <image v-if="playState" class="iconbtn play" src="../../static/image/icons/pause_2.png">  
                          </image>  
                      </view>  
                      <view @tap="nextPlay">  
                          <image class="iconbtn" src="../../static/image/icons/next_music.png"></image>  
                      </view>  
                  </view>  
                  <view>  
                      <image class="iconbtn" src="../../static/image/icons/music_list.png"></image>  
                  </view>  
              </view>  
              <view class="tool">  
                  <view @tap="collectFunc">  
                      <image v-if="!collect" class="iconbtn" src="../../static/image/icons/collect_blank.png"></image>  
                      <image v-if="collect" class="iconbtn" src="../../static/image/icons/collect_color.png"></image>  
                  </view>  
                  <view>  
                      <image class="iconbtn" src="../../static/image/icons/download_blank.png"></image>  
                  </view>  
                  <view>  
                      <image class="iconbtn" src="../../static/image/icons/share.png"></image>  
                  </view>  
                  <view>  
                      <image class="iconbtn" src="../../static/image/icons/user_message.png"></image>  
                  </view>  
              </view>  
          </view>  
      </view>  
  </view>  
</template>  

<script>  
// 引入播放列表  
import { audioList } from '../../publicjs/mock';  

let innerAudioContext = "";  

export default {  
    data() {  
        return {  
            nowmiao: 0,  
            allmiao: 0,  
            lineBarWid: 520,  
            playState: 0,  
            audioList: audioList,  
            audioPlaySrc: 0,  
            audioWay: 0,  
            collect: 0,  
        };  
    },  
    methods: {  
        playFunc() {  
            this.playState = 1;  
        },  
        pauseFunc() {  
            this.playState = 0;  
        },  
        audioWayFunc() {  
            if (this.audioWay >= 2) {  
                this.audioWay = 0;  
            } else {  
                this.audioWay += 1;  
            }  
        },  
        collectFunc() {  
            this.collect = !this.collect;  
        },  
        audioInit() {  
            let src = this.audioList[this.audioPlaySrc].src;  
            if (innerAudioContext) {  
                innerAudioContext.destroy();  
                innerAudioContext = '';  
            }  
            innerAudioContext = uni.createInnerAudioContext();  
            innerAudioContext.src = src;  
            innerAudioContext.autoplay = true;  

            let dura = setInterval(() => {  
                this.allmiao = Math.floor(innerAudioContext.duration);  
                if (this.allmiao) {  
                    clearInterval(dura);  
                }  
            }, 100); // 添加间隔时间以避免过于频繁调用

            innerAudioContext.onPlay(() => {  
                this.playFunc();  
            });  
            innerAudioContext.onPause(() => {  
                this.pauseFunc();  
            });  
            innerAudioContext.onTimeUpdate(() => {  
                this.nowmiao = Math.floor(innerAudioContext.currentTime);  
            });  
            innerAudioContext.onEnded(() => {  
                this.nextPlay();   
            });  
        },  
        nextPlay() {  
            if (this.audioWay === 1) {  
                this.audioPlaySrc = Math.floor(Math.random() * this.audioList.length);  
            } else if (this.audioWay === 0) {  
                if (this.audioPlaySrc >= (this.audioList.length - 1)) {  
                    this.audioPlaySrc = 0;   
                } else {  
                    this.audioPlaySrc += 1;  
                }  
            }  
            this.audioInit();  
        },  
        upPlay() {  
            if (this.audioWay === 1) {  
                this.audioPlaySrc = Math.floor(Math.random() * this.audioList.length);  
            } else if (this.audioWay === 0) {  
                if (this.audioPlaySrc <= 0) {  
                    this.audioPlaySrc = this.audioList.length - 1;  
                } else {  
                    this.audioPlaySrc -= 1;  
                }  
            }  
            this.audioInit();  
        },  
        sliderChange(e) {  
            this.nowmiao = e.detail.value;  
            innerAudioContext.seek(this.nowmiao);  
        },  
        play() {  
            this.playState ? innerAudioContext.pause() : innerAudioContext.play();  
        },  
    },  
    computed: {  
        width() {  
            return 'width:' + (this.nowmiao / this.allmiao) * this.lineBarWid + 'upx';  
        },  
        playWidth() {  
            return 'transform:translate3d(' + (this.nowmiao / this.allmiao) * this.lineBarWid + 'upx,0,0);';  
        },  
        nowmiaoForc() {  
            return this.$PubFn.secondFormat(this.nowmiao);  
        },  
        allmiaoForc() {  
            return this.$PubFn.secondFormat(this.allmiao);  
        },  
        bgStyle() {  
            return 'background-image:url(' + this.audioList[this.audioPlaySrc].img + ')';  
        },  
    },  
    mounted() {  
        this.audioPlaySrc = 0;  
        this.audioInit();  
    },  
    beforeDestroy() {  
        if (innerAudioContext) {  
            innerAudioContext.destroy();  
            innerAudioContext = '';  
        }  
    }  
};
  
</script>  

<style lang="scss">  
  .info {  
      position: fixed;  
      right: 0;  
      left: 0;  
      width: 100%;  
      height: 100%;  
      background-position: center;  
      background-repeat: no-repeat;  
      background-size: cover;  
      .bg {  
          position: fixed;  
          z-index: 0;  
          right: 0;  
          left: 0;  
          height: 100%;  
          width: 100%;  
          filter: blur(40upx);  
          background: inherit;  
      }  
      .content {  
          position: fixed;  
          z-index: 1;  
          right: 0;  
          left: 0;  
          height: 100%;  
          width: 100%;  
          color: #FFFDEF;  
          .top {  
              margin-top: 20upx;  
              width: 100%;  
              text-align: center;  
              .name {  
                  font-size: 46upx;  
              }  
              .author {  
                  font-size: 34upx;  
                  line-height: 60upx;  
              }  
              .bar {  
                  width: 330upx;  
                  justify-content: space-between;  
                  display: flex;  
                  margin: 20upx auto;  
                  view {  
                      width: 100upx;  
                      height: 40upx;  
                      border: solid 1upx #FFFDEF;  
                      border-radius: 2upx;  
                      text-align: center;  
                  }  
              }  
          }  
          .micImg {  
              margin: 25upx auto;  
              image {  
                  display: block;  
                  margin: 0 auto;  
                  width: 600upx;  
                  height: 600upx;  
                  border: solid 16upx rgba(0, 0, 0, .15);  
                  border-radius: 50%;  
                  &.album_rotate {  
                      transform: rotate(360deg);  
                      animation: rotation 8s linear infinite;  
                  }  
              }  
          }  
          .bot {  
              position: fixed;  
              bottom: 40upx;  
              left: 0;  
              width: 100%;  
              padding: 0 26upx;  
              box-sizing: border-box;  
              .lineBar {  
                  display: flex;  
                  padding: 20upx 0;  
                  justify-content: space-between;  
                  .line {  
                      margin: 0;  
                      width: 520upx;  
                  }  
              }  
              .iconbtn {  
                  display: block;  
                  width: 50upx;  
                  height: 50upx;  
                  margin: 0 auto;  
              }  
              .btn {  
                  display: flex;  
                  justify-content: space-between;  
                  padding: 40upx 15upx;  
                  .palybtn {  
                      display: flex;  
                      width: 500upx;  
                      margin-top: -15upx;  
                      view {  
                          flex: 1;  
                          align-items: center;  
                      }  
                      .iconbtn {  
                          width: 80upx;  
                          height: 80upx;  
                          &.play {  
                              margin-top: -20upx;  
                              width: 120upx;  
                              height: 120upx;  
                          }  
                      }  
                  }  
              }  
              .tool {  
                  display: flex;  
                  view {  
                      flex: 1;  
                      text-align: center;  
                  }  
              }  
          }  
      }  
  }  
</style>
