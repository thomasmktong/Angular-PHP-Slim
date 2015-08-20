'use strict';

describe('Service: accService', function () {

  // load the service's module
  beforeEach(module('ngSlimSampleApp'));

  // instantiate service
  var accService;
  beforeEach(inject(function (_accService_) {
    accService = _accService_;
  }));

  it('should do something', function () {
    expect(!!accService).toBe(true);
  });

});
