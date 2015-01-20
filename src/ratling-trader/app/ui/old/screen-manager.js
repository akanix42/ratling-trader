define(function (require) {
    var stringformat = require('stringformat');

    return ScreenManager;

    function ScreenManager(display, screenFactory, logger) {
        var stack = [];
        var screens = {};

        return {
            switchTo: switchTo,
            pop: pop,
            push: push,
            getCurrent: getCurrent,
            render: render,
            handleInput: handleInput
        };

        function switchTo(name) {
            var screen = getScreen(name);
            if (screens.current)
                screens.current.exit();

            stack.length = 0;
            push(screen);
        }

        function pop(name) {
            if (name === undefined)
                return stack.pop();
            for (var i = stack.length - 1; i >= 0; i--)
                if (stack[i].name === name)
                    return stack.splice(i, stack.length - i)[i];

            logger.logError(stringformat('No screen called {name} was found in the stack.', new {name: name}));
            return null;
        }

        function push(name) {
            var screen = (typeof name === 'string' || name instanceof String)
                ? getScreen(name)
                : name;
            stack.push(screen);

            display.clear();
            screen.enter();
            screen.render();
        }

        function getScreen(name) {
            if (!(name in screens))
                return screens[name] = screenFactory.get(name);

            return screens[name];
        }

        function getCurrent() {
            return stack[stack.length - 1] || null;
        }

        function render() {
            getCurrent().render();
        }

        function handleInput(event, e) {
            var currentScreen = getCurrent();
            if (currentScreen !== null)
                currentScreen.handleInput(event, e);
        }
    }
});
