import { test, expect } from "@playwright/test";

test("Verify that the add button adds a todo", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Ajouter" }).click(); // getByTestId("...") instead of getByRole() or getByPlaceholder() & .first() (data-tes-id="..." in the component)
  await page.getByPlaceholder("Ajouter une todo").fill("Test Todo");
  await page.getByRole("combobox").selectOption("EN COURS");
  await page.getByRole("button", { name: "Ajouter" }).click();
  const todoItem = page.getByText("Test Todo");
  await expect(todoItem).toBeVisible();
});

test("Verify that the update button updates a todo", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Modifier" }).first().click(); // getByTestId("...") instead of getByRole() or getByPlaceholder() & .first() (data-tes-id="..." in the component)
  await page
    .getByPlaceholder("Ajouter une todo")
    .fill("Hello la todo (updated)");
  await page.getByRole("combobox").selectOption("EN COURS");
  await page.getByRole("button", { name: "Modifier" }).click();

  const todoItem = page.getByText("Hello la todo (updated)");
  await expect(todoItem).toBeVisible();

  const row = page.getByText("Hello la todo (updated)").locator("../..");
  const statusCell = row.getByRole("cell").nth(1);
  await expect(statusCell).toHaveText("EN COURS");
});

test("Verify that the todo list is not empty", async ({ page }) => {
  await page.goto("/");
  const rows = page.getByTestId("row");
  const length = await rows.count();
  expect(length).toBeGreaterThan(0);
});

test("Verify that the delete button deletes a todo", async ({ page }) => {
  await page.goto("/");

  const row = page.getByTestId("row").first();
  const label = await row.getByRole("cell").first().textContent();

  const deleteButton = row.getByTestId("delete-button").first();
  await deleteButton.click();
  const todoItem = page.getByText(label || "");
  await expect(todoItem).toBeHidden();
});
