/*global setTimeout:true, clearTimeout:true */

(function (global) {
	var tweeny,
		currentQueueName,
		queues;
		
	function iterateQueue (queueName) {
		var queue; 
		
		queue = queues[queueName];
		queue.shift();
		
		if (queue.length) {
			queue[0]();
		} else {
			queue.running = false;
		}
	}
	
	if (!global.tweeny) {
		return;
	}
	
	tweeny = global.tweeny;
	queues = {
		'default': []
	};
	currentQueueName = 'default';
	
	tweeny.queue = function (from, to, duration, callback, easing) {
		var queue,
			closuredQueueName;
			
		function wrappedCallback () {
			callback();
			iterateQueue(closuredQueueName);
		}
		
		function tweenInit () {
			if (to) {
				tweeny.tween(from, to, duration, wrappedCallback, easing);
			} else {
				from.callback = wrappedCallback;
				tweeny.tween(from);
			}
		}
		
		// Make sure there is always an invokable callback
		callback = callback || from.callback || function () {};
		
		closuredQueueName = currentQueueName;
		queue = queues[closuredQueueName];
		queue.push(tweenInit);
		
		if (!queue.running) {
			queue[0]();
			queue.running = true;
		}
	};
	
	tweeny.queueName = function ( name ) {
		currentQueueName = name;
		
		if (!queues[currentQueueName]) {
			queues[currentQueueName] = [];
		}
		
		return currentQueueName;
	};
	
	tweeny.queueShift = function () {
		queues[currentQueueName].shift();
	};
	
	tweeny.queueUnShift = function () {
		queues[currentQueueName].unshift();
	};
	
	tweeny.queueEmpty = function () {
		queues[currentQueueName].length = 0;
	};
	
	tweeny.queueLength = function () {
		return queues[currentQueueName].length;
	};
	
}(this));