
TestIoc = function () {
    var container = ioc = Ioc.create();
    container.register('test', test);
    container.register('test2', test2);
    container.register('test3', test3, Ioc.lifecycles.singleton);

    console.log(container.get('test'));
    console.log(container.get('test3'));
    console.log(container.get('test3'));

};
var id = 0;
function test(test2) {
    this.pets = 'no';
    this.test2 = test2;
    this.id = id++;
}
test.$inject=['test2'];

test.prototype.cats = function () {
    return 'meoww';
};

function test2(){

}

function test3(){
    this.id = id++;
}