define([
    'pb/animal'
], function(animal) {
    'use strict';
    return {
        say(){
            animal.say("喵喵");
            animal.showName("猫");
        }
    }
});