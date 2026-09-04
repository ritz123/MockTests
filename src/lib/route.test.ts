import { describe, expect, it } from "vitest";
import { routeParam } from "./route";

describe("routeParam", () => {
  it("returns a string id", () => {
    expect(routeParam("quant-basics-01")).toBe("quant-basics-01");
  });

  it("uses the first value when Next.js passes an array", () => {
    expect(routeParam(["paper-a", "paper-b"])).toBe("paper-a");
  });

  it("returns undefined when the param is missing", () => {
    expect(routeParam(undefined)).toBeUndefined();
  });
});
