$(document).ready(function(){
	
	//-----------------------------------------定义和初始化变量----------------------------------------
	var loadBox=$('aside.loadBox');
	var articleBox=$('article');
	var windowScale=window.innerWidth/750;
	
	//----------------------------------------页面初始化----------------------------------------
	icom.init(init);//初始化
	icom.screenScrollUnable();//如果是一屏高度项目且在ios下，阻止屏幕默认滑动行为
	
	function init(){
		requestAnimationFrame(function(){
			if(os.screenProp < 0.54) articleBox.addClass("screen189");
			if(os.screenProp > 0.64) articleBox.addClass("screen159");
			load_handler();
		});
		wxUser.init();
	}//edn func
	

	//----------------------------------------加载页面图片----------------------------------------
	function load_handler(){
		var loader = new PxLoader();
		loader.addImage('images/common/turn_phone.png');
		
		//实际加载进度
//		loader.addProgressListener(function(e) {
//			var per=Math.round(e.completedCount/e.totalCount*50);
//			loadPer.html(per+'%');
//		});
		
		loader.addCompletionListener(function() {
			icom.fadeIn(articleBox);
			pageInit();
//			load_timer(50);//模拟加载进度
			loader=null;
		});
		loader.start();	
	}//end func
	
	//模拟加载进度
	function load_timer(per){
		per=per||0;
		per+=imath.randomRange(1,3);
		per=per>100?100:per;
		loadPer.html(per+'%');
		if(per==100) setTimeout(pageInit,200);
		else setTimeout(load_timer,33,per);
	}//edn func
	
	//----------------------------------------页面逻辑代码----------------------------------------
	var animeBox = $("#animeBox");
	var cubeBox = $("#cubeBox");
	var animeBg = $("#animeBg");
	var tipsBox = $("#tipsBox");
	var privacyBox = $("#privacyBox");
	
	var ruleScroll = new IScroll('#ruleScroll', {
		bounce: false,
		click: true
	});
	var imodel;
	var posLast = [];

	/**
	 * 页面初始化
	 */
	function pageInit(){
		eventInit();
		// DevelopTest();
		monitor_handler();
		privacyInit();
		animeBgInit();
		modelInit();
	}//end func
	
	/**
	 * 开发测试使用
	 */
	function DevelopTest(){
		loadingBox.hide();
		QABox.show();
	}

	/**
	 * 事件初始化
	 */
	function eventInit(){
		$(".limitBtn").on("touchend",limitClick);
		cubeBox.on("touchstart",Prevent);
		cubeBox.on('touchstart', this_touchstart);
	}

	/**
	 * 阻止事件冒泡
	 */
	function Prevent(e){
		e.stopPropagation();
		e.preventDefault();
		animeBox.find(".tips").hide();
	}

	/**
	 * 隐私初始化
	 */
	function privacyInit(){
		$("#ruleScroll .scrollBox").load("privacy.html?v=" + Math.random(), function() {
            ruleScroll.refresh();
        });
	}

	/**
	 * 模型初始化
	 */
	function modelInit(){
		imodel = new ThreeDmodel();
        var opts = {
            modelSrc: "model/box03.fbx",
            ambColor: 0xffffff,
			spotLight: true,
			pointLight: true,
			control: false,
            onComplete: function () {
                imodel.changModelPos(0.3,0,-0.5);
            }
        };

        imodel.init("cubeBox", opts);
	}

	/**
	 * 动画背景初始化
	 */
	function animeBgInit(){
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
			//		            audio:"images/self/audio.mp3",
			path: "images/anime/join_",
			onPlay: function() {
				setTimeout(function(){
					cubeBox.addClass("scaleing");
					cubeRotate();
				},4000)
			},
			onEnd: function() {
				animeBg.destroy();
				indexBoxShow();
			}
		});
	}

	/**
	 * 立方体旋转
	 */
	function cubeRotate(){
		var count = 63;
		var unit = (-Math.PI * 1 - 0.9) / count; 

		function rotating(){
			count--;
			imodel.changModelPos(0,unit,0);
			requestAnimationFrame(function(){
				if(count > 0) rotating();	
			})
		}
		rotating();
	}

	/**
	 * 首页显示
	 */
	function indexBoxShow(){
		var logo = animeBox.find(".logo");
		var tips = animeBox.find(".tips");
		var word = animeBox.find(".word");
		var arrow = animeBox.find(".arrow");
		var reasonTips = animeBox.find(".reasonTips");

		icom.fadeIn(logo);
		icom.fadeIn(tips);
		icom.fadeIn(word);
		icom.fadeIn(arrow);
		icom.fadeIn(reasonTips);

		icom.fadeOut(animeBg);
		cubeBox.removeClass("noPointer");
	}

	/**
	 * 限制点击
	 */
	function limitClick(){
		$(".limitBtn").addClass('noPointer');
		setTimeout(function(){$(".limitBtn").removeClass('noPointer')},500);
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
        imodel.changModelPos(rtaX, rtaY,0);
        posLast[0] = e.originalEvent.touches[0].clientX;
        posLast[1] = e.originalEvent.touches[0].clientY;
    }//end func

    function this_touchend(e) {
        $(this).off('touchmove');
    }//end func
	
	//----------------------------------------页面监测代码----------------------------------------
	function monitor_handler(){
//		imonitor.add({obj:$('a.btnTest'),action:'touchstart',category:'default',label:'测试按钮'});
	}//end func
});//end ready
