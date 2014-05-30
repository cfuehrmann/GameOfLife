"use strict";
require.config({
    paths: {
        'QUnit': 'Scripts/qunit'
    },
    shim: {
        'QUnit': {
            exports: 'QUnit',
            init: function () {
                QUnit.config.autoload = false;
                QUnit.config.autostart = false;
            }
        }
    }
});

require(['QUnit', 'ArraySceneTests'], function (QUnit, arraySceneTests) {
    arraySceneTests.run();

    QUnit.load();
    QUnit.start();
});

