// Generated on 2016-06-28 using generator-angular-fullstack 3.6.1
'use strict';

import _ from 'lodash';
import del from 'del';
import gulp from 'gulp';
import grunt from 'grunt';
import path from 'path';
import gulpLoadPlugins from 'gulp-load-plugins';
import http from 'http';
import open from 'open';
import lazypipe from 'lazypipe';
import {stream as wiredep} from 'wiredep';
import nodemon from 'nodemon';
import {Server as KarmaServer} from 'karma';
import runSequence from 'run-sequence';
import {protractor, webdriver_update} from 'gulp-protractor';
import {Instrumenter} from 'isparta';

var plugins = gulpLoadPlugins();
var config;

const clientPath = require('./bower.json').appPath || 'client';
const serverPath = 'server';
const paths = {
    client: {
        assets: `${clientPath}/assets/**/*`,
        images: `${clientPath}/assets/images/**/*`,
        scripts: [
            `${clientPath}/**/!(*.spec|*.mock).ts`,
            `!${clientPath}/bower_components/**/*`,
            `!${clientPath}/{typings,test_typings}/**/*`
        ],
        styles: [`${clientPath}/{app,components}/**/*.css`],
        mainStyle: `${clientPath}/app/app.css`,
        views: `${clientPath}/{app,components}/**/*.html`,
        mainView: `${clientPath}/index.html`,
        test: [`${clientPath}/{app,components}/**/*.{spec,mock}.ts`],
        e2e: ['e2e/**/*.spec.js'],
        bower: `${clientPath}/bower_components/`
    },
    server: {
        scripts: [
          `${serverPath}/**/!(*.spec|*.integration).js`,
          `!${serverPath}/config/local.env.sample.js`
        ],
        json: [`${serverPath}/**/*.json`],
        test: {
          integration: [`${serverPath}/**/*.integration.js`, 'mocha.global.js'],
          unit: [`${serverPath}/**/*.spec.js`, 'mocha.global.js']
        }
    },
    karma: 'karma.conf.js',
    dist: 'dist'
};

/********************
 * Helper functions
 ********************/

function onServerLog(log) {
    console.log(plugins.util.colors.white('[') +
        plugins.util.colors.yellow('nodemon') +
        plugins.util.colors.white('] ') +
        log.message);
}

function checkAppReady(cb) {
    var options = {
        host: 'localhost',
        port: config.port
    };
    http
        .get(options, () => cb(true))
        .on('error', () => cb(false));
}

// Call page until first success
function whenServerReady(cb) {
    var serverReady = false;
    var appReadyInterval = setInterval(() =>
        checkAppReady((ready) => {
            if (!ready || serverReady) {
                return;
            }
            clearInterval(appReadyInterval);
            serverReady = true;
            cb();
        }),
        100);
}

function sortModulesFirst(a, b) {
    var module = /\.module\.ts$/;
    var aMod = module.test(a.path);
    var bMod = module.test(b.path);
    // inject *.module.js first
    if (aMod === bMod) {
        // either both modules or both non-modules, so just sort normally
        if (a.path < b.path) {
            return -1;
        }
        if (a.path > b.path) {
            return 1;
        }
        return 0;
    } else {
        return (aMod ? -1 : 1);
    }
}

/********************
 * Reusable pipelines
 ********************/

let lintClientScripts = lazypipe()
    .pipe(plugins.tslint, require(`./${clientPath}/tslint.json`))
    .pipe(plugins.tslint.report, 'verbose');

let lintServerScripts = lazypipe()
    .pipe(plugins.jshint, `${serverPath}/.jshintrc`)
    .pipe(plugins.jshint.reporter, 'jshint-stylish');

let lintServerTestScripts = lazypipe()
    .pipe(plugins.jshint, `${serverPath}/.jshintrc-spec`)
    .pipe(plugins.jshint.reporter, 'jshint-stylish');

let styles = lazypipe()
    .pipe(plugins.sourcemaps.init)
    .pipe(plugins.cleanCss, {processImportFrom: ['!fonts.googleapis.com']})
    .pipe(plugins.autoprefixer, {browsers: ['last 1 version']})
    .pipe(plugins.sourcemaps.write, '.');

let transpileServer = lazypipe()
    .pipe(plugins.sourcemaps.init)
    .pipe(plugins.babel, {
        plugins: [
            'transform-class-properties',
            'transform-runtime'
        ]
    })
    .pipe(plugins.sourcemaps.write, '.');

let mocha = lazypipe()
    .pipe(plugins.mocha, {
        reporter: 'spec',
        timeout: 5000,
        require: [
            './mocha.conf'
        ]
    });

let istanbul = lazypipe()
    .pipe(plugins.istanbul.writeReports)
    .pipe(plugins.istanbulEnforcer, {
        thresholds: {
            global: {
                lines: 80,
                statements: 80,
                branches: 80,
                functions: 80
            }
        },
        coverageDirectory: './coverage',
        rootDirectory : ''
    });

/********************
 * Env
 ********************/

gulp.task('env:all', () => {
    let localConfig;
    try {
        localConfig = require(`./${serverPath}/config/local.env`);
    } catch (e) {
        localConfig = {};
    }
    plugins.env({
        vars: localConfig
    });
});
gulp.task('env:test', () => {
    plugins.env({
        vars: {NODE_ENV: 'test'}
    });
});
gulp.task('env:prod', () => {
    plugins.env({
        vars: {NODE_ENV: 'production'}
    });
});

/********************
 * Tasks
 ********************/

gulp.task('inject', cb => {
    runSequence(['inject:js', 'inject:css', 'inject:tsconfig'], cb);
});

gulp.task('inject:js', () => {
    return gulp.src(paths.client.mainView)
        .pipe(plugins.inject(
            gulp.src(_.union(paths.client.scripts, ['client/app/app.constant.js', `!${clientPath}/**/*.{spec,mock}.ts`, `!${clientPath}/app/app.ts`]), {read: false})
                .pipe(plugins.sort(sortModulesFirst)),
            {
                starttag: '<!-- injector:js -->',
                endtag: '<!-- endinjector -->',
                transform: (filepath) => '<script src="' + filepath.replace(`/${clientPath}/`, '').replace('.ts', '.js') + '"></script>'
            }))
        .pipe(gulp.dest(clientPath));
});

gulp.task('inject:tsconfig', () => {
    let src = gulp.src([
        `${clientPath}/**/!(*.spec|*.mock).ts`,
        `!${clientPath}/bower_components/**/*`,
        `${clientPath}/typings/**/*.d.ts`
    ], {read: false})
        .pipe(plugins.sort());

    return gulp.src('./tsconfig.client.json')
        .pipe(plugins.inject(src, {
            starttag: '"files": [',
            endtag: ']',
            transform: (filepath, file, i, length) => {
                return `"${filepath.substr(1)}"${i + 1 < length ? ',' : ''}`;
            }
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('inject:css', () => {
    return gulp.src(paths.client.mainView)
        .pipe(plugins.inject(
            gulp.src(`${clientPath}/{app,components}/**/*.css`, {read: false})
                .pipe(plugins.sort()),
            {
                starttag: '<!-- injector:css -->',
                endtag: '<!-- endinjector -->',
                transform: (filepath) => '<link rel="stylesheet" href="' + filepath.replace(`/${clientPath}/`, '').replace('/.tmp/', '') + '">'
            }))
        .pipe(gulp.dest(clientPath));
});

// Install DefinitelyTyped TypeScript definition files
gulp.task('tsd', cb => {
    plugins.tsd({
        command: 'reinstall',
        config: './tsd.json'
    }, cb);
});

gulp.task('tsd:test', cb => {
    plugins.tsd({
        command: 'reinstall',
        config: './tsd_test.json'
    }, cb);
});

gulp.task('styles', () => {
    return gulp.src(paths.client.styles)
        .pipe(styles())
        .pipe(gulp.dest('.tmp/app'));
});

gulp.task('copy:constant', () => {
    return gulp.src(`${clientPath}/app/app.constant.js`, { dot: true })
        .pipe(gulp.dest('.tmp/app'));
})

gulp.task('transpile:client', ['tsd', 'constant', 'copy:constant'], () => {
    let tsProject = plugins.typescript.createProject('./tsconfig.client.json');
    return tsProject.src()
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.typescript(tsProject)).js
        .pipe(plugins.sourcemaps.write('.'))
        .pipe(gulp.dest('.tmp'));
});

gulp.task('transpile:client:test', ['tsd:test'], () => {
    let tsTestProject = plugins.typescript.createProject('./tsconfig.client.test.json');
    return tsTestProject.src()
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.typescript(tsTestProject)).js
        .pipe(plugins.sourcemaps.write('.'))
        .pipe(gulp.dest('.tmp/test'));
});

gulp.task('transpile:server', () => {
    return gulp.src(_.union(paths.server.scripts, paths.server.json))
        .pipe(transpileServer())
        .pipe(gulp.dest(`${paths.dist}/${serverPath}`));
});

gulp.task('lint:scripts', cb => runSequence(['lint:scripts:client', 'lint:scripts:server'], cb));

gulp.task('lint:scripts:client', () => {
    return gulp.src(_.union(
        paths.client.scripts,
        _.map(paths.client.test, blob => '!' + blob),
        [`!${clientPath}/app/app.constant.ts`]
    ))
        .pipe(lintClientScripts());
});

gulp.task('lint:scripts:server', () => {
    return gulp.src(_.union(paths.server.scripts, _.map(paths.server.test, blob => '!' + blob)))
        .pipe(lintServerScripts());
});

gulp.task('lint:scripts:clientTest', () => {
    return gulp.src(paths.client.test)
        .pipe(lintClientScripts());
});

gulp.task('lint:scripts:serverTest', () => {
    return gulp.src(paths.server.test)
        .pipe(lintServerTestScripts());
});

gulp.task('jscs', () => {
  return gulp.src(_.union(paths.client.scripts, paths.server.scripts))
      .pipe(plugins.jscs())
      .pipe(plugins.jscs.reporter());
});

gulp.task('clean:tmp', () => del(['.tmp/**/*'], {dot: true}));

gulp.task('start:client', cb => {
    whenServerReady(() => {
        open('http://localhost:' + config.port);
        cb();
    });
});

gulp.task('start:server', () => {
    process.env.NODE_ENV = process.env.NODE_ENV || 'development';
    config = require(`./${serverPath}/config/environment`);
    nodemon(`-w ${serverPath} ${serverPath}`)
        .on('log', onServerLog);
});

gulp.task('start:server:prod', () => {
    process.env.NODE_ENV = process.env.NODE_ENV || 'production';
    config = require(`./${paths.dist}/${serverPath}/config/environment`);
    nodemon(`-w ${paths.dist}/${serverPath} ${paths.dist}/${serverPath}`)
        .on('log', onServerLog);
});

gulp.task('start:inspector', () => {
    gulp.src([])
        .pipe(plugins.nodeInspector());
});

gulp.task('start:server:debug', () => {
    process.env.NODE_ENV = process.env.NODE_ENV || 'development';
        config = require(`./${serverPath}/config/environment`);
    nodemon(`-w ${serverPath} --debug-brk ${serverPath}`)
        .on('log', onServerLog);
});

gulp.task('watch', () => {
    var testFiles = _.union(paths.client.test, paths.server.test.unit, paths.server.test.integration);

    plugins.livereload.listen();

    plugins.watch(paths.client.styles, () => {  //['inject:css']
        gulp.src(paths.client.mainStyle)
            .pipe(plugins.plumber())
            .pipe(styles())
            .pipe(gulp.dest('.tmp/app'))
            .pipe(plugins.livereload());
    });

    plugins.watch(paths.client.views)
        .pipe(plugins.plumber())
        .pipe(plugins.livereload());

    gulp.watch(paths.client.scripts, ['inject:tsconfig', 'lint:scripts:client', 'transpile:client']);

    plugins.watch(_.union(paths.server.scripts, testFiles))
        .pipe(plugins.plumber())
        .pipe(lintServerScripts())
        .pipe(plugins.livereload());

    gulp.watch('bower.json', ['wiredep:client']);
});

gulp.task('serve', cb => {
    runSequence(['clean:tmp', 'constant', 'env:all', 'tsd'],
        ['lint:scripts', 'inject'],
        ['wiredep:client'],
        ['transpile:client', 'styles'],
        ['start:server', 'start:client'],
        'watch',
        cb);
});

gulp.task('serve:dist', cb => {
    runSequence(
        'build',
        'env:all',
        'env:prod',
        ['start:server:prod', 'start:client'],
        cb);
});

gulp.task('serve:debug', cb => {
    runSequence(['clean:tmp', 'constant', 'tsd'],
        ['lint:scripts', 'inject'],
        ['wiredep:client'],
        ['transpile:client', 'styles'],
        'start:inspector',
        ['start:server:debug', 'start:client'],
        'watch',
        cb);
});

gulp.task('test', cb => {
    return runSequence('test:server', 'test:client', cb);
});

gulp.task('test:server', cb => {
    runSequence(
        'env:all',
        'env:test',
        'mocha:unit',
        'mocha:integration',
        'mocha:coverage',
        cb);
});

gulp.task('mocha:unit', () => {
    return gulp.src(paths.server.test.unit)
        .pipe(mocha());
});

gulp.task('mocha:integration', () => {
    return gulp.src(paths.server.test.integration)
        .pipe(mocha());
});

gulp.task('test:client', ['wiredep:test', 'constant', 'transpile:client', 'transpile:client:test'], (done) => {
    new KarmaServer({
      configFile: `${__dirname}/${paths.karma}`,
      singleRun: true
    }, done).start();
});

// inject bower components
gulp.task('wiredep:client', () => {
    return gulp.src(paths.client.mainView)
        .pipe(wiredep({
            exclude: [
                '/json3/',
                '/es5-shim/'
            ],
            ignorePath: clientPath
        }))
        .pipe(gulp.dest(`${clientPath}/`));
});

gulp.task('wiredep:test', () => {
    return gulp.src(paths.karma)
        .pipe(wiredep({
            exclude: [
                '/json3/',
                '/es5-shim/'
            ],
            devDependencies: true
        }))
        .pipe(gulp.dest('./'));
});

/********************
 * Build
 ********************/

//FIXME: looks like font-awesome isn't getting loaded
gulp.task('build', cb => {
    runSequence(
        [
            'clean:dist',
            'clean:tmp'
        ],
        'inject',
        'wiredep:client',
        'tsd',
        [
            'build:images',
            'copy:extras',
            'copy:fonts',
            'copy:assets',
            'copy:server',
            'transpile:server',
            'build:client'
        ],
        cb);
});

gulp.task('clean:dist', () => del([`${paths.dist}/!(.git*|.openshift|Procfile)**`], {dot: true}));

gulp.task('build:client', ['transpile:client', 'styles', 'html', 'constant', 'build:images'], () => {
    var manifest = gulp.src(`${paths.dist}/${clientPath}/assets/rev-manifest.json`);

    var appFilter = plugins.filter('**/app.js', {restore: true});
    var jsFilter = plugins.filter('**/*.js', {restore: true});
    var cssFilter = plugins.filter('**/*.css', {restore: true});
    var htmlBlock = plugins.filter(['**/*.!(html)'], {restore: true});

    return gulp.src(paths.client.mainView)
        .pipe(plugins.useref())
            .pipe(appFilter)
                .pipe(plugins.addSrc.append('.tmp/templates.js'))
                .pipe(plugins.concat('app/app.js'))
            .pipe(appFilter.restore)
            .pipe(jsFilter)
                .pipe(plugins.ngAnnotate())
                .pipe(plugins.uglify())
            .pipe(jsFilter.restore)
            .pipe(cssFilter)
                .pipe(plugins.cleanCss({
                    processImportFrom: ['!fonts.googleapis.com']
                }))
            .pipe(cssFilter.restore)
            .pipe(htmlBlock)
                .pipe(plugins.rev())
            .pipe(htmlBlock.restore)
        .pipe(plugins.revReplace({manifest}))
        .pipe(gulp.dest(`${paths.dist}/${clientPath}`));
});

gulp.task('html', function() {
    return gulp.src(`${clientPath}/{app,components}/**/*.html`)
        .pipe(plugins.angularTemplatecache({
            module: 'isaAfApp'
        }))
        .pipe(gulp.dest('.tmp'));
});

gulp.task('constant', function() {
  let sharedConfig = require(`./${serverPath}/config/environment/shared`);
  return plugins.ngConstant({
    name: 'isaAfApp.constants',
    deps: [],
    wrap: true,
    stream: true,
    constants: { appConfig: sharedConfig }
  })
    .pipe(plugins.rename({
      basename: 'app.constant'
    }))
    .pipe(gulp.dest(`${clientPath}/app/`))
});

gulp.task('build:images', () => {
    return gulp.src(paths.client.images)
        .pipe(plugins.imagemin({
            optimizationLevel: 5,
            progressive: true,
            interlaced: true
        }))
        .pipe(plugins.rev())
        .pipe(gulp.dest(`${paths.dist}/${clientPath}/assets/images`))
        .pipe(plugins.rev.manifest(`${paths.dist}/${clientPath}/assets/rev-manifest.json`, {
            base: `${paths.dist}/${clientPath}/assets`,
            merge: true
        }))
        .pipe(gulp.dest(`${paths.dist}/${clientPath}/assets`));
});

gulp.task('copy:extras', () => {
    return gulp.src([
        `${clientPath}/favicon.ico`,
        `${clientPath}/robots.txt`,
        `${clientPath}/.htaccess`
    ], { dot: true })
        .pipe(gulp.dest(`${paths.dist}/${clientPath}`));
});

gulp.task('copy:fonts', () => {
    return gulp.src(`${clientPath}/bower_components/font-awesome/fonts/**/*`, { dot: true })
        .pipe(gulp.dest(`${paths.dist}/${clientPath}/bower_components`));
});

gulp.task('copy:assets', () => {
    return gulp.src([paths.client.assets, '!' + paths.client.images])
        .pipe(gulp.dest(`${paths.dist}/${clientPath}/assets`));
});

gulp.task('copy:server', () => {
    return gulp.src([
        'package.json',
        'bower.json',
        '.bowerrc'
    ], {cwdbase: true})
        .pipe(gulp.dest(paths.dist));
});

gulp.task('coverage:pre', () => {
  return gulp.src(paths.server.scripts)
    // Covering files
    .pipe(plugins.istanbul({
        instrumenter: Instrumenter, // Use the isparta instrumenter (code coverage for ES6)
        includeUntested: true
    }))
    // Force `require` to return covered files
    .pipe(plugins.istanbul.hookRequire());
});

gulp.task('coverage:unit', () => {
    return gulp.src(paths.server.test.unit)
        .pipe(mocha())
        .pipe(istanbul())
        // Creating the reports after tests ran
});

gulp.task('coverage:integration', () => {
    return gulp.src(paths.server.test.integration)
        .pipe(mocha())
        .pipe(istanbul())
        // Creating the reports after tests ran
});

gulp.task('mocha:coverage', cb => {
  runSequence('coverage:pre',
              'env:all',
              'env:test',
              'coverage:unit',
              'coverage:integration',
              cb);
});

// Downloads the selenium webdriver
gulp.task('webdriver_update', webdriver_update);

gulp.task('test:e2e', ['env:all', 'env:test', 'start:server', 'webdriver_update'], cb => {
    gulp.src(paths.client.e2e)
        .pipe(protractor({
            configFile: 'protractor.conf.js',
        })).on('error', err => {
            console.log(err)
        }).on('end', () => {
            process.exit();
        });
});

/********************
 * Grunt ported tasks
 ********************/

grunt.initConfig({
    buildcontrol: {
        options: {
            dir: paths.dist,
            commit: true,
            push: true,
            connectCommits: false,
            message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
        },
        heroku: {
            options: {
                remote: 'heroku',
                branch: 'master'
            }
        },
        openshift: {
            options: {
                remote: 'openshift',
                branch: 'master'
            }
        }
    }
});

grunt.loadNpmTasks('grunt-build-control');

gulp.task('buildcontrol:heroku', function(done) {
    grunt.tasks(
        ['buildcontrol:heroku'],    //you can add more grunt tasks in this array
        {gruntfile: false}, //don't look for a Gruntfile - there is none. :-)
        function() {done();}
    );
});
gulp.task('buildcontrol:openshift', function(done) {
    grunt.tasks(
        ['buildcontrol:openshift'],    //you can add more grunt tasks in this array
        {gruntfile: false}, //don't look for a Gruntfile - there is none. :-)
        function() {done();}
    );
});
