describe('Spies check execution of nautilus', function () {
  it("should nautilus execution once", function () {
    var spy = sinon.spy(nautilus(['dep1', 'dep2']))
    spy();
    expect(spy.callCount).to.be.equal(1);
  });

  it("should check nautilus execution twice", function () {
    var spy = sinon.spy(nautilus(['dep1', 'dep2']))
    spy();
    spy();
    expect(spy.callCount).to.be.equal(2);
  });
});