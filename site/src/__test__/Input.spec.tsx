import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Input from "../components/Input";
import User from "@testing-library/user-event";

test("Input", async () => {
  const message = "This is a test for miracle lab";
  const setValue = jest.fn();
  render(
    <Input
      buttonName="Test button"
      placeholder="This is a test"
      setValue={setValue}
    ></Input>
  );
  const input = screen.getByPlaceholderText(/this is a test/i);
  const button = screen.getByRole("button", { name: /test button/i });
  await User.type(input, message);
  await User.click(button);
  expect(setValue).toHaveBeenCalledWith(message);
});
