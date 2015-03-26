var input = document.querySelectorAll('.searchBar__input')[0];
var typingInterval;

(function() {
	// возьмем запрос из урла
	var q = window.location.search.split('=')[1];
	if (!q) return input.focus();
	q = decodeURI(q);

	// покажем курсор
	cursor = document.querySelectorAll('.cursor')[0];
	cursor.style.display = 'block';

	// подвинем курсор в поле ввода
	setTimeout(function() {
		var rect = input.getBoundingClientRect();
		cursor.style.left = (rect.left + 20) + 'px';
		cursor.style.top = (rect.top + rect.height / 2) + 'px';
	}, 1000);

	// начнем вводить буквы запроса и перейдем на гугл
	cursor.addEventListener('transitionend', function() {
		if (typingInterval) return;

		input.focus();
		input.value = '';
		var i = 0;
		function type() {
			if (i === q.length) {
				clearInterval(typingInterval);
				window.location = 'http://2gis.ru/search/' + q;
				return;
			}
			input.value += q[i];
			i++;
		}
		typingInterval = setInterval(type, 500);
	});
})();

document.addEventListener('keyup', function(e) {
	if (e.keyCode === 13) {
		var input = document.querySelectorAll('.searchBar__input')[0];
		var result = document.querySelectorAll('.result')[0];
		result.innerText = window.location.origin + window.location.pathname + '?q=' + input.value;
	}
});
