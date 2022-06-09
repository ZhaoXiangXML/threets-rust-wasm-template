
console.log("before import");

let wasm : typeof import('../target/pkg');

describe("test", function () {
    before(async function () {
        wasm = await import('../target/pkg');
        console.log("after import");
    });
    it("should be ok", function () {
        console.log("test 1");
        expect(wasm.get_color()).to.be("#F5D742");
    }),
    it("should be also ok", function () {
        console.log("test 2");
        expect(1).to.be(1);
    })
})

console.log("end of file");