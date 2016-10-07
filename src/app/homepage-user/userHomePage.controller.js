'use strict';
angular.module('nodeInAction')
.controller('UserHomePageCtrl', function (Calendar) {
    var vm = this;
    
    vm.getOneMonth = function (date) {
        var events = [];
        Calendar.getOneMonth(date).success(function (res) {
            angular.forEach(res, function (val, key) {
                if (val.events.length > 0) {
                    angular.forEach(val.events, function (event, key) {

                        // 取得_id相同的事件
                        var origin = _.find(events, {_id: event._id}); 
                        if (origin) {
                            val.events[key] = origin;
                        } else {
                            events.push(event);
                        }
                    });
                }
            });
            vm.dates = res;
            vm.titleDate = res[26].date;
        });
    };

    vm.getNextMonth = function () {
        vm.getOneMonth(vm.dates[41].date + 24 * 3600 * 1000);
    };

    vm.getPreviewMonth = function () {
        vm.getOneMonth(vm.dates[0].date - 24 * 3600 * 1000);
    };

    vm.addBackground = function (event) {
        angular.forEach(vm.dates, function (date) {
            if (_.find(date.events, {_id: event._id})) {
                date.background = 1;
            } 
        });
    };

    vm.removeBackground = function () {
        angular.forEach(vm.dates, function (date) {
            date.background = 0;        
        });
    }

    vm.getOneMonth(new Date().getTime());
});