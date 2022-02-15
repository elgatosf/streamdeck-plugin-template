window.onload = () => {
	document.querySelector('#send').addEventListener('click', () => {
		window.opener.sendToInspector('Message from external window.');
	});
};
