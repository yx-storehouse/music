<template>
	<view class="container">
		<!-- 分类选项 -->
		<view class="contype">
			<view class="type">
				<text class="bt" v-for="(item, index) in nb" :key="index" :class="{'active': activeIndex === index}"
					@click="setActiveIndex(index)">
					{{ item }}
				</text>
			</view>
		</view>

		<!-- Swiper切换 -->
		<swiper :indicator-dots="true" @change="change" :current="activeIndex">
			<swiper-item class="s1">
				<uni-list>
					<uni-list-item class="bbox">
						<template v-slot:header>

							<img  class="play" src="../../static/image/icons/start_color.png" alt="">
						</template>
						<template v-slot:body>
							<view class="play-all">全部播放</view>
						</template>
						<template v-slot:footer>
							<view style="padding-left: 120px;">
								<img class="play" src="../../static/image/icons/download_black.png" alt="">
								<img class="play" src="../../static/image/icons/content_black.png" alt="">
							</view>
						</template>
					</uni-list-item>
				</uni-list>
				<!-- 音乐列表 -->
				<uni-list v-for="(track, index) in musicList" :key="index" class="track-item">
					<uni-list-item @click="navigateToPlayPage(index)" clickable>
						<template v-slot:header>
							<view class="name-music">
								<text class="track-title">{{ track.title }}</text>
							</view>
							<view class="nb">
								<text class="tag-ye" v-if="track.tags.includes('SQ')">SQ</text>
								<text class="tag-ye" v-if="track.tags.includes('VIP')">VIP</text>
								<text class="tag-red" v-if="track.tags.includes('HQ')">HQ</text>
								<text class="tag-red" v-if="track.tags.includes('独家')">独家</text>
								{{ track.description }}
							</view>
						</template>
						<template v-slot:footer>
							<view class="right">
								<img class="right-icon" src="../../static/image/icons/play_audio.png" alt="">
								<img class="right-icon" src="../../static/image/icons/more.png" alt="">
							</view>
						</template>
					</uni-list-item>
				</uni-list>
			</swiper-item>

			<swiper-item>
				<view class="swiper-item">666</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">
					<albumblock2X3 :prodata="recommend"></albumblock2X3>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import albumblock2X3 from "../../components/albumblock2X3";
	import {

		recommend

	} from "../../publicjs/mock.js";
	export default {
		components: {
			albumblock2X3
		},
		data() {
			return {
				musicList:
				 [  
				     {  
				         "title": "你的微笑",  
				         "tags": ["HQ", "独家"],  
				         "description": "毛不易是一位充满情感的创作歌手，他在这首歌中表达了对生活中温暖瞬间的珍惜。"  
				     },  
				     {  
				         "title": "明日之歌",  
				         "tags": ["SQ", "VIP"],  
				         "description": "毛不易以细腻的词汇和动人的旋律，描绘了对未来美好憧憬的心声。"  
				     },  
				     {  
				         "title": "岁月的故事",  
				         "tags": ["独家"],  
				         "description": "毛不易的音乐常常触动人心，这首歌讲述了时间流逝带来的酸甜苦辣。"  
				     },  
				     {  
				         "title": "心中的梦想",  
				         "tags": ["VIP","SQ","独家","HQ"],  
				         "description": "毛不易用这首歌呼唤着每个人对理想生活的追寻，不负当下的时光。"  
				     },  
				     {  
				         "title": "塌陷的岁月",  
				         "tags": ["SQ", "VIP"],  
				         "description": "这首歌展现了毛不易对生活的深刻反思，充满了对过往的感慨与思考。"  
				     },  
				     {  
				         "title": "旧时光的回响",  
				         "tags": ["HQ", "VIP"],  
				         "description": "毛不易用温暖的旋律再现了那些年少轻狂时的故事，唤起每个人的美好回忆。"  
				     },  
				     {  
				         "title": "漂泊的心",  
				         "tags": ["HQ", "独家"],  
				         "description": "在这首歌中，毛不易讲述了一个关于寻根与归属的动人故事，令人深思。"  
				     },  
				     {  
				         "title": "温柔的思念",  
				         "tags": ["HQ", "独家"],  
				         "description": "毛不易以其独特的嗓音，抚慰着每一个怀念往昔的人，这首歌温暖而动人。"  
				     }  
				 ],
				nb: ['新歌', '新碟', '影视'], // 分类数据
				activeIndex: 0, // 当前选中的分类项索引
				recommend: recommend
			};
		},
		methods: {
			playTrack(url) {
				console.log("播放音乐: ", url);
			},
			downloadTrack(url) {
				console.log("下载音乐: ", url);
			},
			navigateToPlayPage(index) {
				console.log('导航到播放页');
				uni.navigateTo({
					url: `../info/info?index=${index}`
				});
			},
			change(event) {
				console.log("Swiper changed to: ", event.detail.current);
				this.activeIndex = event.detail.current;
			},
			setActiveIndex(index) {
				this.activeIndex = index; // 更新当前选中的索引
			}
		}
	};
</script>
<style>
	swiper {
		flex: 1;
	}

	.active {
		background-color: black;
		color: white;
	}

	.type .bt {

		font-size: 20px;
		padding: 0 20px;
		border: 1px solid black;
		font-weight: bold;
		cursor: pointer;
	}

	.contype {
		padding: 20px 0 20px 0;
		width: 100%;
		height: 30px;
		display: flex;
		justify-content: center;
	}

	.container {
		height: 100vh;
		background-color: #ffffff;
		display: flex;
		flex-direction: column;
	}



	.play {
		padding:10px;
		width: 20px;
		height: 20px;
	}

	.play-all {
		/* margin-left: -150px; */
		width: 100px;
		height: 20px;
		font-size: 15px;
		color: black;
		padding: 10px;
		border: none;
		border-radius: 5px;
	}

	.name-music {
		padding-bottom: 5px;
	}

	.track-title {
		font-weight: bold;
		font-size: 16px;

	}

	.tag-ye {
		border: #ae9e59 1px solid;
		color: #ae9e59;
		font-size: 15px;
		border-radius: 3px;
		margin-right: 5px;
	}

	.tag-red {
		border: #e46935 1px solid;
		color: #e46935;
		font-size: 15px;
		border-radius: 3px;
		margin-right: 5px;
	}

	.right {
		width: 50px;
		display: flex;
		justify-content: space-between;
	}

	.right-icon {
		width: 20px;
		height: 20px;
	}

	.nb {
		color: gray;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		width: 250px;
		padding-bottom: 5px;
	}

	.track-description {
		margin-left: 10px;
		color: gray;
		text-overflow: ellipsis;
	}

	.track-actions {
		margin-top: 10px;
	}

	.track-actions button {
		background-color: #007bff;
		color: white;
		border: none;
		border-radius: 5px;
		padding: 5px 10px;
		margin-right: 5px;
	}
</style>
