'use strict';

function getDegrees() {
	return $('#degrees').val();
}

function getSelect() {
	return $('#select').val();
}

function setResult(value) {
	$('#result').text(`Result: ${value}`);
}

function onChange() {
	const degrees = getDegrees();
	const type = getSelect();

	if (degrees && degrees.length) {
		$.ajax({
			type: 'POST',
			url: '/convert',
			contentType : 'application/json',
			dataType: 'json',
			data: JSON.stringify({
				type,
				degrees
			}),
			success: function(data) {
				console.log('data', data);
				setResult(data.degrees);
			}
		});
	} else {
		setResult('')
	}
}

$('#degrees').on('input', function () {
	onChange();
});

$('#select').on('change', function () {
	onChange();
});