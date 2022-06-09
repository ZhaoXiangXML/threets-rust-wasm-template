
console.log("before import");
import * as wasm from '../target/pkg'

console.log("after import");
describe("test", function () {
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