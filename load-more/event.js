var Event = (function() {
    var list = {}, listen, trigger, remove;

    listen = function(key, fn) {
        if (!list[key]) {
            list[key] = [];
        }

        list[key].push(fn);
    };

    trigger = function() {
        var key = Array.prototype.shift.call(arguments);
        var fns = list[key];

        if (!fns || fns.length === 0) {
            return;
        }

        for (var i = 0; i < fns.length; i++) {
            var fn = fns[i];
            fn.apply(this, arguments);
        }
    };

    remove = function(key, fn) {
        var fns = list[key];
        if (!fns) {
            return false;
        }

        if (!fn) {
            fns && (fns.length = 0);
        } else {
            for (var i = 0; i < fns.length; i++) {
                var _fn = fns[i];
                if (_fn === fn) {
                    fns.splice(i, 1);
                }
            }
        }
    }

    return {
        listen: listen,
        trigger: trigger,
        remove: remove
    };
})();