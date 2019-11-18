/**
 * VP 
 */
(function ($) {
    //缁ф壙
    var F2xExtend = __extends;

    /**
     * VP
     */
    $.fn.VP = function (options) {

        var s = this;
        //闅忔満鐢熸垚鐨刅P鏍囪瘑ID
        var id = "VP_" + new Date().getTime() + Math.floor(Math.random()*10000);

        //灏哄
        var viewSize = {
            width: 0,
            height: 0
        };
        //loading
        var vLoading;
        //debug
        var vDebug;

        //鐢诲竷
        var stage;
        //闈㈡澘锛堟湁澶氱绫诲瀷锛�
        var view;
		
		//缂╂斁妯″紡
		var scaleModeList = [
			"noBorder","showAll","fixedWidth","fixedHeight"
		]
	
        //榛樿鍙傛暟
        var _setting = {
            debug: false, 				//鏄惁debug debug浼氭湁debug闈㈡澘鏌ョ湅杩涘害
            loop: false, 				//鏄惁寰幆
            autoPlay: false, 			//鏄惁鑷姩鎾斁
            total: 0, 					//鍥剧墖鎬绘暟
            time: 0, 					//鎾斁鏃堕暱
            audio: "", 					//闊抽鏂囦欢璺緞
            path: "", 					//鍥剧墖璺緞
            type: "jpg", 				//鍥剧墖鍚庣紑 jpg or png
            loading: null, 				//涓€涓狫Qloading瀵硅薄 鏇夸唬榛樿鐨剉Loading
							            //鎾斁绫诲瀷 
							            //1 榛樿鍥剧墖搴忓垪甯�
							            //2 甯﹂煶棰戠殑锛堝鏋滄鏌ユ湪鏈夐煶棰戣嚜鍔ㄧ敤1绫诲瀷锛�
            mode: 1,
            scaleMode: "noBorder",		//缂╂斁妯″紡
            onInit: function(){},		//鍒濆鍖栧ソ鍥炶皟
            onLoaded: function(){},		//绱犳潗鍔犺浇瀹屾垚鍥炶皟
            onPlay: function(){},   	//寮€濮嬫挱鏀惧洖璋�
            onPause: function(){},  	//鏆傚仠鎾斁鍥炶皟
            onEnd: function(){},     	//缁撴潫鎾斁鍥炶皟
            onFrame: function(){}		//鎾斁涓瘡甯у洖璋�
            
        };
        $.extend(true, _setting, options);

        function init() {
            initData();
            initUI();
            addEvent();
        }
        //鍒濆鍖栨暟鎹�
        function initData() {
            viewSize.width = s.outerWidth();
            viewSize.height = s.outerHeight();
        }
        //鍒濆鍖朥I
        function initUI() {
            //娣诲姞wrap 鍜� loading
            var div = $('<div id = "' + id + '"></div>').appendTo(s);
            vLoading = $('<div class = "vLoading"><span><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span></div>').appendTo(s);
            if(_setting.loading){
            	vLoading = _setting.loading;
            }
            vLoading.hide();

            var divW = viewSize.width;
            var diwH = viewSize.height;
            div.css({
                width: divW,
                height: diwH,
                position: "relative",
                overflow: "hidden"
            });

            //鐢熸垚canvas
            stage = new annie.Stage(id, divW, diwH, 60, annie.StageScaleMode.NO_BORDER, 0);
            stage.addEventListener(annie.Event.INIT_TO_STAGE, function (e) {
                initView();
            });
			//debug妯″紡鏄剧ずdebug
            if (_setting.debug) {
                vDebug = $('<div></div>').css({
                    position: "absolute",
                    left: 0,
                    top: "0.5rem",
                    padding: "0.1rem",
                    background: "#fff",
                    color: "#000"
                }).html('debug').appendTo(div);
            }
        }
        //娉ㄥ唽浜嬩欢
        function addEvent() {
            globalDispatcher.addEventListener(id + "debug", _debug);
            globalDispatcher.addEventListener(id + "play", _play);
            globalDispatcher.addEventListener(id + "pause", _pause);
            globalDispatcher.addEventListener(id + "end", _end);
            globalDispatcher.addEventListener(id + "loading", _loading);
            if (s.find('.close').length > 0) {
                s.find('.close').one('click', function () {
                    view.destroy();
                });
            }
        }
        //杩欐槸鍏ㄥ眬浜嬩欢
        function _debug(e){
            updateDebug(e.data);
        }
        function _play(e){
            _setting.onPlay();
        }
        function _pause(e){
            _setting.onPause();
        }
        function _end(e){
        	vLoading.hide();
            _setting.onEnd();
        }
        function _loading(e){
            if(e.data){
                // if(!os.weibo) vLoading.show()
            }else{
                vLoading.hide();
            }
        }
        //绉婚櫎浜嬩欢
        function removeEvent() {
            globalDispatcher.removeEventListener(id + "debug", _debug);
            globalDispatcher.removeEventListener(id + "play", _play);
            globalDispatcher.removeEventListener(id + "pause", _pause);
            globalDispatcher.removeEventListener(id + "end", _end);
            globalDispatcher.removeEventListener(id + "loading", _loading);
            if (s.find('.close').length > 0) {
                s.find('.close').off('click');
            }
            stage.kill();
        }
        //鍒濆鍖朥I 鐩墠鏈変袱绉嶆ā寮� 
        //鏃犲０鍜屾湁澹�
        function initView() {
            switch (_setting.mode) {
                case 1:
                    view = new frameView.FrameView(_setting);
//                  vLoading.show();
                    break;
                case 2:
                    view = new audioFrameView.AudioFrameView(_setting);
//                  vLoading.show();
                    break;

                default:
                    break;
            }
            view.id = id;
            view.viewSize = viewSize;
            stage.addChild(view);
            view.parse(function () {
            	_setting.onInit();
                if (_setting.autoPlay) {
                    view.play();
                }
            });
            s.view = view;
        }

        function updateDebug(value) {
            if (vDebug) {
                vDebug.html(value);
            }
        }

        //======================================================
	
		//鎾斁
        s.play = function () {
            view.play();
        }
        //鏆傚仠
        s.pause = function(){
        	view.pause();
        }
        s.gotoAndStop = function(value){
            view.gotoAndStop(value);
        }
        s.gotoAndPlay = function(value){
            view.gotoAndPlay(value);
        }
        /**
         * 璁剧疆缂╂斁妯″紡
         * @param {string} value  "noBorder","showAll","fixedWidth","fixedHeight"
         * */
        s.scaleMode = function(value){
        	if(_setting.scaleMode != value){
        		var index = scaleModeList.indexOf(value);
        		if(index == -1){
        			console.warn("缂╂斁妯″紡:" + value + "涓嶅瓨鍦�");
        		}else{
        			_setting.scaleMode = value;
        			view.isResize = false;
        			view.resize();
        		}
        		
        	}
        	
        }
        /**
         * 闊抽噺澶у皬锛屼粠0-1 鍦╥os閲� volume鍙兘鏄�0 鎴栬€�1锛屽叾浠栨棤鏁�
         * */
        s.volume = function(value){
        	if(_setting.mode == 2){
        		view.volume(value);
        	}
        }
        s.muted = function(muted){
        	if(_setting.mode == 2){
        		view.muted(muted);
        	}
        }
        s.loadImg = function(){
        	view.loadImgs();
        }
        //閿€姣�
        s.destroy = function () {
            if (view) {
                removeEvent();
                view.destroy();
                view = null;
            }
        }

        //======================================================
        init();

        return s;

    }

    //image loader
    var ImageLoader = function (id, url, callback) {
        var s = this;
        var loader = null;
        var img;
        s.id = id;
        s.type = "load";
        img = s.img = new Image();
        var onLoad = function () {
            callback(s);
            cleanup();
        };

        var onError = function () {
            callback(s, 'on error');
            cleanup();
        };

        var cleanup = function () {
            s.unbind('load', onLoad);
            s.unbind('error', onError);
        };

        s.start = function () {
            s.bind('load', onLoad);
            s.bind('error', onError);
            s.img.src = url;
            if (img.complete || img.readyState == "complete" || img.readyState == "loaded") {
                s.type = "cache";
                onLoad();
            }
        }
        s.bind = function (eventName, eventHandler) {
            s.img.addEventListener(eventName, eventHandler, false);
        };
        s.unbind = function (eventName, eventHandler) {
            s.img.removeEventListener(eventName, eventHandler, false);
        };
    }

    /**
     * baseView鏄剧ず鍩虹被
     */
    var baseView = baseView || {};
    baseView.BaseView = function () {
        var s = this;
        s.isResize = false;
        s.ui = null;
        s.isDestroy = false;
        F2xContainer.call(s);
        s.initUI();
    }
    F2xExtend(baseView.BaseView, F2xContainer);
    //ui鍒濆鍖�
    baseView.BaseView.prototype.initUI = function () {
        var s = this;
        s.ui = new annie.Bitmap();
        s.addChild(s.ui);
    }
    //閲嶇疆鍥剧墖灏哄
    baseView.BaseView.prototype.resize = function (w, h) {
        var s = this;
        if (s.stage && !s.isResize) {
            s.isResize = true;
            w = w || s.fW;
            h = h || s.fH;
//          if (window.innerWidth == s.viewSize.width && window.innerHeight == s.viewSize.height) {
                var scaleX = scaleY = 0;
                var sW = s.viewSize.width;
                var sH = s.viewSize.height;
                var vW = w;
                var vH = h;
                scaleX = sW / vW;
                scaleY = sH / vH;
                switch (s.options.scaleMode){
                	case 'noBorder':
                		if (scaleX > scaleY) {
                            scaleY = scaleX;
                        }
                        else {
                            scaleX = scaleY;
                        }
                		break;
                	case "showAll":
                        if (scaleX < scaleY) {
                            scaleY = scaleX;
                        }
                        else {
                            scaleX = scaleY;
                        }
                        break;
                    case "fixedWidth":
                        scaleY = scaleX;
                        break;
                    case "fixedHeight":
                        scaleX = scaleY;
                        break;
                	default:
                		break;
                }
                s.ui.scaleX = scaleX;
                s.ui.scaleY = scaleY;
                s.ui.x = (sW - s.ui.width) * 0.5;
                s.ui.y = (sH - s.ui.height) * 0.5;
//          } else {
//              s.ui.width = s.viewSize.width;
//              s.ui.height = s.viewSize.height;
//          }
        }
    }
    //鏇存柊鍥剧墖璧勬簮
    baseView.BaseView.prototype.updateView = function (value) {
        var s = this;
        // console.log(value);
        s.ui.bitmapData = value;
    }
    //涓嬮潰鐨勬柟娉曟槸缁欏瓙绫荤户鎵跨殑
    baseView.BaseView.prototype.parse = function () {}
    baseView.BaseView.prototype.play = function () {}
    baseView.BaseView.prototype.pause = function () {}
    baseView.BaseView.prototype.stop = function () {}
    baseView.BaseView.prototype.gotoAndStop = function () {}
    baseView.BaseView.prototype.gotoAndPlay = function () {}
    baseView.BaseView.prototype.destroy = function () {
        var s = this;
        s.isDestroy = true;
    }

    /**
     * frameView 搴忓垪甯�
     */
    var frameView = frameView || {};
    frameView.FrameView = function (options) {
        var s = this;
        s.options = options;
        //鏄惁鎾斁
        s.isPlay = false;
        //鏄惁鍦ㄥ姞杞界礌鏉�
        s.isLoad = false;
        //鏄惁loading涓�
        s.loading = 0;
        //褰撳墠鍔犺浇鎬昏繘搴�
        s.loaded = 0;
        //缂撳瓨鏁版嵁
        s.cache = [];
        //time
        s.timeid = null;
        //閫熷害 鏍规嵁total鍜宼ime璁＄畻鍑烘潵鐨�
        s.speed = 10;
        //褰撳墠绗嚑寮�
        s.index = 0;
        //搴忓垪鎬婚暱搴�
        s.total = 0;
        baseView.BaseView.call(s);
    }
    F2xExtend(frameView.FrameView, baseView.BaseView);
    frameView.FrameView.prototype.poster = function (value) {
        var s = this;
        if (value && value != "") {
            var img = new Image();
        }
    }
    //娉ㄥ唽璁℃椂鍣�
    frameView.FrameView.prototype.regTime = function () {
        var s = this;
        s.go();
        s.timeid = setInterval(s.go.bind(this), 1000 / s.speed);
        console.log('regTime');
//      var time = 1000 / s.speed;
//      var d = new Date().getTime();
//      var frameFunc = function(){
//      	var left = new Date().getTime() - d;
//      	if(left >= time){
//      		d = new Date().getTime();
//      		s.go();
//      	}
//      	s.timeid = requestAnimationFrame(frameFunc);
//      }
//      frameFunc();
        
    }
    //绉婚櫎璁℃椂鍣�
    frameView.FrameView.prototype.clearTime = function () {
        var s = this;
        if (s.timeid) {
//      	cancelAnimationFrame(s.timeid);
            clearInterval(s.timeid);
            s.timeid = null;
        }
        // console.log('clearTime');
    }
    //璺戣捣鏉�
    frameView.FrameView.prototype.go = function () {
        var s = this;
        if (isNaN(s.index)) {
            s.index = 0;
        }
        var curIndex = s.index;
        var cache = s.cache;
        var loaded = s.loaded;
        var total = s.total;
        var loading = s.loading;
        //杩欓噷鏈変釜閫昏緫澶勭悊 灏辨槸瑕佹樉绀虹殑鍥剧墖绱㈠紩澶т簬褰撳墠缂撳瓨鐨勫氨鍋滄 绛夊緟鍔犺浇鐨勫浘鐗�
        if (curIndex >= cache.length && loaded >= total && total != 0) {
            s.isPlay = false;
            s.updateView(s.cache[cache.length - 1].img);
            s._end();
        } else if (curIndex < cache.length && loading == 0) {
			try{
				s.updateView(s.cache[curIndex].img);
			}catch(e){
				
			}
            s.index++;
            if(curIndex < s.cache.length-1)globalDispatcher.dispatchEvent(s.id + "debug", s.loaded + ":" + s.total + ":" + s.index + ":" + s.cache[curIndex].type);
        } else {
            if (loading == 1) {
                var loadto = curIndex + 10;
                if (loadto > total) {
                    loadto = total;
                }
                if (loaded >= loadto) {
            		globalDispatcher.dispatchEvent(s.id + "loading", false);
                    s.loading = 0;
                }
            } else {
            	
            	globalDispatcher.dispatchEvent(s.id + "loading", true);
                s.loading = 1;
            }
        }
        s.options.onFrame(curIndex);
    }
    //杞崲鍥剧墖url鍦板潃
    frameView.FrameView.prototype.getPath = function (id) {
        var s = this;
        var options = s.options;
        return options.path + id + "." + options.type;
    }
    //鍔犺浇鍥剧墖锛堟槸鍔犺浇鎵€鏈夛級
    frameView.FrameView.prototype.loadImgs = function () {
        var s = this;
        if (s.isLoad || s.isDestroy) return;
        var max = 25;
        var index = 0;
        if (!s.isLoad) {
            s.isLoad = true;
        }
        s.loaded = 0;
        var ld = function () {
            var len = s.loaded + max;
            var k = s.cache.length;
            if (len > s.total) {
                len = s.total;
                max = len - k;
                console.log('last');
            }
            for (var i = k; i < len; i++) {
                // console.log(s.getPath(i));
                var imgLoader = new ImageLoader(i, s.getPath(i + 1), function (loader) {
                    index++;
                    s.loaded++;
                    s.cache[loader.id] = loader;
                    if (index == max) {
                        index = 0;
                        if (s.loaded < s.total) {
                            // console.log("鍔犺浇瀹屾垚涓€缁勶細" + s.loaded);
                            if (!s.isDestroy) ld();
                        } else {
                        	//鍔犺浇瀹屾垚浜嬩欢
                        	s.options.onLoaded();
                            // console.log('load all锛�' + s.cache.length);
                        }
                    }
                });
                imgLoader.start();
            }
        }
        ld();
    }
    //閲嶅啓gotoandstop
    frameView.FrameView.prototype.gotoAndStop = function (value) {
        var s = this;
        s.updateView(s.cache[value].img);
    }
    frameView.FrameView.prototype.gotoAndPlay = function (value) {
        var s = this;
        s.index = value;
        s.play();
    }
    //鍐呴儴end浜嬩欢
    frameView.FrameView.prototype._end = function () {
        var s = this;
        s.clearTime();
        if (s.options.loop) {
            s.index = 0;
            s.isPlay = false;
            s.play();
        } else {
            globalDispatcher.dispatchEvent(s.id + "end");
        }

    }
    //瑙ｆ瀽涓€涓嬬礌鏉� 鐪嬬湅鏄惁鏈塸oster鍥剧墖 resize灏哄
    frameView.FrameView.prototype.parse = function (callback) {
        var s = this;
        var options = s.options;
        //鍏堟斁涓€寮犻瑙堝浘 榛樿鏀剧涓€寮� 濡傛灉鏈夋寚瀹氬浘鐗囧氨鏀炬寚瀹氬浘鐗�
        var showUrl = s.getPath(1);
        s.cache = [];
        s.total = options.total;
        s.speed = options.total / options.time;
        if (options.poster && options.poster != "") {
            showUrl = options.poster;
        }
        var imgLoader = new ImageLoader(0, showUrl, function (loader) {
            s.updateView(loader.img);
            s.fW = loader.img.width;
            s.fH = loader.img.height;
            s.resize(loader.img.width, loader.img.height);
            callback();
        });
        imgLoader.start();
    }
    //鎾斁
    frameView.FrameView.prototype.play = function () {
        var s = this;
        if (!s.isPlay) {
            s.isPlay = true;
            s.clearTime();
            s.regTime();
            //寮€濮嬪姞杞藉浘鐗�
            s.loadImgs();
            globalDispatcher.dispatchEvent(s.id + "play");
        }
    }
    //鏆傚仠
    frameView.FrameView.prototype.pause = function () {
        var s = this;
        if (s.isPlay) {
            s.isPlay = false;
            s.clearTime();
            globalDispatcher.dispatchEvent(s.id + "pause");
        }
    }
    //閿€榄�
    frameView.FrameView.prototype.destroy = function () {
        var s = this;
        if (!s.isDestroy) {
            s.isDestroy = true;
            s._end();
            s.cache = [];
        }
    }

    /**
     * 甯跺０闊崇殑搴忓垪甯� 缁ф壙鑷棤澹板簭鍒楃被
     */
    var audioFrameView = audioFrameView || {};
    audioFrameView.AudioFrameView = function (options) {
        var s = this;
        frameView.FrameView.call(s, options);
        s.addEventListener(annie.Event.ADD_TO_STAGE, s.addToStage.bind(s));
        
    }
    F2xExtend(audioFrameView.AudioFrameView, frameView.FrameView);
    audioFrameView.AudioFrameView.prototype.addToStage = function () {
        var s = this;
        //褰撳墠鏃堕棿
        s.curTime = 0;
        s.oldIndex = -1;
        s.isPlayAudio = false;
        s.removeEventListener(annie.Event.ADD_TO_STAGE, s.addToStage);
        s.initAudio();
    }
    //鍒濆鍖栭煶棰�
    audioFrameView.AudioFrameView.prototype.initAudio = function () {
        var s = this;
        s.vAudio = null;
        s.audio = null;
        s.audioLoading = 0;
        s.oldTime = 0;
        s.vAudio = $('<audio controls="controls"></audio>').css({
            position: "absolute",
            width: "90%",
            left: "50%",
            bottom: "5%",
            x: "-50%"

        }).appendTo($("#" + s.id)).hide();
        s.vAudio.attr('src', s.options.audio);
        s.audio = s.vAudio[0];
//      s.audio.addEventListener("timeupdate", s.audioTimeUpdate.bind(s));
        s.audio.addEventListener('play', s.audioPlay.bind(s));
        // audio.addEventListener('pause', audioPause);
        s.audio.addEventListener('ended', s.audioEnd.bind(s));
    }
	audioFrameView.AudioFrameView.prototype.checkPlay = function(){
		var s = this;
		//妫€娴嬪０闊崇殑绱㈠紩
        var fuc = function(){
        	var audio = s.audio;
        	var currentTime = parseInt(audio.currentTime * 100);
        	var duration = parseInt(audio.duration * 100);
            // console.log("currentTime:" + currentTime);
            s.index = Math.floor(s.options.total * currentTime / duration);
//      	console.log(s.index);
//			if(s.oldTime != currentTime){
//				if(s.oldTime > currentTime){
//					console.log(s.oldTime + ":" + currentTime);
//				}
//				s.oldTime = currentTime;
//			}
            if(s.index > (s.options.total - 1)){
                s.index = s.options.total - 1
            }
            if(s.cache.length > 0 && s.index < (s.cache.length-1) && s.index > 0 && s.options.debug){
                globalDispatcher.dispatchEvent(s.id + "debug", s.loaded + ":" + s.total + ":" + (s.index+1) + ":" + s.cache[s.index-1].type + ":" + audio.currentTime +":"+ audio.duration);
            }
        }
        fuc();
        s.checkId = setInterval(function(){
			if(s.isPlay)fuc();        	
        },50);
	}
    //闊抽鎾斁浜嬩欢
    audioFrameView.AudioFrameView.prototype.audioPlay = function(){
        var s = this;
//      s.clearTime();
//      trace('audioPlay');
//      s.regTime();
    }
    //闊抽缁撴潫浜嬩欢
    audioFrameView.AudioFrameView.prototype.audioEnd = function(){
        var s = this;
        globalDispatcher.dispatchEvent(s.id + "debug", s.loaded + ":" + s.total + ":" + (s.index+1) + ":" + s.cache[s.index].type + ":" + s.audio.currentTime +":"+ s.audio.duration);
        s._end();
        if(s.checkId){
        	clearInterval(s.checkId);
        	s.checkId = null;
        }
    }
    //闊抽鐪熺殑鎾斁锛堝唴閮ㄦ柟娉曪級
    audioFrameView.AudioFrameView.prototype._realPlay = function(){
        var s = this;
        s.audio.play();
        var durFunc = function(){
            if (isNaN(s.audio.duration)) {
                setTimeout(durFunc,10);
            }else{
                s.isPlayAudio = true;
                var duration = parseInt(s.audio.duration * 100);
                var time = (s.index+1) * duration / s.options.total / 100;
                console.log(time);
                console.log(s.audio.currentTime);
                s.audio.currentTime = time;
                s.checkPlay();
            }
        }
        setTimeout(durFunc,300);
        globalDispatcher.dispatchEvent(s.id + "play");
    }
    audioFrameView.AudioFrameView.prototype._parseNoAudio = function(){
    	var s = this;
        var audio = s.audio;
        s.index++;
        console.log("_parseNoAudio:" + s.index);
        if(s.index < s.cache.length)s.updateView(s.cache[s.index].img);
    }
    audioFrameView.AudioFrameView.prototype._parseHasAudio = function(){
    	var s = this;
        var audio = s.audio;
    	//杩欓噷鏈変釜閫昏緫澶勭悊涓€涓�
        //鍥犱负瑕佷繚璇侀煶棰戝悓姝� 鍥犳鍥剧墖鐨勬挱鏀炬槸鏍规嵁澹伴煶鐨勬椂闂存潵澶勭悊鐨�
        //濡傛灉澹伴煶鎾斁鍒版煇涓€鍒� 浣嗘槸鍥剧墖鏈ㄦ湁鍔犺浇鍒板氨闇€瑕佹殏鍋滅瓑寰�
        //鐩墠鐨勭瓥鐣ユ槸绛夊緟闊抽鐨�5绉掓椂闂�
//      console.log(s.index);
        if (audio.paused || audio.seeking) {
            globalDispatcher.dispatchEvent(s.id + "loading", true);
            if (s.index == 0) {
                if (s.loaded > 15) {
                    s.updateView(s.cache[0].img); //鍥犱负绗竴甯ф槸榛戝睆锛屾墍浠ヨ棰戝姞杞戒腑鐨勬椂鍊欐樉绀虹1甯х敾闈€�
                    audio.play();
                }
            } else {
                if (s.index >= s.cache.length) {
                    s.index = s.cache.length - 1;
                }
                
                if (s.audioLoading == 1) {
                    var loadto = s.index + s.speed * 2;
                    if (loadto > s.options.total) {
                        loadto = s.options.total;
                    }
                    if (s.loaded >= loadto) {
                        s.audioLoading = 0;
                        //褰撳姞杞藉浘鐗囨暟瓒呰繃mp3鎾斁甯ф暟锛屽苟棰勫姞杞藉畬涔嬪悗鐨�5绉掞紝缁х画鎾斁
                		globalDispatcher.dispatchEvent(s.id + "loading", false);
                        audio.play();
                        s.updateView(s.cache[s.index].img);
                    }
                }else{
                    audio.play();
                    s.updateView(s.cache[s.index].img);
                }
            }
        } else {
            if (s.index >= 0) {
                globalDispatcher.dispatchEvent(s.id + "loading", false);
                if (s.index > s.loaded) {
                    //褰搈p3鎾斁甯ф暟瓒呰繃鍥剧墖鍔犺浇鐨勬暟閲忓悗
                    audio.pause();
                	globalDispatcher.dispatchEvent(s.id + "loading", true);
                    s.audioLoading = 1;
                }
//              s.curTime = 0;
                var m = parseInt(s.index + s.curTime);
//              console.log(s.curTime);
//              if(m > s.oldIndex){
                	s.oldIndex = m;
                	if(s.cache[m]){
	                	s.updateView(s.cache[m].img);
	                }
//              }
                
//              s.curTime += 1.2;
            } else {
                s.updateView(s.cache[0].img)
            }
        }
    }
    //閲嶅啓璺戣捣鏉� 鍥犱负澶氫簡涓€涓煶棰戣鍚屾
    audioFrameView.AudioFrameView.prototype.go = function () {
        var s = this;
        if (isNaN(s.index)) {
            s.index = 0;
        }
        if(s.cache.length == 0){
            return;
        }
        //鍦ㄨ繕娌℃湁鎾斁闊抽鐨勬椂鍊�
        //杩欓噷鏈変釜灏忛棶棰� 灏辨槸褰撳０闊宠繕娌℃湁寮€濮嬫挱鏀剧殑鏃跺€欏浘鐗囧厛璧拌捣鏉� 绛夊０闊崇湡鏉ヤ簡 灏辩敤澹伴煶鐨勬柟寮忔挱鏀�
//      if(!s.isPlayAudio){
//      	s._parseNoAudio();
//      }else{
        	s._parseHasAudio();
//      }
        
        s.options.onFrame(s.index);
    }
    //閲嶅啓鎾斁
    audioFrameView.AudioFrameView.prototype.play = function(){
        var s = this;
        if (!s.isPlay && s.audio) {
            s.isPlay = true;
            if(os.weixin){
                try {
                    window.WeixinJSBridge.invoke("getNetworkType", {}, function () {
                        s._realPlay();
                    });
                } catch (e) {
                    if(!os.weixin){
                         s._realPlay();
                    }else{
                        wx.ready(function  () {
                            s._realPlay();
                        })
                    }
                    
                }
            }else{
                s._realPlay();
            }
            

            // if (wsb.WeixinJSBridge) {
            //     try {
            //         wsb.WeixinJSBridge.invoke("getNetworkType", {}, function () {
            //             s._realPlay();
            //              alert(2)
            //         });
            //     } catch (e) {
            //         wx.ready(function  () {
            //             alert(1)
            //              s._realPlay();
            //         })
            //     }
            //     var isReady = false;
            //     var gogo = function(){
            //         if(!isReady){
            //             isReady = true;
            //             s._realPlay();
            //         }
            //     }
            //     wsb.WeixinJSBridge.invoke("getNetworkType", {}, function () {
            //         gogo();
            //     });
            //     wx.ready(function  () {
            //         alert(1)
            //          s._realPlay();
            //     })
            // } else {
            //     s._realPlay();
            // }
            s.regTime();
            //寮€濮嬪姞杞藉浘鐗�
            s.loadImgs();
        }
    }
    //鏆傚仠
    audioFrameView.AudioFrameView.prototype.pause = function () {
        var s = this;
        if (s.isPlay && s.audio) {
            s.isPlay = false;
            s.clearTime();
            s.audio.pause();
            globalDispatcher.dispatchEvent(s.id + "pause");
        }
    }
    //闊抽噺
    audioFrameView.AudioFrameView.prototype.volume = function (value) {
        var s = this;
        if (s.audio) {
            s.audio.volume = value;
        }
    }
    //闈欓煶
    audioFrameView.AudioFrameView.prototype.muted = function (muted) {
        var s = this;
        if (s.audio) {
            s.audio.muted = muted;
        }
    }
    //閲嶅啓閿€姣�
    audioFrameView.AudioFrameView.prototype.destroy = function () {
        var s = this;
        if (!s.isDestroy) {
            s.isDestroy = true;
            s._end();
            s.cache = [];
            if(s.checkId){
            	clearInterval(s.checkId);
            	s.checkId = null;
            }
//          s.audio.removeEventListener("timeupdate", s.audioTimeUpdate);
            s.audio.removeEventListener('play', s.audioPlay);
            // audio.addEventListener('pause', audioPause);
            s.audio.removeEventListener('ended', s.audioEnd);
            s.audio.pause();
            s.audio = null;
        }
    }

})(jQuery);