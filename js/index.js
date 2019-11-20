$(document).ready(function () {

	//-----------------------------------------定义和初始化变量----------------------------------------
	var loadBox = $('aside.loadBox');
	var articleBox = $('article');
	var windowScale = window.innerWidth / 750;
	var loadPer = $("#loadingBox .per");
	var loadWord = $("#loadingBox p");
	var Voice;

	//----------------------------------------页面初始化----------------------------------------
	icom.init(init);//初始化
	icom.screenScrollUnable();//如果是一屏高度项目且在ios下，阻止屏幕默认滑动行为

	function init() {
		requestAnimationFrame(function () {
			if (os.screenProp < 0.54) articleBox.addClass("screen189");
			if (os.screenProp > 0.62) articleBox.addClass("screen159");
			load_handler();
			sound_handler();
		});
		wxUser.init();
	}//edn func

	function sound_handler() {
		if (os.weixin) {
			var wsb = window;
			if (wsb.WeixinJSBridge) {
				try {
					wsb.WeixinJSBridge.invoke("getNetworkType", {}, sound_creat);
				}
				catch (e) {
					wx.ready(sound_creat);
				}
			}
			else {
				document.addEventListener("WeixinJSBridgeReady", sound_creat, false);
			}
		} else {
			sound_creat();
		}
	}//edn func

	function sound_creat() {
		document.removeEventListener("WeixinJSBridgeReady", sound_creat);
		Voice = iaudio.on([{
			src: "audio/anime.mp3",
			autoplay: false,
			loop: 0
		}]);
	}//end func


	//----------------------------------------加载页面图片----------------------------------------
	function load_handler() {
		var loader = new PxLoader();
		loader.addImage('images/loadingBox/bg.jpg');
		loader.addImage('images/loadingBox/logo.png');

		loader.addCompletionListener(function () {
			icom.fadeIn(articleBox);
			load_more();
			// pageInit();
			loader = null;
		});
		loader.start();
	}//end func

	function load_more() {
		var loader = new PxLoader();
		loader.addImage('images/share.jpg');
		loader.addImage('images/wineBox/bg.jpg');
		loader.addImage('images/wineBox/btn.png');
		loader.addImage('images/wineBox/wine.png');
		loader.addImage('images/wineBox/word.png');
		loader.addImage('images/videoBox/black.jpg');
		loader.addImage('images/videoBox/close.png');
		loader.addImage('images/videoBox/dot.png');
		loader.addImage('images/videoBox/mask_black.png');
		loader.addImage('images/videoBox/mask_red.png');
		loader.addImage('images/videoBox/mask_silver.png');
		loader.addImage('images/videoBox/red.jpg');
		loader.addImage('images/videoBox/silver.jpg');
		loader.addImage('images/videoBox/sp.png');
		loader.addImage('images/videoBox/w_silver/w1.png');
		loader.addImage('images/videoBox/w_silver/w2.png');
		loader.addImage('images/videoBox/w_silver/w3.png');
		loader.addImage('images/videoBox/w_silver/w4.png');
		loader.addImage('images/videoBox/w_silver/w5.png');
		loader.addImage('images/videoBox/w_silver/w6.png');
		loader.addImage('images/videoBox/w_red/w1.png');
		loader.addImage('images/videoBox/w_red/w2.png');
		loader.addImage('images/videoBox/w_red/w3.png');
		loader.addImage('images/videoBox/w_red/w4.png');
		loader.addImage('images/videoBox/w_red/w5.png');
		loader.addImage('images/videoBox/w_red/w6.png');
		loader.addImage('images/videoBox/w_black/w1.png');
		loader.addImage('images/videoBox/w_black/w2.png');
		loader.addImage('images/videoBox/w_black/w3.png');
		loader.addImage('images/videoBox/w_black/w4.png');
		loader.addImage('images/videoBox/w_black/w5.png');
		loader.addImage('images/videoBox/w_black/w6.png');
		loader.addImage('images/videoBox/w_black/w6.png');
		loader.addImage('images/videoBox/red.png');
		loader.addImage('images/videoBox/silver.png');
		loader.addImage('images/videoBox/black.png');
		loader.addImage('images/tipsBox/agree.png');
		loader.addImage('images/tipsBox/bg.jpg');
		loader.addImage('images/tipsBox/border1.png');
		loader.addImage('images/tipsBox/border2.png');
		loader.addImage('images/tipsBox/btn.png');
		loader.addImage('images/tipsBox/close_bg.png');
		loader.addImage('images/tipsBox/read.png');
		loader.addImage('images/tipsBox/text.png');
		loader.addImage('images/tipsBox/tip1.png');
		loader.addImage('images/public/arrow.png');
		loader.addImage('images/public/logo.png');
		loader.addImage('images/public/tips.png');
		loader.addImage('images/productBox/arl.png');
		loader.addImage('images/productBox/arr.png');
		loader.addImage('images/productBox/b.jpg');
		loader.addImage('images/productBox/b.png');
		loader.addImage('images/productBox/b1.png');
		loader.addImage('images/productBox/bg.jpg');
		loader.addImage('images/productBox/point.png');
		loader.addImage('images/productBox/r.png');
		loader.addImage('images/productBox/r1.png');
		loader.addImage('images/productBox/s.png');
		loader.addImage('images/productBox/s1.png');
		loader.addImage('images/productBox/tips.png');
		loader.addImage('images/peopleBox/1.jpg');
		loader.addImage('images/peopleBox/10.jpg');
		loader.addImage('images/peopleBox/2.jpg');
		loader.addImage('images/peopleBox/3.jpg');
		loader.addImage('images/peopleBox/4.jpg');
		loader.addImage('images/peopleBox/5.jpg');
		loader.addImage('images/peopleBox/6.jpg');
		loader.addImage('images/peopleBox/7.jpg');
		loader.addImage('images/peopleBox/8.jpg');
		loader.addImage('images/peopleBox/9.jpg');
		loader.addImage('images/peopleBox/bg.jpg');
		loader.addImage('images/peopleBox/word.png');
		loader.addImage('images/moreBox/bg.jpg');
		loader.addImage('images/moreBox/btn.png');
		loader.addImage('images/moreBox/letter.png');
		loader.addImage('images/moreBox/w1.png');
		loader.addImage('images/moreBox/w2.png');
		loader.addImage('images/moreBox/w3.png');
		loader.addImage('images/moreBox/word1.png');
		loader.addImage('images/introBox/bg.jpg');
		loader.addImage('images/introBox/btn.png');
		loader.addImage('images/introBox/cover.jpg');
		loader.addImage('images/introBox/word.png');
		loader.addImage('images/common/bgm_off.png');
		loader.addImage('images/common/bgm_on.png');
		loader.addImage('images/common/close.png');
		loader.addImage('images/common/turn_lock.png');
		loader.addImage('images/common/turn_no.png');
		loader.addImage('images/common/turn_phone.png');
		loader.addImage('images/common/turn_unlock.png');
		loader.addImage('images/common/turn_yes.png');
		loader.addImage('images/animeBox/bg.jpg');
		loader.addImage('images/animeBox/tips.png');
		loader.addImage('images/animeBox/word.png');

		for (var i = 0; i <= 109; i++) {
			loader.addImage('images/anime/join_'+i+'.jpg');
		}

		for (var i = 1; i <= 70; i++) {
			loader.addImage('images/videoBox/red/pic'+i+'.jpg');
			loader.addImage('images/videoBox/black/pic'+i+'.jpg');
			loader.addImage('images/videoBox/silver/pic'+i+'.jpg');
		}

		//实际加载进度
		loader.addProgressListener(function(e) {
			var per=Math.round(e.completedCount/e.totalCount*50);
			loadPer.css({width:per+'%'});
			loadWord.html(per+'%');
		});

		loader.addCompletionListener(function () {
			loadBox.hide();
			// pageInit();
			load_timer(50);//模拟加载进度
			loader = null;
		});
		loader.start();
	}//end func

	//模拟加载进度
	function load_timer(per) {
		per = per || 0;
		per += imath.randomRange(1, 3);
		per = per > 100 ? 100 : per;
		loadPer.css({width:per+'%'});
		loadWord.html(per+'%');
		if (per == 100) setTimeout(pageInit, 200);
		else setTimeout(load_timer, 33, per);
	}//edn func

	//----------------------------------------页面逻辑代码----------------------------------------
	var animeBox = $("#animeBox");
	var cubeBox = $("#cubeBox");
	var moreBox = $("#moreBox");
	var productBox = $("#productBox");
	var peopleBox = $("#peopleBox");
	var peopleAnime = $("#peopleAnime");
	var introBox = $("#introBox");
	var wineBox = $("#wineBox");
	var videoBox = $("#videoBox");
	var animeBg = $("#animeBg");
	var tipsBox = $("#tipsBox");
	var privacyBox = $("#privacyBox");



	var ruleScroll = new IScroll('#ruleScroll', {
		bounce: false,
		click: true
	});
	var imodel;
	var posLast = [];

	var items = [];
	var nowItem = 0;
	var swiperFlag = true;
	var videoPlayTimes = 0;
	var videoVpBox = $("#videoVpBox");

	var moveData = {x:0,y:0};
	var movePos = [{x:-0.3,y:0.58},{x:-0.66,y:-0.36},{x:1.1,y:0.94}];
	var nowMovePos = -1;
	var moveCubeFlag = true;

	/**
	 * 页面初始化
	 */
	function pageInit() {
		eventInit();
		// DevelopTest();
		monitor_handler();

		animeBox.show();
		icom.fadeOut($("#loadingBox"));
		privacyInit();
		animeBgInit();
		modelInit();
		swiperInit();
	}//end func

	/**
	 * 开发测试使用
	 */
	function DevelopTest() {
		$("#loadingBox").hide();
		showIntroBox();
	}

	/**
	 * 事件初始化
	 */
	function eventInit() {
		$(".limitBtn").on("touchend", limitClick);

		cubeBox.on("touchstart", Prevent);
		cubeBox.on("swipeleft",{dir:1} ,moveCube);
		cubeBox.on("swiperight",{dir:-1} ,moveCube);
		// cubeBox.on('touchstart', this_touchstart);
		// cubeBox.on('click', showProductBox);

		productBox.find(".itemClick").on("click", playVideo);

		moreBox.find(".btn").on("touchend", showPeopleBox);

		peopleBox.find(".btn").on("touchend", showWineBox);

		wineBox.find(".btn").on("touchend", showIntroBox);
		wineBox.one("touchmove", wineAnime);

		videoBox.find(".close").on("touchend", closeVideoBox);

		introBox.find(".videoBox").one("touchend", playIntroVideo);
		introBox.find(".btn").one("touchend", jumpOther);
	}

	/**
	 * 移动魔方
	 */
	function moveCube(e){
		if (moveCubeFlag) {
			moveCubeFlag = false;
			var dir = e.data.dir;
			var move = {x:0,y:0};
			if(nowMovePos == -1){
				nowMovePos = 0;
				var now = movePos[nowMovePos];
				move.x += now.x + Math.PI * 2;
				move.y += now.y;
			}
			else{
				var now = movePos[nowMovePos];
				nowMovePos = dealIndex(nowMovePos + dir);
				var next = movePos[nowMovePos];
				move.x += next.x - now.x;
				move.y += next.y - now.y + Math.PI * 2;	
			}

			moveCubeAnime(move,60);
		}
	}

	/**
	 * 移动的魔方的动画
	 */
	function moveCubeAnime(move,times){
		var unitX = move.x / times;
		var unitY = move.y / times;

		function anime(){
			imodel.changModelPos(unitX, unitY, 0);
			times--;

			requestAnimationFrame(function(){
				if(times > 0) anime();
				else moveCubeFlag = true;
			})
		}
		anime();
	}

	/**
	 * 点击立方体的面
	 */
	function clickCubeFace(id){
		if(id == 0 || id == 0 || id == 24 || id == 27) showProductBox();
	}

	/**
	 * 酒的动画
	 */
	function wineAnime(){
		var wine = wineBox.find(".wine");
		var word = wineBox.find(".word");
		var btn = wineBox.find(".btn");

		icom.fadeOut(word,500,function(){
			wine.addClass("wineing");
		});

		setTimeout(function(){
			icom.fadeIn(btn);
		},500)
	}

	/**
	 * 跳转其他链接
	 */
	function jumpOther() {
		if (window.__wxjs_environment === 'miniprogram') {
			wx.miniProgram.navigateTo({ url: '/pages/jd2/jd2' })
		}
		else {
			location.replace("https://chivasb20phase2.pernod-ricard-china.com/sale.html");
		}
	}

	/**
	 * 显示产品页面
	 */
	function showProductBox() {
		productBox.show();
		icom.fadeOut(animeBox);
	}

	/**
	 * 播放介绍页面视频
	 */
	function playIntroVideo() {
		$("#myVideo").show();
		introBox.find(".videoBox .cover").hide();
		var video = $("#myVideo")[0];
		if(os.ios) video.play();
		else{
			setTimeout(() => {
				video.play();
			}, 500);
		}
	}

	/**
	 * 显示介绍页面
	 */
	function showIntroBox() {
		introBox.show();
		icom.fadeOut(wineBox);
		// if(os.android) introBox.find(".cover").hide();
	}

	/**
	 * 显示酒瓶页面
	 */
	function showWineBox() {
		wineBox.show();
		icom.fadeOut(peopleBox);
		peopleAnime.destroy();
	}

	/**
	 * 显示任务的页面
	 */
	function showPeopleBox() {
		peopleBox.show();
		icom.fadeOut(moreBox);

		peopleAnime.VP({
			debug: false,
			autoPlay: true,
			loop: false,
			total: 10,
			time: 1.5,
			type: 'jpg',
			poster: "images/peopleBox/1.jpg",
			path: "images/peopleBox/",
			onPlay: function () {

			},
			onEnd: function () {
				setTimeout(function(){
					peopleAnime.gotoAndPlay(0);
				},1500);
			}
		});
	}

	/**
	 * 显示更多页面
	 */
	function showMoreBox() {
		moreBox.show();
		icom.fadeOut(productBox);
	}

	/**
	 * 关闭视频页面
	 */
	function closeVideoBox() {
		if (videoPlayTimes == 3) showMoreBox();
		productBox.addClass("noPointer");
		icom.fadeOut(videoBox, 500, function () {
			videoVpBox.destroy();
			videoVpBox.empty();
			productBox.removeClass("noPointer");
			videoBox.find(".wordBox").empty();
		});

		showNextPro();
	}

	/**
	 * 显示下一个产品
	 */
	function showNextPro(){
		var nextId = nowItem + 1 > 2 ? 0 : nowItem + 1;
		var preId = nowItem - 1 < 0 ? 2 : nowItem - 1;
		
		if(!items[preId].hasClass("act")){
			swipering({data:{dir:-1}});
		}
		else if(!items[nextId].hasClass("act")){
			swipering({data:{dir:1}});
		}
	}

	/**
	 * 播放视频
	 */
	function playVideo() {
		var that = $(this).parents(".item");
		var type = that.attr("data-val");
		var pattern = videoBox.find(".pattern");
		var tips = productBox.find(".tips_"+type);
		var time = 0;

		productBox.addClass("noPointer");
		videoBox.addClass("noPointer");

		if(!tips.hasClass("act")){
			time = 1500;
			tips.addClass("act");
			tips.transition({opacity:1},1000);
		}

		setTimeout(function(){
			icom.fadeIn(videoBox, 500, function () {
				videoBox.removeClass("noPointer");
				productBox.removeClass("noPointer");
				var cont = "";
				for (let i = 0; i < 7; i++) {
					var index = i + 1;
					var id = i > 1 ? i : i + 1;
					cont += '<img src="images/videoBox/w_' + type + '/w' + id + '.png" class="word word' + index + ' wording' + index + '">';
				}
				videoBox.find(".wordBox").append(cont);
				if (!that.hasClass("act")) {
					that.addClass("act");
					videoPlayTimes++;
				}
			});
			
			videoBox.find(".bg")[0].src = "images/videoBox/" + type + ".jpg";
			videoBox.find(".maskBox").removeClass("red black silver").addClass(type);
			if (type == "silver") pattern.show();
			else pattern.hide();
	
			videoVpBox.VP({
				debug: false,
				autoPlay: true,
				loop: false,
				total: 70,
				time: 4,
				type: 'jpg',
				scaleMode: 'fixedWidth',
				poster: "images/videoBox/" + type + "/pic1.jpg",
				path: "images/videoBox/" + type + "/pic",
				onPlay: function () {
					
				},
				onEnd: function () {
					videoVpBox.destroy();
				}
			});
		}, time);
	}

	/**
	 * 滑动初始化
	 */
	function swiperInit() {
		var box = productBox.find(".swiperBox");
		var item = box.find(".item");
		var arL = productBox.find(".arL");
		var arR = productBox.find(".arR");

		item.each(function () {
			items.push($(this));
		});

		box.on("swipeleft", { dir: -1 }, swipering);
		box.on("swiperight", { dir: 1 }, swipering);

		arL.on("touchend", { dir: 1 }, swipering);
		arR.on("touchend", { dir: -1 }, swipering);
	}

	/**
	 * 滑动
	 */
	function swipering(e) {
		if (swiperFlag) {
			swiperFlag = false;
			var dir = e.data.dir;
			var now = items[nowItem];
			nowItem = dealIndex(nowItem + dir);
			var next = items[nowItem];

			now.transition({ x: (dir * 110) + "%", scale: 0.7, opacity: 0 }, 1000, function () {
				now.hide();
				swiperFlag = true;
			});
			next.show().css({ x: (-dir * 110) + "%", scale: 0.7, opacity: 0 })
				.transition({ x: 0, scale: 1, opacity: 1 }, 1000);
		}
	}

	/**
	 * 处理下标
	 */
	function dealIndex(index) {
		if (index < 0) index = 2;
		else if (index > 2) index = 0;
		return index;
	}

	/**
	 * 阻止事件冒泡
	 */
	function Prevent(e) {
		// e.stopPropagation();
		// e.preventDefault();
		animeBox.find(".tips").hide();
	}

	/**
	 * 隐私初始化
	 */
	function privacyInit() {
		$("#ruleScroll .scrollBox").load("privacy.html?v=" + Math.random(), function () {
			ruleScroll.refresh();
		});
	}

	/**
	 * 模型初始化
	 */
	function modelInit() {
		imodel = new ThreeDmodel();
		var opts = {
			modelSrc: "model/box05.fbx",
			ambColor: 0xffffff,
			spotLight: true,
			pointLight: true,
			control: false,
			onComplete: function () {
				imodel.changModelPos(0.3, 0, -0.5);
			}
		};

		imodel.init("cubeBox", opts);
		imodel.on("click", clickCubeFace);
	}

	/**
	 * 动画背景初始化
	 */
	function animeBgInit() {
		animeBg.VP({
			debug: false,
			autoPlay: true,
			loop: false,
			total: 109,
			time: 5,
			type: 'jpg',
			// mode: 2,
			scaleMode: 'fixedWidth',
			// audio: 'sound/bgm.mp3',
			poster: "images/anime/join_0.jpg",
			path: "images/anime/join_",
			onPlay: function () {
				animeBox.show();
				setTimeout(function () {
					cubeBox.addClass("scaleing");
					cubeRotate();
				}, 4000);
				Voice.anime.play();
			},
			onEnd: function () {
				animeBg.destroy();
				indexBoxShow();
			}
		});
	}

	/**
	 * 立方体旋转
	 */
	function cubeRotate() {
		var count = 63;
		var unit = (-Math.PI * 2 - 0.9) / count;

		function rotating() {
			count--;
			imodel.changModelPos(0, unit, 0);
			requestAnimationFrame(function () {
				if (count > 0) rotating();
			})
		}
		rotating();
	}

	/**
	 * 首页显示
	 */
	function indexBoxShow() {
		var logo = animeBox.find(".logo");
		var tips = animeBox.find(".tips");
		var word = animeBox.find(".word");
		var arrow = animeBox.find(".arrow");
		var reasonTips = animeBox.find(".reasonTips");

		icom.fadeIn(logo);
		icom.fadeIn(tips);
		setTimeout(function () {
			icom.fadeIn(word);
		}, 500);
		// icom.fadeIn(arrow);
		icom.fadeIn(reasonTips);

		icom.fadeOut(animeBg);
		cubeBox.removeClass("noPointer");
	}

	/**
	 * 限制点击
	 */
	function limitClick() {
		$(".limitBtn").addClass('noPointer');
		setTimeout(function () { $(".limitBtn").removeClass('noPointer') }, 500);
	}//end func

	//----------------------------------------控制旋转----------------------------------------
	//单指双指触控
	function this_touchstart(e) {
		$(this).on('touchmove', this_touchmove).one('touchend', this_touchend);
		posLast = [e.originalEvent.touches[0].clientX, e.originalEvent.touches[0].clientY];
	}//end func

	function this_touchmove(e) {
		e.preventDefault();
		var disX = e.originalEvent.touches[0].clientX - posLast[0];
		var disY = e.originalEvent.touches[0].clientY - posLast[1];
		var rtaX = disY * 0.02;
		var rtaY = disX * 0.02;
		imodel.changModelPos(rtaX, rtaY, 0);
		moveData.x += rtaX;
		moveData.y += rtaY;
		console.log(moveData)
		posLast[0] = e.originalEvent.touches[0].clientX;
		posLast[1] = e.originalEvent.touches[0].clientY;
	}//end func

	function this_touchend(e) {
		$(this).off('touchmove');
	}//end func

	//----------------------------------------页面监测代码----------------------------------------
	function monitor_handler() {
		//		imonitor.add({obj:$('a.btnTest'),action:'touchstart',category:'default',label:'测试按钮'});
	}//end func
});//end ready
