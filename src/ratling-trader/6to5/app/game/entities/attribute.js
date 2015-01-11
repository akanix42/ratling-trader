define(function (require) {
    return attribute;

    function attribute(data) {
        init();

        return {
            updateBase: updateBase,
            updateBaseMax: updateBaseMax,
            addBonus: addBonus,
            removeBonus: removeBonus,
            getCurrent: getCurrent,
            updateCurrent: updateCurrent,
            getMax: getMax
        };

        function init() {
            if (data.maxBase === null)
                data.maxBase = data.base;
            if (data.current === null)
                data.current = getMax();

        }

        function updateBase(value) {
            data.base = Math.min(data.base + value, data.maxBase);
        }

        function updateBaseMax(value) {
            data.maxBase += value;
        }

        function addBonus(source, value) {
            removeBonus(source);

            data.modifiers[source.getId()] = value;
            data.bonus += value;
        }

        function removeBonus(source) {
            if (!(source.getId() in data.modifiers))
                return;

            data.bonus -= data.modifiers[source.getId()];

            delete data.modifiers[source.getId()];
        }

        function getCurrent() {
            return data.current;
        }

        function updateCurrent(value) {
            data.current = Math.min(data.current + value, getMax());
        }

        function getMax() {
            return data.maxBase + data.bonus;
        }

    }

});