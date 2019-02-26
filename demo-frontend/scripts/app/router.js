module.exports={
    routes:{
        todos:'showTodos'
    },
    showTodos:function(){
        return this.app.show('content','todos',{forceRender:false});
    }
}
