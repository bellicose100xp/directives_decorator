/**
 * Created by admin on 2/5/2015.
 */
angular.module('myApp', []);
angular.module('myApp').controller('mainController', function ($scope) {
    var mc = this;
    mc.messages = [];
    mc.i = 1;
    mc.pauseHandler = function (event) {
        console.log(event);
        mc.messages.push({text: 'paused#' + mc.i});
        console.log("The video has been paused!");
        mc.i++;
    };
    mc.data = {message: "I have not been clicked yet!"}
    mc.clickHandler = function (data_from_view) {
       data_from_view.message = "I have been clicked" ;
    };
    mc.user1 = {
        name: "Scope Test",
        selected: false
    };
});
angular.module('myApp').directive('spacebarSupport', function ($document) {
    return {
        link: function (scope, element, attrs) {
            var vidEl = element[0];
            $('body').on('keypress', function (event) {
                if (event.keyCode === 32) {
                    if (vidEl.paused) {
                        vidEl.play();
                    }
                    else {
                        vidEl.pause();
                    }
                }
            });


        }
    }
});
angular.module('myApp').directive('eventPause', function ($parse) {
    return {
        link: function (scope, element, attrs) {
            var fn = $parse(attrs['eventPause']);
            element.on('pause', function (event) {
                scope.$apply(function () {
                        fn(scope, {event: event});
                    });
            })
        }
    }
});
angular.module('myApp').directive('myClick', function ($parse) {
    return {
        link: function (scope, element, attrs) {
            var fn = $parse(attrs['myClick']);
            element.on('click', function (event) {
                scope.$apply( function () {
                        fn(scope);
                    }
                )
            })
        }
    }
});
angular.module('myApp').directive('userTiles', function () {
    return {
        scope: {
            user: '='
        },
        templateUrl: 'userTile.html'
    }
});
angular.module('myApp').directive('userTileSelect', function () {
    return {
        link: function (scope, element, attrs) {
            element.on('click', function (event) {
               scope.user.selected = !scope.user.selected;
                scope.$apply();
            })
        }
    }
});