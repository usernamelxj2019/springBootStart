var gulp = require('gulp');
gulp.task('default',['run','watch'],function(){
    console.log('hello world');
});

var browserSync = require('browser-sync');
var uglify=require('gulp-uglify');

// 定义一个名为run的任务
gulp.task('run', ()=>{

    console.log('运行文件检测！');
    browserSync.init({
        server : "./"
    });

    // 检测当前项目的所有文件是否有变化
    gulp.watch('*').on('change', browserSync.reload);
    // gulp.watch('src/**/*').on('change', browserSync.reload);
    // gulp.watch('res/**/*').on('change', browserSync.reload);

});

//刷新
gulp.task('sass', function() {
    return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss
      .pipe(sass())
      .pipe(gulp.dest('app/css'))
      .pipe(browserSync.reload({
        stream: true
      }))
  });

  gulp.task('pack',  function() { //定义一个有依赖的任务
    console.log('打包！');
    gulp.src('scripts/*.js')  //要合并的文件
    // .pipe(uglify())  //使用uglify进行压缩,更多配置请参考：
    .pipe(gulp.dest('./bundle'));
    console.log('打包212！----');
  });

   // .pipe(concat('all.js'))  // 合并匹配到的js文件并命名为 "all.js"
    // .pipe(uglify())  //使用uglify进行压缩,更多配置请参考：


    gulp.task('watch',function(){
        console.log('监听');
        gulp.watch('scripts/*.js',['pack'])
    });
    