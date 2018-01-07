(function(){
    angular.module('primeiraApp').controller('billingCycleCtrl',[
        '$http',
        'msgs',
        'tabs',
        BillingCycleController
    ])

    function BillingCycleController($http, msgs, tabs) {
        const vm = this
        const url = 'http://localhost:3003/api/billingCycles'

        vm.refresh = () => {
            $http.get(url).then(function(response) {
                vm.billingCycle = { credits: [{}], debts: [{}] }
                vm.billingCycles = response.data
                tabs.show(vm, { tabList: true, tabCreate: true })
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

        vm.showTabUpdate = (billingCycle) => {
            vm.billingCycle = billingCycle
            tabs.show(vm, { tabUpdate: true })
        }

        vm.showTabDelete = (billingCycle) => {
            vm.billingCycle = billingCycle
            tabs.show(vm, { tabDelete: true })
        }

        vm.delete = () => {
            const deleteUrl = `${url}/${vm.billingCycle._id}`
            $http.delete(deleteUrl, vm.billingCycle).then(function(response) {
                vm.refresh()
                msgs.addSucess('Operação realizada com sucesso!')
            }, function(response) {
                msgs.addError(response.data.errors)
            })
        }

        vm.update = () => {
            const updateUrl = `${url}/${vm.billingCycle._id}`
            $http.put(updateUrl, vm.billingCycle).then(function(response) {
                vm.refresh()
                msgs.addSucess('Operação realizada com sucesso!')
            }, function(response) {
                msgs.addError(response.data.errors)
            })
        }
        
        vm.refresh()
    }
})()