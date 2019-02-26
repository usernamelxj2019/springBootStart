define([
    'pb/animal'
], function(animal) {
    'use strict';
    return {
        say(){
            animal.say("汪汪");
            animal.showName("狗");
        }
    }
});