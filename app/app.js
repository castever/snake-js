requirejs.config({
    baseUrl: 'lib',
    shim: {
        underscore: {
            exports: '_'
        }
    },
    paths: {
    	underscore: 'underscore',
        app: '../app'
    }
});

requirejs(['app/main', 'underscore']);
