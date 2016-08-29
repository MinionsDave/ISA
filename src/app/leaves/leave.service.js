'use strict';
angular.module('nodeInAction')
.service('Leave', function ($http, Config) {
    this.add = function (leave) {

        /*
         * 上午指00:00，不需要再加
         * 中午指12:00
         * 晚上指第二天00:00
        */
        switch (leave.startSection) {
            case '中午':
                leave.startDate = new Date(leave.startDate.getTime() + 12 * 3600);
                break;
            case '下午':
                leave.startDate = new Date(leave.startDate.getTime() + 24 * 3600);
                break;
        }
        switch (leave.endSection) {
            case '中午':
                leave.endDate = new Date(leave.endDate.getTime() + 12 * 3600)
                break;
            case '下午':
                leave.endDate = new Date(leave.endDate.getTime() + 24 * 3600)
                break;
        }
        return $http.post(Config.URL + '/leave', leave);
    };
});