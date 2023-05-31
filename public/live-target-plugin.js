alert('Hello from live target plugin');

class Y extends X {
  constructor() {
    super();

    console.log('foo', this.foo);

    // expect('foo' in this).toBe(true);
    // expect(this.foo).toBe(0);
    // expect(this.hasFooFromOutside()).toBe(true);
    // expect(this.getFooFromOutside()).toBe(0);
    this.foo = 9;

    console.log('outsiode', this.getFooFromOutside());

    // expect(this.foo).toBe(9);
    // expect(this.getFooFromOutside()).toBe(9);

    this.incrementFooFromOutside();
    console.log('outside', this.getFooFromOutside());

    // expect(this.foo).toBe(10);
    // expect(this.getFooFromOutside()).toBe(10);
  }
}
new Y();
// createYFromOutside(Y);
