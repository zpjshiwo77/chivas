$(document).ready(function () {

	//-----------------------------------------定义和初始化变量----------------------------------------
	var loadBox = $('aside.loadBox');
	var articleBox = $('article');
	var windowScale = window.innerWidth / 750;
	var loadPer = $("#loadingBox .per");
	var loadWord = $("#loadingBox p");

	//----------------------------------------页面初始化----------------------------------------
	icom.init(init);//初始化
	icom.screenScrollUnable();//如果是一屏高度项目且在ios下，阻止屏幕默认滑动行为

	function init() {
		requestAnimationFrame(function () {
			if (os.screenProp < 0.54) articleBox.addClass("screen189");
			if (os.screenProp > 0.64) articleBox.addClass("screen159");
			load_handler();
		});
		wxUser.init();
	}//edn func


	//----------------------------------------加载页面图片----------------------------------------
	function load_handler() {
		var loader = new PxLoader();
		loader.addImage('images/loadingBox/bg.jpg');
		loader.addImage('images/loadingBox/logo.png');

		loader.addCompletionListener(function () {
			icom.fadeIn(articleBox);
			load_more();
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
		loader.addImage('images/peopleBox/1.png');
		loader.addImage('images/peopleBox/10.png');
		loader.addImage('images/peopleBox/2.png');
		loader.addImage('images/peopleBox/3.png');
		loader.addImage('images/peopleBox/4.png');
		loader.addImage('images/peopleBox/5.png');
		loader.addImage('images/peopleBox/6.png');
		loader.addImage('images/peopleBox/7.png');
		loader.addImage('images/peopleBox/8.png');
		loader.addImage('images/peopleBox/9.png');
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
		animeBox.hide();
		showIntroBox();
	}

	/**
	 * 事件初始化
	 */
	function eventInit() {
		$(".limitBtn").on("touchend", limitClick);

		cubeBox.on("touchstart", Prevent);
		cubeBox.on('touchstart', this_touchstart);
		cubeBox.on('click', showProductBox);

		productBox.find(".item").on("click", playVideo);

		moreBox.find(".btn").on("touchend", showPeopleBox);

		peopleBox.find(".btn").on("touchend", showWineBox);

		wineBox.find(".btn").on("touchend", showIntroBox);

		videoBox.find(".close").on("touchend", closeVideoBox);

		introBox.find(".videoBox").one("touchend", playIntroVideo);
		introBox.find(".btn").one("touchend", jumpOther);
	}

	/**
	 * 跳转其他链接
	 */
	function jumpOther() {
		if (window.__wxjs_environment === 'miniprogram') {
			wx.miniProgram.redirectTo({ url: '/path/to/page' })
		}
		else {
			location.replace("http://t.sky.be-xx.com/2019/chivas-cday-h5/second/sale.html");
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
		video.play();
	}

	/**
	 * 显示介绍页面
	 */
	function showIntroBox() {
		introBox.show();
		icom.fadeOut(wineBox);
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
			loop: true,
			total: 10,
			time: 1.5,
			type: 'png',
			poster: "images/peopleBox/1.png",
			path: "images/peopleBox/",
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
	}

	/**
	 * 播放视频
	 */
	function playVideo() {
		var that = $(this);
		var type = that.attr("data-val");
		var pattern = videoBox.find(".pattern");

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
		});

		productBox.addClass("noPointer");
		videoBox.addClass("noPointer");
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
				if (!that.hasClass("act")) {
					that.addClass("act");
					videoPlayTimes++;
				}
			},
			onEnd: function () {
				videoVpBox.destroy();
			}
		});
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
			modelSrc: "model/box04.fbx",
			ambColor: 0xffffff,
			spotLight: true,
			pointLight: true,
			control: false,
			onComplete: function () {
				imodel.changModelPos(0.3, 0, -0.5);
			}
		};

		imodel.init("cubeBox", opts);
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
				}, 4000)
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
