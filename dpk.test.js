const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns Hash with maximum Length of 256", () => {
    const hash = deterministicPartitionKey('1');
    expect(hash.length).toBeLessThanOrEqual(256);
  });

  it("Returns a hashed value instead of the original value", () => {
    data = 'testing'
    const hash = deterministicPartitionKey(data);
    expect(hash).not.toEqual(data);
  });

  it("Returns something, probaly a hash", () => {
    const hash = deterministicPartitionKey('something');
    expect(hash).toBeTruthy();
  });
});
