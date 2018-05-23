define(function () {
    "use strict";
    function undone() {
        var partialPath = "src/components/todo/pending/view/";
        return {
            restrict: 'E',
            templateUrl: partialPath + '_pending.html',
            controller: undoneCtrl,
            controllerAs: 'vm',
            bindToController: true
        }
    }

    undoneCtrl.$inject = ['todoSvc', '$filter', '$timeout'];

    /*@ngInject*/
    function undoneCtrl(todoSvc, $filter, $timeout) {
        var items = [],
            vm = this;
        vm.isReady = false;
        vm.send = false;
        vm.done = function (item) {
            item.done = true;
        };
        vm.getItems = function () {
            items = items.filter(function (item) {
                return !item.done;
            });
            return items;
        };
        vm.add = function (item) {
            items.push({docdescription: item.docdescription, docdate: $filter('date')(item.docdate, "dd/MM/yyyy"), done: false});
            vm.item = {};
        };
        vm.send = function(){
            $timeout(vm.sendTimeout, 3000)
            items = [];
            vm.send = false;            
        };
        vm.sendTimeout = function(){
            return vm.send = true;
        };
        todoSvc.getAllUndone().then(function (data) {
            items = data;
            vm.isReady = true;
        }).catch(function () {
            vm.isReady = true;
        });
    }

    return undone;
});
