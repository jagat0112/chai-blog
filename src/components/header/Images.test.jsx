import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Images from "./Images";
import service from "../../appwrite/config";

jest.mock("../../appwrite/config", () => ({
  __esModule: true,
  default: { previewFile: jest.fn() },
}));

test("shows a placeholder when there is no fileId", () => {
  render(<Images fileId={null} alt="no image" />);
  expect(screen.getByRole("img", { name: "no image" })).toBeInTheDocument();
});

test("renders the resolved preview url once loaded", async () => {
  service.previewFile.mockResolvedValueOnce({
    href: "https://example.com/a.png",
  });
  render(<Images fileId="abc123" alt="cup of tea" />);
  const img = await screen.findByAltText("cup of tea");
  expect(img.tagName).toBe("IMG");
  expect(img.src).toBe("https://example.com/a.png");
});

test("falls back to a placeholder when the preview lookup fails", async () => {
  service.previewFile.mockResolvedValueOnce(undefined);
  render(<Images fileId="broken" alt="broken image" />);
  await waitFor(() =>
    expect(
      screen.getByRole("img", { name: "broken image" })
    ).toBeInTheDocument()
  );
});

test("falls back to a placeholder when the <img> itself errors out", async () => {
  service.previewFile.mockResolvedValueOnce({
    href: "https://example.com/dead-link.png",
  });
  render(<Images fileId="dead" alt="dead link" />);
  const img = await screen.findByAltText("dead link");
  img.dispatchEvent(new Event("error"));
  await waitFor(() => {
    expect(screen.getByLabelText("dead link").tagName).toBe("DIV");
  });
});
