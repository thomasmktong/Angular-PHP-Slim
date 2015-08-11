'use strict';

describe('Controller: UserCtrl', function () {

  // load the controller's module
  beforeEach(module('ngSlimSampleApp'));

  var UserCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UserCtrl = $controller('UserCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(UserCtrl.awesomeThings.length).toBe(3);
  });
});
