/**
 *  Amaze UI Starter Kit
 *
 *  Forked from Web Starter Kit
 *  Copyright 2014 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */

'use strict';

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import del from 'del';
import runSequence from 'run-sequence';
import browserSync from 'browser-sync';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import browserify from 'browserify';
import watchify from 'watchify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import babel from 'gulp-babel';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

const AUTOPREFIXER_BROWSERS = [
  'ie >= 8',
  'ie_mob >= 8',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

// JavaScript 格式校验
gulp.task('lint', () => {
  return gulp.src('app/js/**/*.js')
    .pipe(reload({stream: true, once: true}))
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.if(!browserSync.active, $.eslint.failOnError()));
});

// 图片优化
gulp.task('images', () => {
  return gulp.src('app/i/**/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist/i'))
    .pipe($.size({title: 'i'}));
});

gulp.task('clearCache', (done) => {
  return $.cache.clearAll(done);
});

// 拷贝相关资源
gulp.task('copy', () => {
  return gulp.src([
      'app/*',
      'app/**/**/*',
      '!app/*.html',
      '!app/js/*',
      '!app/less'
      // 'node_modules/amazeui/dist/**/*',
      // 'node_modules/jquery/dist/jquery.min.js'
    ], {
      dot: true
    })
    .pipe(gulp.dest((file) => {
      // if (file.path.indexOf('jquery') > -1) {
      //   return 'dist/js';
      // }
      return 'dist';
    }))
    .pipe($.size({title: 'copy'}));
});

// 编译 Less，添加浏览器前缀
gulp.task('styles', () => {
  return gulp.src(['app/less/*.less'])
    .pipe($.changed('styles', {extension: '.less'}))
    .pipe($.plumber({
      errorHandler: err => {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe($.less())
    .pipe($.postcss([autoprefixer({browsers: AUTOPREFIXER_BROWSERS})]))
    .pipe(gulp.dest('dist/css'))
    .pipe($.postcss([cssnano()]))
    .pipe($.rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/css'))
    .pipe($.size({title: 'styles'}));
});


gulp.task('babel' , () => {
  return gulp.src('app/js/*.js')
    // .pipe($.plumber({
    //   errorHandler: err => {
    //     console.log(err);
    //   }
    // }))
    .pipe($.plumber({}, true, function (err) {
      console.log('ERROR!!!!');
      console.log(err);
    }))
    .pipe(babel())
    .pipe(gulp.dest('dist/js'))
    .pipe($.size({
      title: 'babel'
    }));
})

// 压缩 HTML
gulp.task('html', () => {
  return gulp.src('app/**/*.html')
    // Minify Any HTML 不像压缩HTML，注释下面那一行
    // .pipe($.htmlmin({
    //   collapseWhitespace: true
    // }))
    // Output Files
    .pipe(gulp.dest('dist'))
    .pipe($.size({title: 'html'}));
});

// 洗刷刷
gulp.task('clean', () => {
  return del(['dist/*', '!dist/.git'], {dot: true});
});

// 清空 gulp-cache 缓存
gulp.task('clearCache', (cb) => {
  return $.cache.clearAll(cb);
});

// 监视源文件变化自动cd编译
gulp.task('watch', () => {
  gulp.watch('app/**/*.html', ['html']);
  gulp.watch('app/less/**/*less', ['styles']);
  gulp.watch('app/i/**/*', ['images']);
  // 使用 watchify，不再需要使用 gulp 监视 JS 变化
  gulp.watch('app/js/**/*', ['babel']);
});

// 启动预览服务，并监视 Dist 目录变化自动刷新浏览器
gulp.task('serve', ['default'], () => {
  browserSync({
    notify: false,
    // Customize the BrowserSync console logging prefix
    logPrefix: 'ASK',
    server: 'dist'
  });

  gulp.watch(['dist/**/*'], reload);
});

// 默认任务
gulp.task('default', (cb) => {
  runSequence('clean',
    ['styles', 'html', 'images', 'copy', 'babel'], 'watch', cb);
});
