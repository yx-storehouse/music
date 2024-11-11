<template>
	<view class="index">
		<swiper class="bannerContent" autoplay interval="1000">
			<swiper-item v-for="(value, index) in swiper.img" :key="index">
				<image :src="value" class="swiperImg"></image>
			</swiper-item>
		</swiper>

		<view class="content">
			
			<view class="bar">
				<view class="iconSpan" v-for="(val, index) in contentBar" :key="index">
					<image :src="val.src" class="iconBarImg"></image>
					<view>{{ val.name }}</view>
				</view>
			</view>

			<!-- Featured Section -->
			<view class="used">
				<view class="usedImg" @tap="goUrl('../info/info')">
					<image :src="content.img"></image>
					<image class="icon" src="../../static/image/icons/triangle_blank.png"></image>
					<view class="imgTitle">{{ content.imgTitle }}</view>
				</view>
				<view class="list">
					<view class="grayColor info" v-for="(val, index) in content.list" :key="index"
						@tap="goUrl('../album/album')">
						<view class="name">{{ val.name }}</view>
						<view class="disc">{{ val.disc }}</view>
						<image :src="val.src" class="listImg"></image>
					</view>
				</view>
			</view>
		</view>

		<!-- Album block components -->
		<albumblock :prodata="recommend" changeReturnParams="recom" @change="recChange"></albumblock>
		<albumblock :prodata="newest"></albumblock>
		<albumblock :prodata="sole" blockWidth='49.5%'></albumblock>
	</view>
</template>

<script>
	import top from "../../components/top";
	import albumblock from "../../components/albumblock";
	import {
		contentBar,
		content,
		recommend,
		newest,
		sole,
		swiper
	} from "../../publicjs/mock.js";

	export default {
		components: {
			top,
			albumblock
		},
		data() {
			return {
				swiper: swiper,
				contentBar: contentBar,
				content: content,
				recommend: recommend,
				newest: newest,
				sole: sole
			}
		},
		methods: {
			recChange: function(val) {
				if (val == "recom") {
					let arry = this.recommend.list.splice(0, 2);
					this.recommend.list = [...this.recommend.list, ...arry];
				}
			},
			goUrl: function(str) {
				uni.navigateTo({
					url: str
				});
			}
		}
	}
</script>

<style lang="scss">
	.index {
		width: 100vw;
		padding-bottom: 60upx;

		.bannerContent {
			width: 100%;
			height: 320upx;

			.swiperImg {
				width: 100%;
				height: 100%;
			}
		}

		.content {
			padding: 20upx;

			.bar {
				display: flex;
				padding: 36upx 0;
				margin-top: -36upx;
				position: relative;
				z-index: 1;
				background: #00C28B;
				box-shadow: 4upx 4upx 10upx #CCCCCC;
				border-radius: 10upx;

				.iconSpan {
					flex: 1;
					text-align: center;

					.iconBarImg {
						width: 44upx;
						height: 44upx;
					}
				}
			}
		}

		.used {
			display: flex;
			margin-top: 40upx;

			.usedImg {
				position: relative;
				width: 220upx;
				height: 220upx;
				margin-right: 20upx;
				box-shadow: 4upx 4upx 10upx #CCCCCC;

				image {
					height: 100%;
					width: 100%;
				}

				.icon {
					position: absolute;
					width: 50upx;
					height: 50upx;
					top: 50%;
					left: 50%;
					margin: -25upx auto auto -25upx;
					opacity: .8;
				}

				.imgTitle {
					position: absolute;
					display: block;
					width: 100%;
					bottom: 20upx;
					text-align: center;
					color: #FFFFFF;
				}
			}

			.list {
				flex: 1;

				.info {
					position: relative;
					height: 100upx;
					box-sizing: border-box;
					padding: 12upx 20upx;

					&:first-child {
						margin-bottom: 20upx;
					}

					.name {
						font-size: 32upx;
					}

					.disc {
						font-size: 26upx;
						color: #6f6f6f;
					}

					.listImg {
						position: absolute;
						right: 0;
						top: 0;
						width: 100upx;
						height: 100upx;
					}
				}
			}
		}
	}
</style>
