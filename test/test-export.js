describe("Exports", function() {
    context('on nautilus existing in current context', function() {
        it('should return a valid nautilus behavior', function() {
            expect(nautilus).to.be.a('function');
            expect(nautilus.config).to.be.a('function');
            expect(nautilus.getConfig).to.be.a('function');
            expect(nautilus.resetConfig).to.be.a('function');
        });
    });
});