import React from "react";
import { shallow } from "enzyme";
import TableUser from "./TableUser";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
describe("TableUser", () => {
  let wrapper;
  const users = [
    {
      id: "e28d290a-a2f2-48c2-9001-ff43884e271b",
      timestamp: new Date("2020/2/14").getTime(),
      diff: [{ field: "name", oldValue: "John", newValue: "Bruce" }],
    }
  ];
  beforeEach(() => {
    wrapper = shallow(<TableUser users={users} />);
  });

  it("should render table user ", () => {
    render(wrapper);
    expect(screen.getByText("Date")).toBeInTheDocument();
    expect(screen.getByText("User ID")).toBeInTheDocument();
    expect(screen.getByText("Old Value")).toBeInTheDocument();
    expect(screen.getByText("New Value")).toBeInTheDocument();
    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("Bruce")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Load More" }));
  });
  it("should render loading icon in the table ", () => {
    render(<TableUser users={users} loading hasError />);
    expect(screen.getByTestId("loading-icon")).toBeInTheDocument();
  });
  it("should render an error message in the table ", () => {
    render(
      <TableUser
        users={users}
        hasError
        errorMessage="We had problems fetching your data. Please try again."
      />
    );
    expect(
      screen.getByText("We had problems fetching your data. Please try again.")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Retry" }));
  });
});
