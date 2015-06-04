Ioc.create = function create() {
    return new Ioc.Container();
};

Ioc.lifecycles = {
    unique: 'unique',
    singleton: 'singleton'
};
