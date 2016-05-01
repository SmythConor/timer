var isStarted = false;
var firstClick = true;
var inter = 1;
var startTime;
var pauseTime;

$(document).ready(function() {
	var init = formatTime({
		"ms": "00",
		"sec": "00",
		"mins": "00",
		"hours": "00"
	});

	$(".timer").html(init);

	$(".reset-button").click(resetTimer);

	$(".timer-button").click(function() {
		var start = "Start";
		var pause = "Pause";

		/* Check state to decide what to do */
		var state = isStarted

		if(isStarted) {
			pauseTimer();
		} else {
			startTimer();
		}

		var txt = $(this).text();
		$(this).text(txt == start ? pause : start);

		$(this).toggleClass("btn-success btn-primary");
		$(this).toggleClass("start-timer-button pause-timer-button");
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
	if(firstClick) {
		started = Date.now();
		firstClick = false;
	}

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
}, inter);

function pauseTimer() {
	isStarted = false;
}

function resetTimer() {
	isStarted = false;
	firstClick = true;

	$(".timer").html(init);
}

function formatTime(time) {
	var formattedTime = sprintf(
		'%02d:%02d:%02d:%02d', time.hours, time.mins, time.sec, time.ms);

    return formattedTime;
}
