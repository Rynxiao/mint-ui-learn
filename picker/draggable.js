var draggable = (function() {
    var isDragging = false;
    var supportTouch = 'ontouchstart' in window;

    function draggable(element, options) {
        var moveFn = function(event) {
            if (options.drag) {
                options.drag(supportTouch ? event.changedTouches[0] || event.touches[0] : event);
            }
        }

        var endFn = function(event) {
            if (!supportTouch) {
                document.removeEventListener('mousemove', moveFn);
                document.removeEventListener('mouseup', endFn);
            }
            document.onselectstart = null;
            document.ondragstart = null;

            isDragging = false;

            if (options.end) {
                options.end(supportTouch ? event.changedTouches[0] || event.touches[0] : event);
            }
        }

        element.addEventListener(supportTouch ? 'touchstart' : 'mousedown', function(event) {
            if (isDragging) return;
            document.onselectstart = function() { return false; };
            document.ondragstart = function() { return false; };

            if (!supportTouch) {
                document.addEventListener('mousemove', moveFn);
                document.addEventListener('mouseup', endFn);
            }

            isDragging = true;

            if (options.start) {
                event.preventDefault();
                options.start(supportTouch ? event.changedTouches[0] || event.touches[0] : event);
            }
        });

        if (supportTouch) {
            element.addEventListener('touchmove', moveFn);
            element.addEventListener('touchend', endFn);
            element.addEventListener('touchcancel', endFn);
        }
    }

    return draggable;
})()
