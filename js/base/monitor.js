//2019.01.23
//百度监测贴这里
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?5f0c4df8f4c1161ca7475bdead0ac537";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();

(function(a, e, f, g, b, c, d) {
	a.ClickiTrackerName = b;
	a[b] = a[b] || function() {(a[b].queue = a[b].queue || []).push(arguments)};
	a[b].start = +new Date; c = e.createElement(f); d = e.getElementsByTagName(f)[0];
	c.async = 1; c.src = g; d.parentNode.insertBefore(c, d)
   })(window, document, 'script', '//stm-cdn.cn.miaozhen.com/clicki.min.js?v='+Math.round(new Date().getTime()/1000/300), 'stm_clicki');
   stm_clicki('create', 'dc-3508', 'auto');
   stm_clicki('send', 'pageview');

var imonitor = importMonitor();
imonitor.add({action:'loading',category:'default',label:'loading'});
function importMonitor() {
	var monitor = {};

	monitor.add = function(options) {
		if(options) {
			var defaults = {
				action: 'touchend',
				category: 'default',
				label: ''
			};
			var opts = $.extend(defaults, options);
			if(opts.obj && opts.obj.length > 0) {
				opts.obj.each(function(i,n) {
					$(n).on(opts.action, {action:opts.action,category:opts.category,label:opts.label}, event_bind);
				});
			} //end if
			else {
				opts.action = 'script'
				event_bind(null, opts);
			} //end else
		} //end if
	} //end func

	function event_bind(e, data) {
		if(e) event_handler(e.data);
		else event_handler(data);
	} //end func

	function event_handler(data) {
		if(window._hmt) window._hmt.push(['_trackEvent', data.category, data.action, data.label]);
		if(window.ga) window.ga('send', 'event', data.category, data.action, data.label);
		if(window.gtag) window.gtag('event', data.action, {
			'event_category': data.category,
			'event_label': data.label
		});
		if(window.console) window.console.log('事件：' + ' | ' + '类别：' + data.category + ' | ' + '标签：' + data.label);
	} //end func

	return monitor;
} //end import