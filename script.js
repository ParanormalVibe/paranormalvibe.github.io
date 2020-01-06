var pageVisibility = [];
function callback (entries, observer) {
	entries.forEach(entry => {
		var lastState = pageVisibility.find(x => x.id == entry.target.id);
		if (lastState == null || lastState == undefined) {
			lastState = { id: entry.target.id, visible: false };
			pageVisibility.push(lastState);
		}
		if (entry.isIntersecting && !lastState.visible) {
			var copyElement = entry.target.cloneNode(true);
			var targetNode = document.getElementById(entry.target.id);
			targetNode.parentNode.replaceChild(copyElement, entry.target);
			observer.unobserve(targetNode);
			observer.observe(copyElement);
			lastState.visible = true;
			console.log("oof");
		}
		if (!entry.isIntersecting) {
			lastState.visible = false;
		}
	});
}

var options = {};
var observer = new IntersectionObserver(callback, options);
var targets = document.querySelectorAll('.portfolio-page');
targets.forEach(target => {
	observer.observe(target);
});