define(function () {
    "use strict";
    function phoneBook() {
        var partialPath = "src/components/contactList/phoneBook/view/";
        return {
            restrict: 'E',
            templateUrl: partialPath + '_phoneBook.html',
            controller: phoneBookCtrl,
            controllerAs: 'pb', //phoneBook
            bindToController: true
        }
    }

    phoneBookCtrl.$inject = ['contactsSvc'];

    /*@ngInject*/
    function phoneBookCtrl(contactsSvc) {
        var vm = this;
        vm.items = [];
        vm.isReady = false;
        vm.anexo = function(namedoc, index){
            var idx = document.getElementById("a"+index);
            var file = new Blob(['file text'], {type: 'text/plain'});
            idx.href = URL.createObjectURL(file);
            idx.download = namedoc + '.txt';
        };
        contactsSvc.getAllContacts().then(function (data) {
            vm.items = data.items;
            vm.isReady = true;
        }).catch(function () {
            vm.isReady = true;
        });
    }
    return phoneBook;
});
