var D=require('drizzlejs');

exports.items={
    main:'main'
};
exports.store={
models:{
    todos:{
        data:{}
    }
},
 callbacks:{
     init:function(){
         var todos=this.models.todos;
         D.assign(todos.data,{
             title:'第一个应用11'
         });
         todos.changed();
     }
 }

};

exports.beforeRender=function(){
    return this.dispatch('init');
}
