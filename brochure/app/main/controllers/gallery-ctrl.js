'use strict';
angular.module('main')
.controller('GalleryCtrl', function (Products) {
    var vm = this;

    vm.opts = {
        index: 0,
        history: false
    };

    vm.slides = Products;
    // vm.slides = [{
    //     src: 'main/assets/images/1.jpeg',
    //     w: 1024, h: 678,
    //     title: '地中海风格大床<br>￥1,899.00',
    //     name: '地中海风格大床',
    //     price: '1,899.00'
    // },{
    //     src: 'main/assets/images/2.jpeg',
    //     w: 1024, h: 678,
    //     title: '地中海风格大床<br>￥1,899.00',
    //     name: '地中海风格大床',
    //     price: '1,899.00'
    // },{
    //     src: 'main/assets/images/3.jpeg',
    //     w: 1024, h: 678,
    //     title: '地中海风格大床<br>￥1,899.00',
    //     name: '地中海风格大床',
    //     price: '1,899.00'
    // },{
    //     src: 'main/assets/images/4.jpeg',
    //     w: 1024, h: 678,
    //     title: '地中海风格大床<br>￥1,899.00',
    //     name: '地中海风格大床',
    //     price: '1,899.00'
    // },{
    //     src: 'main/assets/images/5.jpeg',
    //     w: 1024, h: 678,
    //     title: '地中海风格大床<br>￥1,899.00',
    //     name: '地中海风格大床',
    //     price: '1,899.00'
    // },{
    //     src: 'main/assets/images/6.jpeg',
    //     w: 1024, h: 678,
    //     title: '地中海风格大床<br>￥1,899.00',
    //     name: '地中海风格大床',
    //     price: '1,899.00'
    // },{
    //     src: 'main/assets/images/7.jpeg',
    //     w: 1024, h: 678,
    //     title: '地中海风格大床<br>￥1,899.00',
    //     name: '地中海风格大床',
    //     price: '1,899.00'
    // },{
    //     src: 'main/assets/images/8.jpeg',
    //     w: 1024, h: 678,
    //     title: '地中海风格大床<br>￥1,899.00',
    //     name: '地中海风格大床',
    //     price: '1,899.00'
    // },{
    //     src: 'main/assets/images/9.jpeg',
    //     w: 1024, h: 678,
    //     title: '地中海风格大床<br>￥1,899.00',
    //     name: '地中海风格大床',
    //     price: '1,899.00'
    // },{
    //     src: 'main/assets/images/10.jpeg',
    //     w: 1024, h: 678,
    //     title: '地中海风格大床<br>￥1,899.00',
    //     name: '地中海风格大床',
    //     price: '1,899.00'
    // },{
    //     src: 'main/assets/images/11.jpeg',
    //     w: 1024, h: 678,
    //     title: '地中海风格大床<br>￥1,899.00',
    //     name: '地中海风格大床',
    //     price: '1,899.00'
    // },{
    //     src: 'main/assets/images/12.jpeg',
    //     w: 1024, h: 678,
    //     title: '地中海风格大床<br>￥1,899.00',
    //     name: '地中海风格大床',
    //     price: '1,899.00'
    // },{
    //     src: 'main/assets/images/13.jpeg',
    //     w: 1024, h: 678,
    //     title: '地中海风格大床<br>￥1,899.00',
    //     name: '地中海风格大床',
    //     price: '1,899.00'
    // },{
    //     src: 'main/assets/images/14.jpeg',
    //     w: 1024, h: 678,
    //     title: '地中海风格大床<br>￥1,899.00',
    //     name: '地中海风格大床',
    //     price: '1,899.00'
    // },{
    //     src: 'main/assets/images/15.jpeg',
    //     w: 1024, h: 678,
    //     title: '地中海风格大床<br>￥1,899.00',
    //     name: '地中海风格大床',
    //     price: '1,899.00'
    // },{
    //     src: 'main/assets/images/16.jpeg',
    //     w: 1024, h: 678,
    //     title: '地中海风格大床<br>￥1,899.00',
    //     name: '地中海风格大床',
    //     price: '1,899.00'
    // },{
    //     src: 'main/assets/images/17.jpeg',
    //     w: 1024, h: 678,
    //     title: '地中海风格大床<br>￥1,899.00',
    //     name: '地中海风格大床',
    //     price: '1,899.00'
    // },{
    //     src: 'main/assets/images/18.jpeg',
    //     w: 1024, h: 678,
    //     title: '地中海风格大床<br>￥1,899.00',
    //     name: '地中海风格大床',
    //     price: '1,899.00'
    // },{
    //     src: 'main/assets/images/19.jpeg',
    //     w: 1024, h: 678,
    //     title: '地中海风格大床<br>￥1,899.00',
    //     name: '地中海风格大床',
    //     price: '1,899.00'
    // },{
    //     src: 'main/assets/images/20.jpeg',
    //     w: 1024, h: 678,
    //     title: '地中海风格大床<br>￥1,899.00',
    //     name: '地中海风格大床',
    //     price: '1,899.00'
    // },];

    vm.showGallery = function (i) {
        if(angular.isDefined(i)) {
            vm.opts.index = i;
        }
        vm.open = true;
    };

    vm.closeGallery = function () {
        vm.open = false;
    };

});
