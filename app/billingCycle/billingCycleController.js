(function(){
    angular.module('primeiraApp').controller('billingCycleCtrl',[
        '$http',
        'msgs',
        BillingCycleController
    ])

    function BillingCycleController($http, msgs) {
        const vm = this
        const url = 'http://localhost:3003/api/billingCycles'

        vm.refresh = () => {
            $http.get(url).then(function(response) {
                vm.billingCycle = {}
                vm.billingCycles = response.data
            }, function(response) {
                msgs.addError(response.data.errors)
            })   
        }
        
        vm.create = () => {
            $http.post(url, vm.billingCycle).then(function(response) {
                vm.refresh()
                msgs.addSucess('Operação realizada com sucesso!')
            }, function(response) {
                msgs.addError(response.data.errors)
            })
        }

        vm.refresh()
    }
})()