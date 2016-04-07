var isStarted = false;

$(document).ready(function() {
	var init = formatTime({
		"ms": "00",
		"sec": "00",
		"mins": "00",
		"hours": "00"
	});

	$(".timer").html(init);

	$(".timer-button").click(function() {
		var start = "Start";
		var reset = "Reset";

		/* Check state to decide what to do */
		var state = isStarted

		if(isStarted) {
			resetTimer();
		} else {
			startTimer();
			//check = 1;
		}

		var txt = $(this).text();
		$(this).text(txt == start ? reset : start);

		$(this).toggleClass("btn-success btn-danger");
		$(this).toggleClass("start-timer-button reset-timer-button");
});
});

String.prototype.format = function() {
    var formatted = this;
    for (var i = 0; i < arguments.length; i++) {
        var regexp = new RegExp('\\{'+i+'\\}', 'gi');
        formatted = formatted.replace(regexp, arguments[i]);
    }
    return formatted;
};

var started;

var init = formatTime({
	"ms": "00",
	"sec": "00",
	"mins": "00",
	"hours": "00"
});

function hasStarted(state) {
	var start = "Start";

	return state == start;
}

function getFormattedTime(time) {
	var ms = time.getMilliseconds();
	var sec = time.getSeconds();
	var mins = time.getMinutes();
	var hours = time.getHours();

	return {
		"ms": ms,
		"sec": sec,
		"mins": mins,
		"hours": hours
	};
}

function startTimer() {
	started = Date.now();

	isStarted = true;
}

setInterval(function() {
	if(isStarted) {
		var now = Date.now();
		var temp = now - started;

		var timeSpent = new Date(temp);

		var formattedTimeSpent = getFormattedTime(timeSpent);

		var formattedTime = formatTime(formattedTimeSpent);

		$(".timer").html(formattedTime);
	}
}, 1);

function resetTimer() {
	isStarted = false;
	$(".timer").html(init);
}

function formatTime(time) {
	var formattedTime = sprintf(
		'%02d:%02d:%02d:%02d', time.hours, time.mins, time.sec, time.ms);

    return formattedTime;
}
