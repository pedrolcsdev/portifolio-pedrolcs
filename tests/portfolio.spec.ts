import { expect, test, type Page } from "@playwright/test";
import { about, contacts, home, projects } from "@/data/portfolio";
import {
  getActiveSection,
  resolvePortfolioRoute,
} from "@/lib/portfolio-routes";

const routes = [
  { path: "/", endpoint: "/api/home", title: home.headline, data: home },
  {
    path: "/projects",
    endpoint: "/api/projects",
    title: "Built behind the scenes.",
    data: projects,
  },
  ...projects.map((project) => ({
    path: `/projects/${project.slug}`,
    endpoint: `/api/projects/${project.slug}`,
    title: project.name,
    data: project,
  })),
  { path: "/about", endpoint: "/api/about", title: about.title, data: about },
  {
    path: "/contact",
    endpoint: "/api/contact",
    title: "Start a conversation.",
    data: contacts,
  },
];

async function navigate(page: Page, section: string) {
  const mobileMenu = page.getByRole("button", { name: "Open navigation" });
  if (await mobileMenu.isVisible()) {
    await mobileMenu.click();
    await page
      .getByRole("dialog")
      .getByRole("link", { name: new RegExp(`^${section}`) })
      .click();
    await expect(page.getByRole("dialog")).toBeHidden();
  } else {
    await page
      .getByRole("navigation")
      .getByRole("link", { name: new RegExp(`^${section}`) })
      .click();
  }
  await expect(page).toHaveURL(
    section === "Home" ? "/" : `/${section.toLowerCase()}`,
  );
}

async function readJson(page: Page) {
  const source = await page
    .locator(".json-line > span:last-child")
    .allTextContents();
  return JSON.parse(source.join("\n"));
}

test("local resolver handles routes, missing projects, and section boundaries", () => {
  for (const route of routes) {
    expect(resolvePortfolioRoute(route.path)).toMatchObject({
      endpoint: route.endpoint,
      status: 200,
      data: route.data,
    });
  }
  expect(resolvePortfolioRoute("/projects/").kind).toBe("projects");
  for (const path of [
    "/missing",
    "/projects/missing",
    "/projects/sp-spaces/nested",
  ]) {
    expect(resolvePortfolioRoute(path)).toMatchObject({
      kind: "not-found",
      status: 404,
    });
  }
  expect(getActiveSection("/projects/sp-spaces")).toBe("projects");
  expect(getActiveSection("/projects-archive")).toBeNull();
});

for (const route of routes) {
  test(`direct URL ${route.path}, Preview/JSON parity, and refresh`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    const response = await page.goto(route.path);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      route.title,
    );
    await expect(
      page.getByRole("textbox", { name: "Simulated request URL" }),
    ).toHaveValue(`https://pedrolcs.dev${route.endpoint}`);
    await expect(page.locator(".http-status")).toHaveText("200 OK");
    await page.getByRole("tab", { name: "JSON", exact: true }).click();
    expect(await readJson(page)).toEqual(route.data);
    await page.getByRole("tab", { name: "Preview", exact: true }).click();
    await page.reload();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      route.title,
    );
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    expect(errors).toEqual([]);
  });
}

test("navigation preserves the shell, response tab, and browser history", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .locator(".app-shell")
    .evaluate((element) =>
      element.setAttribute("data-persistence-check", "preserved"),
    );
  await navigate(page, "Projects");
  await page.getByRole("link", { name: "View project: SP Spaces" }).click();
  await expect(page).toHaveURL(/\/projects\/sp-spaces$/);
  const desktopNav = page.locator(".desktop-sidebar");
  if (await desktopNav.isVisible())
    await expect(desktopNav.locator('[aria-current="page"]')).toContainText(
      "Projects",
    );
  await page.getByRole("tab", { name: "JSON", exact: true }).click();
  await navigate(page, "About");
  await expect(
    page.getByRole("tab", { name: "JSON", exact: true }),
  ).toHaveAttribute("data-state", "active");
  await expect.poll(() => readJson(page)).toEqual(about);
  await expect(page.locator(".app-shell")).toHaveAttribute(
    "data-persistence-check",
    "preserved",
  );
  await page.goBack();
  await expect(page).toHaveURL(/\/projects\/sp-spaces$/);
  await expect.poll(() => readJson(page)).toEqual(projects[0]);
  await page.goForward();
  await expect(page).toHaveURL(/\/about$/);
  await expect.poll(() => readJson(page)).toEqual(about);
});

test("Send resolves locally, request headers work, and contact links stay empty", async ({
  page,
}) => {
  const apiRequests: string[] = [];
  page.on("request", (request) => {
    if (new URL(request.url()).pathname.startsWith("/api/"))
      apiRequests.push(request.url());
  });
  await page.goto("/projects");
  await page.getByRole("button", { name: "Send", exact: true }).click();
  await expect(page.getByRole("status")).toContainText(
    "Local request completed · #1",
  );
  await page.getByRole("tab", { name: "JSON", exact: true }).click();
  expect(await readJson(page)).toEqual(projects);
  await page.getByRole("button", { name: "Send", exact: true }).click();
  await expect(page.locator(".request-feedback")).toContainText("#2");
  expect(await readJson(page)).toEqual(projects);
  await page.getByRole("tab", { name: "Headers" }).click();
  await expect(page.locator(".header-pair")).toHaveText(
    "Acceptapplication/json",
  );
  await navigate(page, "Contact");
  await page.getByRole("tab", { name: "Preview", exact: true }).click();
  await expect(page.locator(".contact-empty")).toBeVisible();
  await expect(page.locator(".contact-list a")).toHaveCount(0);
  expect(apiRequests).toEqual([]);
});

test("system theme, manual toggle, and persisted preference", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveClass(/dark/);
  await page.getByRole("button", { name: /Switch to light theme/ }).click();
  await expect(page.locator("html")).toHaveClass(/light/);
  await page.reload();
  await expect(page.locator("html")).toHaveClass(/light/);
  await page.getByRole("button", { name: /Switch to light theme/ }).click();
  await expect(page.locator("html")).toHaveClass(/dark/);
  await page.emulateMedia({ colorScheme: "light" });
  await page.evaluate(() => localStorage.removeItem("theme"));
  await page.reload();
  await expect(page.locator("html")).toHaveClass(/light/);
});

for (const path of ["/projects/missing", "/unknown/route"]) {
  test(`missing resource ${path} retains the client and returns an error response`, async ({
    page,
  }) => {
    await page.goto(path);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "This endpoint doesn’t exist.",
    );
    await expect(page.locator(".http-status")).toHaveText("404 Not Found");
    await page.getByRole("tab", { name: "JSON", exact: true }).click();
    expect(await readJson(page)).toMatchObject({ error: "NOT_FOUND" });
    await page.getByRole("button", { name: "Send", exact: true }).click();
    await expect(page.locator(".http-status")).toHaveText("404 Not Found");
    await page.getByRole("tab", { name: "Preview", exact: true }).click();
    await page.getByRole("link", { name: "Back to home" }).click();
    await expect(page).toHaveURL("/");
  });
}

test("keyboard tabs and mobile menu escape", async ({ page }) => {
  await page.goto("/projects");
  await page.getByRole("tab", { name: "Preview", exact: true }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(
    page.getByRole("tab", { name: "JSON", exact: true }),
  ).toBeFocused();
  expect(await readJson(page)).toEqual(projects);
  const menu = page.getByRole("button", { name: "Open navigation" });
  if (await menu.isVisible()) {
    await menu.click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toBeHidden();
    await expect(menu).toBeFocused();
  }
});

test("copy returns the exact JSON and reports clipboard errors", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/projects");
  await page.getByRole("tab", { name: "JSON", exact: true }).click();
  await page.getByRole("button", { name: "Copy JSON", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "JSON copied", exact: true }),
  ).toBeVisible();
  expect(
    JSON.parse(await page.evaluate(() => navigator.clipboard.readText())),
  ).toEqual(projects);
  await page.evaluate(() => {
    navigator.clipboard.writeText = async () => {
      throw new Error("Clipboard unavailable");
    };
  });
  await page.getByRole("button", { name: "JSON copied", exact: true }).click();
  await expect(page.locator(".clipboard-feedback")).toHaveText(
    "Copy unavailable. Select the JSON to copy it.",
  );
});

test("320px viewport contains page overflow and scrolls responses internally", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto("/projects");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  const content = page.locator(".preview-content");
  expect(
    await content.evaluate(
      (element) => element.scrollHeight > element.clientHeight,
    ),
  ).toBe(true);
  await content.evaluate((element) => {
    element.scrollTop = element.scrollHeight;
  });
  await expect(
    page.getByRole("link", { name: "View project: Gestão Portuária" }),
  ).toBeInViewport();
  await page.getByRole("tab", { name: "JSON", exact: true }).click();
  expect(
    await page
      .locator(".json-code")
      .evaluate((element) => element.scrollWidth > element.clientWidth),
  ).toBe(true);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.getByRole("button", { name: "Send", exact: true }).click();
  await expect(page.locator(".request-feedback")).toContainText(
    "Local request completed",
  );
});
