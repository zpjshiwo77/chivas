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
		// var shareInfo = {
		// 	title:"品味不凡，不止一面",
		// 	friend: "解锁三面不凡特质，了解吴亦凡灵感调和故事",
		// 	timeline: "芝华士X吴亦凡全新调和，来品！"
		// }
		// wxUser.init({shareInfo:shareInfo});
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
		loader.addImage('images/productBox/red.png');
		loader.addImage('images/productBox/black.png');
		loader.addImage('images/productBox/silver.png');
		loader.addImage('images/productBox/tips2.png');
		loader.addImage('images/productBox/tips3.png');
		loader.addImage('images/productBox/pattern.png');
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
		loader.addImage('images/animeBox/t1.png');
		loader.addImage('images/animeBox/t2.png');
		loader.addImage('images/animeBox/word.png');

		for (var i = 0; i <= 109; i++) {
			loader.addImage('images/anime/join_' + i + '.jpg');
		}

		for (var i = 1; i <= 70; i++) {
			loader.addImage('images/videoBox/red/pic' + i + '.jpg');
			loader.addImage('images/videoBox/black/pic' + i + '.jpg');
			loader.addImage('images/videoBox/silver/pic' + i + '.jpg');
		}

		for (var i = 0; i < 30; i++) {
			if(i<24) loader.addImage('images/animeBox/cube/1/' + i + '.png');
			if(i<27) loader.addImage('images/animeBox/cube/2/' + i + '.png');
			if(i<26) loader.addImage('images/animeBox/cube/3/' + i + '.png');
			if(i<21) loader.addImage('images/animeBox/cube/4/' + i + '.png');
			if(i<27) loader.addImage('images/animeBox/cube/6/' + i + '.png');
		}

		for (var i = 1; i <= 41; i++) {
			loader.addImage('images/peopleBox/peopleAnime/' + i + '.jpg');
		}

		//实际加载进度
		loader.addProgressListener(function (e) {
			var per = Math.round(e.completedCount / e.totalCount * 50);
			loadPer.css({ width: per + '%' });
			loadWord.html(per + '%');
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
		loadPer.css({ width: per + '%' });
		loadWord.html(per + '%');
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
	var wineAnime = $("#wineAnime");
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

	var moveData = { x: 0, y: 0 };
	var movePos = [{ x: 1.1, y: 0.94 }, { x: -0.3, y: 0.58 }, { x: -0.66, y: -0.36 }];
	var nowMovePos = -1;
	var moveCubeFlag = true;
	var wineAnimeFlag = true;
	var showMoreFlag = false;

	var cubeAnimes = [];

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
		// modelInit();
		swiperInit();
		cubeAnimesInit();
	}//end func

	/**
	 * 开发测试使用
	 */
	function DevelopTest() {
		$("#loadingBox").hide();
		// showPeopleBox();
		// showWineBox();
		showProductBox();
	}

	/**
	 * 事件初始化
	 */
	function eventInit() {
		$(".limitBtn").on("touchend", limitClick);

		// cubeBox.on("touchstart", Prevent);
		cubeBox.on("swipeleft", { dir: 1 }, moveCube);
		cubeBox.on("swiperight", { dir: -1 }, moveCube);
		// cubeBox.on('touchstart', this_touchstart);
		cubeBox.on('click', clickCubeFace);

		productBox.find(".itemClick").on("click",{color:"x"}, playVideo);
		productBox.find(".enterBox").on("click",{color:"red"} ,playVideo);
		productBox.on("touchmove", showMoreBox);

		moreBox.find(".btn").on("touchend", showPeopleBox);

		peopleBox.find(".btn").on("touchend", showWineBox);

		wineBox.find(".btn").on("touchend", showIntroBox);
		// wineBox.find(".wine").one("touchmove", wineAnime);
		wineBox.find(".wine").one("swipeleft", wineSwiperAnime);
		wineBox.find(".wine").one("swiperight", wineSwiperAnime);

		videoBox.find(".close").on("touchend", closeVideoBox);

		introBox.find(".videoBox").one("touchend", playIntroVideo);
		introBox.find(".btn").one("touchend", jumpOther);
	}

	/**
	 * 魔方动画初始化
	 */
	function cubeAnimesInit(){
		var nums = [0,24,27,26,21,27];
		for (var i = 1; i <= 5; i++) {
			var anime = $("#anime"+i);
			gifInit(anime,nums[i],i);
			cubeAnimes.push(anime);			
		}
	}

	/**
	 * gif初始化
	 */
	function gifInit(anime,num,i){
		anime.gifOn({
			path:"images/animeBox/cube/"+(i == 5 ? i + 1 : i)+"/",
			type:"image",
			num: num,
			speed: i == 1 ? 60 : 30,
			pause: true,
			repeat: 9999,
			onComplete: function(){
				anime.gifGoto(num-1);
			}
		});
	}

	/**
	 * 移动魔方
	 */
	function moveCube(e) {
		if (moveCubeFlag) {
			moveCubeFlag = false;
			if (nowMovePos == -1) {
				cubeAnimes[0].hide();
				cubeAnimes[1].show().gifResume();
				nowMovePos = dealIndex(nowMovePos + 1);
				icom.fadeOut(animeBox.find(".tips1"));		
				icom.fadeIn(animeBox.find(".tips2"));	
				setTimeout(function(){
					cubeAnimes[1].hide();
					cubeAnimes[2].show();
				}, 1300);	
			}
			else {
				var now = cubeAnimes[nowMovePos + 2];
				nowMovePos = dealIndex(nowMovePos + 1);
				var next = cubeAnimes[nowMovePos + 2];
				now.gifResume();
			}

			setTimeout(function(){
				moveCubeFlag = true;
				if(now){
					now.hide().gifGoto(0);
					next.show();
				}
			}, 1300);
		}
	}

	// /**
	//  * 移动魔方
	//  */
	// function moveCube(e) {
	// 	if (moveCubeFlag) {
	// 		moveCubeFlag = false;
	// 		var dir = e.data.dir;
	// 		var move = { x: 0, y: 0 };
	// 		if (nowMovePos == -1) {
	// 			nowMovePos = 0;
	// 			var now = movePos[nowMovePos];
	// 			move.x += now.x;
	// 			move.y += now.y + Math.PI * 2;
	// 		}
	// 		else {
	// 			var now = movePos[nowMovePos];
	// 			nowMovePos = dealIndex(nowMovePos + dir);
	// 			var next = movePos[nowMovePos];
	// 			move.x += next.x - now.x;
	// 			move.y += next.y - now.y + Math.PI * 2;
	// 		}

	// 		moveCubeAnime(move, 60);
	// 	}
	// }

	/**
	 * 移动的魔方的动画
	 */
	function moveCubeAnime(move, times) {
		var unitX = move.x / times;
		var unitY = move.y / times;

		function anime() {
			imodel.changModelPos(unitX, unitY, 0);
			times--;

			requestAnimationFrame(function () {
				if (times > 0) anime();
				else moveCubeFlag = true;
			})
		}
		anime();
	}

	/**
	 * 点击立方体的面
	 */
	function clickCubeFace(id) {
		if (nowMovePos == 0) showProductBox();
	}

	/**
	 * 酒的动画
	 */
	function wineSwiperAnime() {
		if (wineAnimeFlag) {
			wineAnimeFlag = false;
			var wine = wineBox.find(".wine");
			var word = wineBox.find(".word");
			var btn = wineBox.find(".btn");

			icom.fadeOut(word, 500, function () {
				wine.addClass("wineing");
			});

			setTimeout(function () {
				icom.fadeIn(btn);
			}, 500)
		}
	}

	/**
	 * 跳转其他链接
	 */
	function jumpOther() {
		if (window.__wxjs_environment === 'miniprogram') {
			wx.miniProgram.navigateTo({ url: '/pages/jd2/jd2' })
		}
		else {
			location.replace("https://chivasb20phase2.pernod-ricard-china.com/lecode/sale.html");
		}
	}

	/**
	 * 显示产品页面
	 */
	function showProductBox() {
		productBox.show();
		productBox.addClass("noPointer");
		icom.fadeOut(animeBox, 500, function () {
			var red1 = productBox.find(".enterBox .red1");
			var red2 = productBox.find(".enterBox .red2");
			var silver = productBox.find(".enterBox .silver");
			var black = productBox.find(".enterBox .black");
			var point = productBox.find(".enterBox .point");

			red1.show().addClass("wineMoveing1");
			red2.show().addClass("wineMoveing2");
			silver.addClass("wineMoveing3");
			black.addClass("wineMoveing4");
			
			setTimeout(() => {
				productBox.removeClass("noPointer");
				icom.fadeIn(point);
			}, 2200);
		});
	}

	/**
	 * 播放介绍页面视频
	 */
	function playIntroVideo() {
		$("#myVideo").show();
		introBox.find(".videoBox .cover").hide();
		var video = $("#myVideo")[0];
		if (os.ios) video.play();
		else {
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
		wineAnime.destroy();
	}

	/**
	 * 显示任务的页面
	 */
	function showPeopleBox() {
		peopleBox.show();
		icom.fadeOut(moreBox);

		wineAnime.VP({
			debug: false,
			autoPlay: true,
			loop: true,
			total: 10,
			time: 1,
			type: 'jpg',
			poster: "images/peopleBox/1.jpg",
			path: "images/peopleBox/",
			onPlay: function () {

			},
			onEnd: function () {

			}
		});

		peopleAnime.VP({
			debug: false,
			autoPlay: true,
			loop: true,
			total: 41,
			time: 2,
			type: 'jpg',
			poster: "images/peopleBox/peopleAnime/1.jpg",
			path: "images/peopleBox/peopleAnime/",
			onPlay: function () {

			},
			onEnd: function () {

			}
		});
	}

	/**
	 * 显示更多页面
	 */
	function showMoreBox() {
		if(showMoreFlag){
			showMoreFlag = false;
			moreBox.show();
			productBox.transition({y:"-100%"},800,function(){
				productBox.hide();
			})
		}
	}

	/**
	 * 关闭视频页面
	 */
	function closeVideoBox() {

		var box = items[nowItem];
		productBox.addClass("noPointer");
		box.find(".point").hide();
		icom.fadeOut(videoBox, 500, function () {
			videoVpBox.destroy();
			videoVpBox.empty();
			videoBox.find(".wordBox").empty();
			icom.fadeIn(box.find(".title"), 800);
		});

		if (videoPlayTimes == 3) productBox.find(".tips").hide();

		setTimeout(function () {
			productBox.removeClass("noPointer");
			if (videoPlayTimes == 3) {
				icom.fadeIn(productBox.find(".tips2"));
				showMoreFlag = true;
			}
			else showNextPro();
		}, 2000);
	}

	/**
	 * 显示下一个产品
	 */
	function showNextPro() {
		var nextId = nowItem + 1 > 2 ? 0 : nowItem + 1;
		var preId = nowItem - 1 < 0 ? 2 : nowItem - 1;

		if (!items[preId].hasClass("act")) {
			swipering({ data: { dir: -1 } });
		}
		else if (!items[nextId].hasClass("act")) {
			swipering({ data: { dir: 1 } });
		}
	}

	/**
	 * 播放视频
	 */
	function playVideo(e) {
		var that = e.data.color == "red" ? items[0] : $(this).parents(".item");
		var type = that.attr("data-val");
		var pattern = videoBox.find(".pattern");
		var time = 0;

		productBox.addClass("noPointer");
		videoBox.addClass("noPointer");

		// if(!tips.hasClass("act")){
		// 	time = 1500;
		// 	tips.addClass("act");
		// 	tips.transition({opacity:1},1000);
		// }

		setTimeout(function () {
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

				if(e.data.color == "red"){
					productBox.find(".enterBox").hide();
					productBox.find(".swiperBox").show();				
					productBox.find(".tips").show();				
				}
			});

			videoBox.find(".bg")[0].src = "images/videoBox/" + type + ".jpg";
			videoBox.find(".maskBox").removeClass("red black silver").addClass(type);
			if (type == "silver") pattern.show();
			else pattern.hide();

			videoVpBox.VP({
				debug: false,
				autoPlay: true,
				loop: true,
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

		// box.on("swipeleft", { dir: -1 }, swipering);
		// box.on("swiperight", { dir: 1 }, swipering);

		// arL.on("touchend", { dir: 1 }, swipering);
		// arR.on("touchend", { dir: -1 }, swipering);
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
			modelSrc: "model/box06.fbx",
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
					// cubeBox.addClass("scaleing");
					// cubeRotate();
					cubeAnimes[0].show().gifResume();
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
		var count = 80;
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
		var tips = animeBox.find(".tips1");
		var word = animeBox.find(".word");
		var arrow = animeBox.find(".arrow");
		var reasonTips = animeBox.find(".reasonTips");

		icom.fadeIn(logo);
		// icom.fadeIn(tips);
		tips.addClass("blasting");
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
