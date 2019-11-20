function setingRem() {
	var clientWidth = document.body.clientWidth;
	if (clientWidth < 320) {
		clientWidth = 320;
	} else if (clientWidth > 768) {
		clientWidth = 768;
	}
	document.getElementById('setingFont').style.cssText = 'font-size:' + (clientWidth * 2 / 40) + 'px';
}
// 默认执行
setingRem();
// 窗口变化执行
window.onresize = function () {
	setingRem();
}
