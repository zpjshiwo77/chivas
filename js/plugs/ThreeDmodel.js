var ThreeDmodel = function () {
	var _self = this;
	var box;
	var iTF, scene, camera, renderer, mesh, geo, imodel;
	var controls;
	var ambLight, spotLight;
	var loader;
	var renderFlag = true;
	var clickCallback = null;
	var clickObjs = [];
	var defaultOpts = {
		modelSrc: 'models/qingwa01.fbx',
		ambColor: 0xaaaaaa,
		control: false,
		spotLight: false,
		cameraPos: {
			x: 0,
			y: 0,
			z: 110
		},
		onComplete: function () { }
	};

	//初始化
	_self.init = function (name, opts) {
		defaultOpts = $.extend(defaultOpts, opts);
		box = $("#" + name);

		setScene();
		setCamera();
		setRenderer();

		// 调试
		window.scene = scene;
		window.THREE = THREE;

		loadModels(defaultOpts.modelSrc, renderScene);
	}//end func

	/**
	 * 事件绑定
	 */
	_self.on = function (event, func) {
		if (event == "click") clickCallback = func;
	}

	//改变模型位置
	_self.changModelPos = function (x, y, z) {
		mesh.rotation.x += x;
		mesh.rotation.y += y;
		mesh.rotation.z += z;
	}//end func

	//销毁
	_self.destroy = function () {
		renderFlag = false;
		scene.remove(imodel);
		scene.remove(ambLight);
		scene.remove(spotLight);
		setTimeout(function () {
			imodel = null;
			mesh = null;
			loader = null;
			ambLight = null;
			spotLight = null;
			geo = null;
			scene = null;
			camera = null;
			renderer = null;
			iTF = null;
			box.children().remove();
		}, 100);
	}//end func

	//设置场景
	function setScene() {
		scene = new THREE.Scene();
	}//end func

	//设置相机
	function setCamera() {
		camera = new THREE.PerspectiveCamera(7, box.width() / box.height(), 1, 10000);
		camera.position.x = defaultOpts.cameraPos.x;
		camera.position.y = defaultOpts.cameraPos.y;
		camera.position.z = defaultOpts.cameraPos.z;
	}//end func

	//设置渲染器
	function setRenderer() {
		var options = {
			alpha: true,					//是否可以设置背景色透明
			antialias: true,				//是否开启反锯齿
			clearColor: 0x000000,			//默认背景色
			depth: true,					//?
			logarithmicDepthBuffer: false,	//?
			precision: "highp",				//着色精度选择
			premultipliedAlpha: false,		//?
			preserveDrawingBuffer: false,	//是否保存绘图缓冲
			stencil: true,
			alpha: true
		}
		renderer = new THREE.WebGLRenderer(options);
		renderer.setSize(box.width(), box.height());
		box[0].appendChild(renderer.domElement);
		renderer.setClearColor(0x000000, 0);
	}//end func

	//加载模型
	function loadModels(model, callback) {
		loader = new THREE.FBXLoader();

		loader.load(model, function (object) {
			object.traverse(function (child) {
				if (child instanceof THREE.Mesh) {
					mesh = child;
					geo = child.geometry;
					geo.computeBoundingBox();
					geo.center();
					// child.castShadow = true;
					// child.material.transparent = true;
					// child.material.opacity = 0;
					clickObjs.push(mesh);
				}
			});
			imodel = object;
			scene.add(imodel);
			if (callback) callback();
			defaultOpts.onComplete();
			initThreeClickEvent();
		}, onProgress);

		//加载进度
		function onProgress(xhr) {

		}//end func

	}//end func

	/**
	 * 初始化场景点击事件
	 */
	function initThreeClickEvent() {
		//点击射线
		var raycaster = new THREE.Raycaster();
		var mouse = new THREE.Vector2();
		box.on("click", boxClickSence)
		function boxClickSence(event) {
			event.preventDefault();
			var x = event.clientX;
			var y = event.clientY - (window.innerHeight / 2 - (5.1 * window.innerWidth / 750 * 100));
			mouse.x = (x / renderer.domElement.clientWidth) * 2 - 1;
			mouse.y = -(y / renderer.domElement.clientHeight) * 2 + 1;

			raycaster.setFromCamera(mouse, camera);

			//总结一下，这里必须装网格，mesh，装入组是没有效果的
			//所以我们将所有的盒子的网格放入对象就可以了
			// 需要被监听的对象要存储在clickObjs中。
			var intersects = raycaster.intersectObjects(clickObjs);

			if (intersects.length > 0) {
				// console.log(intersects)
				// console.log(intersects[0].faceIndex)
				if(clickCallback) clickCallback(intersects[0].faceIndex);
			}

		}
	}

	//渲染场景
	function renderScene() {
		if (defaultOpts.control) sceneControls();
		addAmbLight(defaultOpts.ambColor);
		if (defaultOpts.spotLight) addSpotLight();
		if (defaultOpts.pointLight) addPointLight();
		run();
	}//end func

	//运行
	function run() {
		if (renderFlag) {
			requestAnimationFrame(run);
			//渲染
			renderer.render(scene, camera);
		}
	}//end func

	//场景控制
	function sceneControls() {
		controls = new THREE.OrbitControls(camera, renderer.domElement);
		controls.update();
	}//end func

	//添加环境光
	function addAmbLight(color) {
		//环境光
		ambLight = new THREE.AmbientLight(color);
		ambLight.intensity = 1.5;
		scene.add(ambLight);
	}//end func

	/**
	 * 添加点光源
	 */
	function addPointLight() {
		var PointLight1 = new THREE.PointLight(0xff0000, 1);
		PointLight1.name = 'PointLight1';
		PointLight1.position.set(-15, -15, 4);
		PointLight1.intensity = 100;
		PointLight1.distance = 17.5;

		scene.add(PointLight1);

		var PointLight2 = new THREE.PointLight(0xff00ff, 1);
		PointLight2.name = 'PointLight2';
		PointLight2.position.set(15, 15, 4);
		PointLight2.intensity = 100;
		PointLight2.distance = 17.5;

		scene.add(PointLight2);
	}

	//添加聚光光源
	function addSpotLight() {
		//添加聚光
		spotLight = new THREE.SpotLight(0xffffff, 1);
		spotLight.name = 'spotLight';
		spotLight.position.set(0, 15, 5);
		spotLight.angle = Math.PI / 4;
		spotLight.intensity = 5;
		spotLight.distance = 17.5;

		scene.add(spotLight);

		//添加光源辅助线
		// var lightHelper = new THREE.SpotLightHelper( spotLight );
		// scene.add( lightHelper );
	}//end func
}//end func
