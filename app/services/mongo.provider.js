angular.module('mongolab-factory', [
    'ngResource'
]).provider('mongolabCustomers', function (mongolabConfigs) {
    this.$get = function ($resource) {
        var c = mongolabConfigs;
        var url = [c.mongolabUrl, c.dataBase, 'collections', 'customers', ':id'].join('/');
        return $resource(url, {apiKey: c.apiKey}, {
            update: {method: 'PUT'}
        });
    };

}).provider('mongolabOrders', function (mongolabConfigs) {    this.$get = function ($resource) {
        var c = mongolabConfigs;
        var url = [c.mongolabUrl, c.dataBase, 'collections', 'orders', ':id'].join('/');
        return $resource(url, {apiKey: c.apiKey}, {
            update: {method: 'PUT'}
        });
    };

}).constant('mongolabConfigs',  {
    mongolabUrl: 'https://api.mongolab.com/api/1/databases',
    collection: 'orders',
    dataBase: 'kirov-db',
    apiKey: 'PcuAcq0p7LM9Xjpt1FPN6jULOn30EVae'
});