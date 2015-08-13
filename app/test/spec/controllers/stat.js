'use strict';

describe('Controller: StatCtrl', function () {

  // load the controller's module
  beforeEach(module('ngSlimSampleApp'));

  var StatCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StatCtrl = $controller('StatCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(StatCtrl.awesomeThings.length).toBe(3);
  });
});
