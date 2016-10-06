import "../utils"
import { expect } from "chai"
import { Resource } from "../../src/resources/Resource"

describe("Resource", () => {
    it("should compile correct urls", () => {
        const asserts = [
            ["/foo", {}, "/foo"],
            ["/foo/:id", { id : 1 }, "/foo/1"],
            ["/foo/:id", {}, "/foo/:id"],
            ["/foo/:id", {}, "/foo/:id"],
            ["/foo/:fooId/bar", {}, "/foo/:fooId/bar"],
            ["/foo/:fooId/bar", { fooId : 1 }, "/foo/1/bar"],
            ["/foo/:fooId/bar/:id", { fooId : 1, id : 1 }, "/foo/1/bar/1"],
            ["/(foo/:fooId/)bar/:id", { fooId : 1, id : 1 }, "/foo/1/bar/1"],
            ["/(foo/:fooId/)bar/:id", { id : 1 }, "/bar/1"]
        ]

        asserts.forEach((a: any) => {
            expect(Resource.compilePath(a[0], a[1])).to.equal(a[2])
        })
    })
})