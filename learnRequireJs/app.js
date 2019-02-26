require.config({
//By default load any module IDs from js/
    baseUrl: 'js',
//except, if the module ID starts with "pb"
   /* paths: {
        pb: '../pb'
    },*/
    shim: {
        'world': {
            deps:['animalWorld'],
            // use the global 'Backbone' as the module name.
            exports: 'world'
        }
    }
});
/*require(['cat','dog','world'], function (cat,dog,world) {
    world.world();
    cat.say();
    dog.say();
});*/

require(['logger'], function (logger) {
    logger.test("大熊");
    console.log(logger.name);
});