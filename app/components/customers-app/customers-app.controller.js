angular.module('customers-app').controller('customersApp', function ($scope, mongolabFactory) {

    var that = this;
    $scope.customersList = [];
    $scope.tagsList = {};

    $scope.bookmarkModel = {
        url : '',
        title : '',
        tags : ''
    };

    $scope.currentTag = 'none';

    this.getAllcustomers = function() {
        return mongolabFactory.query().$promise;
    };

    this.deleteBookmark = function (bookmark) {
        return mongolabFactory.remove({id: bookmark._id.$oid}).$promise.then(function (data) {
            $scope.customersList = $scope.customersList.filter(function (bm) {
                return bm._id.$oid !== data._id.$oid;
            });

            bookmark.tags.forEach(function (tag) {
                var customersInTag = $scope.tagsList[tag];
                if(customersInTag.length == 1) {
                    delete $scope.tagsList[tag];
                    return;
                }
                customersInTag.forEach(function(bookmarkInTag, index) {
                    if(bookmarkInTag._id.$oid == data._id.$oid) {
                        $scope.tagsList[tag].splice(index, 1);
                        return;
                    }
                })
            });
        });
    };

    this.editBookmark = function(bookmark) {
        if(!(bookmark.tags instanceof String)) {
            bookmark.tags = bookmark.tags.split(',');
            that.createTags(bookmark);
        }
        return mongolabFactory.update({id: bookmark._id.$oid}, bookmark).$promise.then(function (data) {
            that.mapTags(data.tags, data);
            $scope.customersList.forEach(function(bm) {
                if(bm._id.$oid == data._id.$oid) {
                    angular.extend(bm, data);
                }
            });
            that.clearForm();
        });
    };

    this.saveBookmark = function(bookmark) {
        bookmark.tags = bookmark.tags.split(',');
        that.createTags(bookmark);
        return mongolabFactory.save(bookmark).$promise.then(function (data) {
            that.mapTags(data.tags, data);
            $scope.customersList.push(data);
            that.clearForm();
        });
    };

    this.fillForm = function(bookmarkFromList) {
        angular.extend($scope.bookmarkModel, bookmarkFromList);
    };

    this.clearForm = function () {
        $scope.bookmarkModel = {
            url : '',
            title : '',
            tags : ''
        };
    };

    this.mapTags = function(tags, bookmark) {
        tags.forEach(function(tag) {
            if(!$scope.tagsList[tag]) {
                $scope.tagsList[tag] = [bookmark]
            } else {
                $scope.tagsList[tag].push(bookmark);
            }
        });
    };

    this.createTags = function(bookmark) {
        bookmark.tags.filter(function (tag) {
            var _tag = tag.trim();
            return _tag.length !== 0;
        }).map(function(tag) {
            return tag.trim();
        });
    };

    this.filterByTag = function(tagTitle, customersForTag) {
        $scope.currentTag = tagTitle;
        $scope.customersList = customersForTag;
    };

    this.getAllcustomers().then(function (data) {
        $scope.customersList = data;
        data.forEach(function(bookmark) {
            that.mapTags(bookmark.tags, bookmark);
        });
    });
});