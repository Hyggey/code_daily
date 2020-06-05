const req = require('../../utils/request.js')
const api = require('../../utils/api.js')
const app = getApp()
import Toast from '@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
	mainActiveIndex: 0,  //左侧竖向tab的选中值
	mainActiveId:'',  //左侧栏的id，需要向后台提交的
	topId:'',
	activeId: null,
	active:0, // 右侧顶部tab选中值
	items:[
		{text:'',children:[]},
		{text:'',children:[]}
	],
	goodsData:[],
	page: 1, //默认为1
	imageUrl:req.reqHttp,   //页面图片请求地址
	height2: '',
	singleShow: false,   // 控制最后一次请求后，不在进行请求了，还有一个请求全部商品的没做
	current_tag:'', //全部数据的请求参数
	pass:'', //全部数据的请求参数
	flag: true,  //函数防抖,上拉刷新只执行一次触底函数
	loading: false,   //loading加载动画
	triggered:true,
	topNum: 0,  //scroll-view 的滚动到顶部
  },
  // 获取左侧栏的id
  setLeftId(a,b){
	  let id;
	  a.map((item,index) =>{
	  	if(index == b){
	  		id = item.id
	  	}
	  })
	  console.log(id)
	  this.setData({
	  	mainActiveId: id
	  });
  },
  // 点击左侧tab事件
	onClickLeft({ detail = {} }) {
		console.log(detail.index)
		this.setLeftId(this.data.items,detail.index)
		wx.setStorageSync('leftid',this.data.mainActiveId)
		 this.setData({
			mainActiveIndex: detail.index || 0,
			active: 0,
			current_tag:'',
			pass:'',
			topId: 0,
		 });
		this.getCategoryAll()
		
		// this.fetchCategory()
		// 获取高度
		// let query = wx.createSelectorQuery();
		// query.select('.category_box').boundingClientRect(rect=>{
		//   let height = rect.height;
		//   console.log(height)
		//   this.setData({
		// 	  height2: height
		//   })
		// }).exec();
    },
	// 点击顶部tab事件
	onChangeTop(event){
		console.log(event)
		this.data.page = 1;
		this.data.current_tag = this.data.current_tag;
		this.data.pass = this.data.pass;
		this.data.flag = true
		console.log(this.data.mainActiveId,event.detail.name);
		this.getCategory(event.detail.name)
		this.setData({
			topId: event.detail.name,
			active: event.detail.index,   //优化，让他每一次出来都是滚动到最顶部
			singleShow: false,
		})
	},
	// 请求分类全部的方法
	getCategoryAll(){
		req.post('/product/index',{classify_id:this.data.mainActiveId,page:1,pagesize:10}).then(res =>{
			console.log(res.data)
			if(res.data.code == 0){
				this.setData({
					current_tag: res.data.data.current_tag,
					pass: res.data.data.pass,
					goodsData: res.data.data.data?res.data.data.data:res.data.data
				})
				console.log(this.data.goodsData)
			}
			this.setData({
				triggered:false
			})
		})
	},
	// 获取具体标签商品数据
	getCategory(a){
		req.post('/product/index',{classify_id:this.data.mainActiveId,tag_id:a,page:1,pagesize:10}).then(res =>{
			console.log(res.data)
			if(res.data.code == 0){
				this.setData({
					current_tag: res.data.data.current_tag?res.data.data.current_tag:'',
					pass: res.data.data.pass?res.data.data.pass:'',
					goodsData: res.data.data.data?res.data.data.data:res.data.data
				})
				console.log(this.data.goodsData)
			}
			this.setData({
				triggered:false
			})
		})
	},
	// 获取分类各个标题名字
	fetchCategory(){
		req.post(api.url.getClassifyName).then(res =>{
			console.log(res)
			if(res.data.code == 0){
				let items2 = res.data.data.map((item,index) =>{
					let a = item.son;
					let b = a.unshift({id:0,name:'全部'})
					return {
						id: item.id,
						text: item.name,
						children: a
					}
				})
				console.log(items2)
				this.setData({
					items: items2
				})
				
				// 默认第一次加载页面获取mainActiveId的值,如果this.data.mainActiveId存在，说明是上一个页面传过来的
				if(this.data.mainActiveId){
					items2.map((item,index) =>{
						if(item.id == this.data.mainActiveId){
							this.setData({
								mainActiveIndex:index
							})
						}
					})
					this.getCategoryAll()
				}else{
					this.setLeftId(items2,0)
					this.getCategoryAll()
				}
			}
		})
	},
	toGoods(e){
		let id = e.currentTarget.dataset['id']
		wx.navigateTo({
			url: '/pages/goods/goodsDetail/goodsDetail?id=' + id
		})
		// 判断用户进入了商品详情
		wx.setStorageSync('toGood',true)
	},
	addCart(e){
		let id = e.currentTarget.dataset['id'];
		let token = wx.getStorageSync('token')
		if(token){
			req.post(api.url.addcart,{product_id:id},true).then(res =>{
				console.log(res)
				if(res.data.code == 0){
					wx.hideNavigationBarLoading();
					app.globalData.shopCartLen++;
					wx.setTabBarBadge({
						index: 2,
						text: app.globalData.shopCartLen.toString(),
					})
					Toast({
						duration:600,
						message:'加入购物车成功',
					});
				}
			})
		}else{
			wx.navigateTo({
				url:'/pages/login/login'
			})
		}
	},
	lower(){
		console.log(5555,this.data.flag)
		if(!this.data.flag){
			return
		}
		this.data.flag = false
		// 全部那一项请求的分页
		if(this.data.topId == 0 || this.data.topId == ''){
			console.log('全部')
			const data ={
				classify_id:this.data.mainActiveId,
				current_tag:this.data.current_tag,
				pass: this.data.pass,
				pagesize: 10
			}
			this.setData({
				loading2: true
			})
			req.post('/product/index',data).then(res =>{
				console.log(res.data)
				this.data.flag = true   //今天改的
				if(res.data.code == 0 && res.data.data.count_product != 0){
					console.log(333)
					// 重新拷贝一份数组出来
					let allData = JSON.parse(JSON.stringify(res.data))
					this.setData({
						current_tag: res.data.data.current_tag,
						pass: res.data.data.pass,
						goodsData: this.data.goodsData.concat(allData.data.data.splice(1))
					})
					}else{
						if(res.data.data.count_product == 0){
						this.data.flag = true  // 今天改的
						this.setData({
							goodsData: this.data.goodsData.concat(res.data.data.data.splice(1))
						})
					}
					console.log(this.data.goodsData)
				}
				this.setData({
					loading2: false
				})
			})
		}else{
			// 这里为什么要写这个，是因为这个接口的特殊性，如果和下面接口一样，就根本需要这么写，原因是，我没有做判断，当res.data.data.count_product == 0
			// 后面又继续请求了，尽管请求过来的是数据为0
			this.data.flag = true
			// 不是全部请求的分页
			if(!this.data.singleShow){
				this.data.page += 1;
				const data = {
					classify_id:this.data.mainActiveId,
					tag_id: this.data.topId,
					page: this.data.page,
					pagesize: 10
				}
				this.setData({
					loading2: true
				})
				req.post('/product/index',data).then(res =>{
					console.log(res.data);
					if(res.data.code == 0){
						if(res.data.data.length<10){
							this.data.singleShow = true;
							this.setData({
								goodsData: this.data.goodsData.concat(res.data.data)
							})
						}else{
							this.setData({
								goodsData: this.data.goodsData.concat(res.data.data)
							})
						}
						// console.log(this.data.guessLove)
					}
					this.setData({
						loading2: false
					})
				})
			}
		}
	},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	// console.log(options.leftid)
	// let leftid = wx.getStorageSync('leftid')
	// wx.removeStorageSync('leftid')
	// this.setData({
	// 	mainActiveId:leftid
	// })
	// this.fetchCategory()
	// 获取高度
	// let query = wx.createSelectorQuery();
	// query.select('.category_box').boundingClientRect(rect=>{
	//   let height = rect.height;
	//   console.log(height)
	//   this.setData({
	// 	  height2: height
	//   })
	// }).exec();
	},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
	wx.setTabBarBadge({
	  	index: 2,
	  	text: app.globalData.shopCartLen.toString(),
	})
	let leftid = wx.getStorageSync('leftid')
	wx.removeStorageSync('leftid')
	this.setData({
		mainActiveId:leftid
	})
	wx.setStorageSync('leftid',this.data.mainActiveId)
	console.log(this.data.mainActiveId)
	// 进入商品详情后退回进入这个页面
	let toGood = wx.getStorageSync('toGood')
	wx.removeStorageSync('toGood')
	if(this.data.topId != 0 && toGood){
		this.setData({
			active: this.data.active
		})
	}else if(!toGood){    // 首页，购物车或者我的进入这个页面
		this.fetchCategory()
		this.setData({
			active: 0,
			topNum:0
		})
	}
	
	
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  },
  // scroll-view 的下拉刷新
  onRefresh(){
	console.log(this.data.topId)
	// if(this.data.topId != 0){
	// 	this.setData({
	// 		singleShow: false,
	// 		page: 1
	// 	})
	// 	this.getCategory(this.data.topId)
	// }else{
	// 	this.getCategoryAll()
	// }
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
	console.log(222)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})