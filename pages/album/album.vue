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
					<uni-list-item @click="navigateToPlayPage(index)" link>
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
				musicList: [{
						title: "像我这样的人1",
						tags: ["独家", "VIP"],
						description: "毛不易 - 平凡的一天哦i阿森纳拉的开发",
						url: "https://example.com/music/track1.mp3"
					},
					{
						title: "像我这样的人2",
						tags: ["SQ", "独家", "VIP"],
						description: "毛不易 - 平凡的一天",
						url: "https://example.com/music/track2.mp3"
					},
					{
						title: "像我这样的人3",
						tags: ["独家"],
						description: "毛不易 - 平凡的一天",
						url: "https://example.com/music/track3.mp3"
					},
					{
						title: "像我这样的人4",
						tags: ["VIP"],
						description: "毛不易 - 平凡的一天",
						url: "https://example.com/music/track4.mp3"
					},
					{
						title: "像我这样的人5",
						tags: ["SQ", "独家", "VIP"],
						description: "毛不易 - 平凡的一天",
						url: "https://example.com/music/track5.mp3"
					},
					{
						title: "像我这样的人6",
						tags: ["HQ", "独家"],
						description: "毛不易 - 平凡的一天",
						url: "https://example.com/music/track6.mp3"
					},
					{
						title: "像我这样的人7",
						tags: ["HQ", "独家"],
						description: "毛不易 - 平凡的一天",
						url: "https://example.com/music/track7.mp3"
					},
					{
						title: "像我这样的人8",
						tags: [],
						description: "毛不易 - 平凡的一天",
						url: "https://example.com/music/track8.mp3"
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
