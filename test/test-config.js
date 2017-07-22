describe('Paths', function() {
    afterEach(function () {
        nautilus.resetConfig();
    });

    describe('resetConfig', function() {
        context('reseting a nautilus configuration', function() {
            it('should return reset configuration', function() {
                expect(nautilus.getConfig().origins.length).to.be.equal(0);
                expect(Object.keys(nautilus.getConfig()['paths']).length)
                    .to.be.equal(0);

                nautilus.config({
                    origins: ['https://mydomain.com'],
                    paths: {
                        'someDep': 'dep.js'
                    }
                });

                expect(nautilus.getConfig().origins)
                    .to.include('https://mydomain.com');
                expect(nautilus.getConfig()['paths'])
                    .to.have.all.keys('someDep');
                expect(nautilus.getConfig().origins.length).to.be.equal(1);
                expect(Object.keys(nautilus.getConfig()['paths']).length)
                    .to.be.equal(1);

                nautilus.resetConfig();
                expect(nautilus.getConfig().origins.length).to.be.equal(0);
                expect(Object.keys(nautilus.getConfig()['paths']).length)
                    .to.be.equal(0);
            });
        });
    });

    describe('namespaces', function() {
        beforeEach(function() {
            nautilus.resetConfig();
        });

        context('creating a inexistent namespace', function() {
            it('should return a specified path', function() {
                expect(Object.keys(nautilus.getConfig()['paths']).length).to.be.equal(0);
                var expectedPaths = {
                    'jquery': 'http://urltojqueryscript.min.js'
                };

                nautilus.config({
                    paths: expectedPaths
                });

                var config = nautilus.getConfig();
                expect(config.paths).to.have.all.keys('jquery');
                expect(config.paths['jquery']).to.eql(expectedPaths['jquery']);
            });
        });

        context('creating a existent namespace', function() {
            it('should overwrite the existent namespace', function() {
                expect(Object.keys(nautilus.getConfig()['paths']).length).to.be.equal(0);
                var expectedPaths = {
                    'jquery': 'http://urltojqueryscript.min.js'
                };

                nautilus.config({
                    paths: expectedPaths
                });

                var config = nautilus.getConfig();
                expect(config.paths).to.have.all.keys('jquery');
                expect(config.paths['jquery']).to.eql(expectedPaths['jquery']);

                var newExpectedPaths = {
                    'jquery': 'local/jquery.js'
                };

                nautilus.config({
                    paths: newExpectedPaths
                });

                var config = nautilus.getConfig();
                expect(config.paths).to.have.all.keys('jquery');
                expect(config.paths['jquery']).to.eql(newExpectedPaths['jquery']);
            });
        });

        context('creating a existent namespace in a list', function() {
            it('should overwrite only the specifed namespace', function() {
                expect(Object.keys(nautilus.getConfig()['paths']).length).to.be.equal(0);
                var expectedPaths = {
                    'jquery': 'http://urltojqueryscript.min.js',
                    'lodash': 'local/lodash'
                };

                nautilus.config({
                    paths: expectedPaths
                });

                var config = nautilus.getConfig();
                expect(config.paths).to.have.all.keys('jquery', 'lodash');
                expect(config.paths['jquery']).to.eql(expectedPaths['jquery']);
                expect(config.paths['lodash']).to.eql(expectedPaths['lodash']);

                var newExpectedPaths = {
                    'jquery': 'local/jquery.js'
                };

                nautilus.config({
                    paths: newExpectedPaths
                });

                var config = nautilus.getConfig();
                expect(config.paths).to.have.all.keys('jquery', 'lodash');
                expect(config.paths['jquery']).to.eql(newExpectedPaths['jquery']);
                expect(config.paths['lodash']).to.eql(expectedPaths['lodash']);
            });
        });
    });

    context('add new origin to the list', function () {
        it('should add a new origin each time config is called', function () {
            expect(nautilus.getConfig().origins.length).to.be.equal(0);

            nautilus.config({
                origins: ['https://mydomain.com']
            });

            expect(nautilus.getConfig().origins.length).to.be.equal(1);

            nautilus.config({
                origins: ['https://myotherdomain.com']
            });

            expect(nautilus.getConfig().origins.length).to.be.equal(2);

            expect(nautilus.getConfig().origins).to.include(
                'https://mydomain.com',
                'https://myotherdomain.com'
            );
        });
    });
});
