/**
 * Created by nandunb on 9/18/17.
 */

const gulp = require('gulp');
const $ = require('gulp-load-plugins')({lazy:true});
const del = require('del');
const es = require('event-stream');
const bowerFiles = require('main-bower-files');
const print = require('gulp-print');
const q = require('q');


let paths = {
    scripts: 'app/**/*.js',
    styles: 'styles/*.css',
    index: 'index.html',
    views: 'app/**/*.html',
    distDev: './dist.dev',
    distProd: './dist.prod',
    distScriptsProd: './dist.prod/scripts',
    scriptsDevServer: 'devServer/**/*.js'
};

let pipes = {};

pipes.orderedVendorScripts = ()=>{
    return $.order(['jquery.js', 'angular.js']);
};

pipes.ordersApplicationScripts = ()=>{
    return $.angularFilesort();
};

pipes.minifiedFileName = ()=>{
    return $.rename((path)=>{
        path.extname = '.min'+path.extname;
    })
};

pipes.validatedApplicationScripts = ()=>{
    return gulp.src(paths.scripts)
        // .pipe($.jshint())
        // .pipe($.jshint.reporter('jshint-stylish'));
};

pipes.builtApplicationScriptsDev = ()=>{
    return pipes.validatedApplicationScripts()
        .pipe(gulp.dest(paths.distDev));
};

pipes.builtApplicationScriptsProd = ()=>{
    let scriptedPartials = pipes.scriptedViews();
    let validatedApplicationScripts = pipes.validatedApplicationScripts();

    return es.merge(scriptedPartials, validatedApplicationScripts)
        .pipe(pipes.ordersApplicationScripts())
        .pipe($.sourcemaps.init())
        .pipe($.concat('app.min.js'))
        .pipe($.uglify())
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest(paths.distScriptsProd));
};

pipes.builtVenderScriptsDev = ()=>{
    return gulp.src(bowerFiles())
        .pipe(gulp.dest('dist.dev/bower_components'));
};

pipes.builtVendorScriptsProd = ()=>{
    return gulp.src(bowerFiles())
        .pipe(pipes.orderedVendorScripts())
        .pipe($.concat('vendor.min.js'))
        .pipe($.uglify())
        .pipe(gulp.dest(paths.distScriptsProd));
};

pipes.validatedDevServerScripts = ()=>{
    return gulp.src(paths.scriptsDevServer)
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'));
};

pipes.validatedViews = ()=>{
    return gulp.src(paths.views)
        .pipe($.htmlhint({'doctype-first': false}))
        .pipe($.htmlhint.reporter());
};

pipes.builtViewsDev = ()=>{
    return pipes.validatedViews()
        .pipe(gulp.dest(paths.distDev));
};

pipes.scriptedViews = ()=>{
    return pipes.validatedViews()
        .pipe($.htmlhint.failReporter())
        .pipe($.htmlmin({collapseWhitespace: true, removeComments: true}))
        .pipe($.ngHtml2js({
            moduleName: "clms"
        }))
};

pipes.stylesDev = ()=>{
    return gulp.src(paths.styles)
        .pipe(gulp.dest(paths.distDev));
};

pipes.stylesProd = ()=>{
    return gulp.src(paths.styles)
        .pipe($.sourcemaps.init())
        .pipe($.minifyCss())
        .pipe($.sourcemaps.write())
        .pipe(pipes.minifiedFileName())
        .pipe(gulp.dest(paths.distProd));
};

pipes.validatedIndex = ()=>{
    return gulp.src(paths.index)
        .pipe($.htmlhint())
        .pipe($.htmlhint.reporter());
};

pipes.builtIndexDev = ()=>{
    let orderedVendorScripts = pipes.builtVenderScriptsDev()
        .pipe(pipes.orderedVendorScripts());

    let orderedApplicationScripts = pipes.builtApplicationScriptsDev()
        .pipe(pipes.ordersApplicationScripts());

    let applicationStyles = pipes.stylesDev();

    return pipes.validatedIndex()
        .pipe(gulp.dest(paths.distDev))
        .pipe($.inject(orderedVendorScripts, {relative: true, name: 'bower'}))
        .pipe($.inject(orderedApplicationScripts, {relative: true}))
        .pipe(plugins.inject(applicationStyles, {relative: true}))
        .pipe(gulp.dest(paths.distDev));

};

pipes.builtIndexProd = ()=>{
    let vendorScripts = pipes.builtVendorScriptsProd();
    let applicationScripts = pipes.builtApplicationScriptsProd();
    let applicationStyles = pipes.stylesProd();

    return pipes.validatedIndex()
        .pipe(gulp.dest(paths.distProd))
        .pipe($.inject(vendorScripts, {relative: true, name: 'bower'}))
        .pipe($.inject(applicationScripts, {relative: true}))
        .pipe($.inject(applicationStyles, {relative: true}))
        .pipe($.htmlmin({collapseWhitespace: true, removeComments: true}))
        .pipe(gulp.dest(paths.distProd));
};

pipes.builtApplicationDev = ()=>{
    return es.merge(pipes.builtIndexDev(), pipes.builtViewsDev());
}

pipes.builtApplicationProd = ()=>{
    return pipes.builtIndexProd();
}

gulp.task('clean-dev', ()=>{
    let defered = q.defer();
    del(paths.distDev, ()=>{
        defered.resolve();
    })

    return defered.promise;
})

gulp.task('clean-prod', ()=>{
    let defered = q.defer();
    del(paths.distProd, ()=>{
        defered.resolve();
    })

    return defered.promise;
})


gulp.task('validate-views', pipes.validatedViews);
gulp.task('build-app-prod', pipes.builtApplicationProd);
// gulp.task('clean-build-app-prod', ['clean-prod'], pipes.builtApplicationProd());
// gulp.task('clean-build-app-dev', ['clean-dev'], pipes.builtApplicationDev());
// gulp.task('default', ['clean-build-app-prod']);

gulp.task('watch-dev', ['clean-build-app-dev'], ()=>{
    $.livereload.listen({start:true});

    gulp.watch(paths.index, ()=>{
        return pipes.builtIndexDev()
            .pipe($.livereload());
    })

    gulp.watch(paths.scripts, ()=>{
        return pipes.builtApplicationScriptsDev()
            .pipe($.livereload());
    })

    gulp.watch(paths.views, ()=>{
        return pipes.builtViewsDev()
            .pipe($.livereload());
    })

    gulp.watch(paths.styles, ()=>{
        return pipes.stylesDev()
            .pipe($.livereload());
    })
})


