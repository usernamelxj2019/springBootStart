define([], function() {
    'use strict';
    function _showName(name){
        console.log(name);
    }
    return {
        say(words){
            console.log(words);
        },
        showName(name){ //练习私有方法
            _showName(name);
        }
    }
});