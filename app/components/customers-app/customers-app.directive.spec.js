describe('test.customers-app.directive.js', function () {
    beforeEach(module('customers-app'));

    var scope, directive;
    beforeEach(inject(function (directiveBuilder) {
        directive = directiveBuilder.$build('<app></app>')
    }));

    it('should have a defined scope', function () {
        expect(scope).toBeDefined();
    });
});