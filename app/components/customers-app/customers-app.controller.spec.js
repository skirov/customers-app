describe('test.customers-app.controller', function () {
    beforeEach(module('customers-app', function ($provide) {
        $provide.factory('mongolabFactory', function ($q) {
            return {
                'get': function () {
                    return object;
                },
                'save': function (bookmark) {
                    var mockedPromise = $q.defer();
                    bookmark._id = {"$oid": "1234"}
                    mockedPromise.resolve(bookmark);
                    return {
                        $promise: mockedPromise.promise
                    };
                },

                'update': function (id, bookmark) {
                    var mockedPromise = $q.defer();
                    mockedPromise.resolve(bookmark);
                    return {
                        $promise: mockedPromise.promise
                    };
                },

                'remove': function (id) {
                    var mockedPromise = $q.defer();
                    mockedPromise.resolve({
                        "_id" : {"$oid" : "952"},
                        "title": "Some JavaScript framework3",
                        "url": "http://www.jsframework.org2",
                        "tags": ['ala3', 'bala3', 'nica3']
                    });
                    return {
                        $promise: mockedPromise.promise
                    };
                },

                'query': function () {
                    var mockedPromise = $q.defer();
                    mockedPromise.resolve([
                        {
                            "_id" : {"$oid" : "456"},
                            "title": "Some JavaScript framework",
                            "url": "http://www.jsframework.org",
                            "tags": ['ala', 'bala']
                        },
                        {
                            "_id" : {"$oid" : "678"},
                            "title": "Some JavaScript framework2",
                            "url": "http://www.jsframework.org2",
                            "tags": ['ala2', 'bala', 'ala3']
                        },
                        {
                            "_id" : {"$oid" : "952"},
                            "title": "Some JavaScript framework3",
                            "url": "http://www.jsframework.org3",
                            "tags": ['ala3', 'bala3', 'nica3']
                        }
                    ]);
                    return {
                        $promise: mockedPromise.promise
                    };
                }
            }
        });
    }));

    var controller, scope;
    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();
        controller = $controller('customersApp', {$scope: scope});
    }));


    it('should save bookmark', function () {
        scope.bookmarkModel = {
            "title": "Some JavaScript framework",
            "url": "http://www.jsframework.org",
            "tags": 'Javascript, Framework'
        };

        controller.saveBookmark(scope.bookmarkModel).then(function () {
            expect(scope.customersList.length).toBe(4);
        });

        scope.$digest();
    });


    it('should edit bookmark', function () {
        scope.bookmarkModel = {
            "_id" : {"$oid" : "678"},
            "title": "Edited title",
            "url": "http://www.jsframework.org",
            "tags": 'ala, bala'
        };

        controller.editBookmark(scope.bookmarkModel).then(function() {
            expect(scope.customersList[1].title).toBe('Edited title');
        });

        scope.$digest();
    });


    it('should delete bookmark', function() {
        scope.bookmarkModel = {
            "_id" : {"$oid" : "952"},
            "title": "Some JavaScript framework3",
            "url": "http://www.jsframework.org2",
            "tags": ['ala3', 'bala3', 'nica3']
        };

        controller.deleteBookmark(scope.bookmarkModel).then(function() {
            expect(scope.customersList.length).toBe(2);
        });

        scope.$digest();
    });
});