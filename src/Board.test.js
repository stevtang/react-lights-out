import Board, { createBoard } from "./Board";
import { render } from "@testing-library/react";


describe("test the initial board is set up", function () {
  it("test createBoard()", function () {
    const { container } = render(<Board nrows={5} ncols={5} chanceLightStartsOn={.1} />);
    // expect(container.querySelector())
    console.log(container.board);
  })
})