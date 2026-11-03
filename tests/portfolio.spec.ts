import { expect, test, type Page } from "@playwright/test";
import { about, contacts, home, projects } from "@/data/portfolio";
import {
  getActiveSection,
  resolvePortfolioRoute,
} from "@/lib/portfolio-routes";

const routes = [
  { path: "/", endpoint: "/api/home", title: `${home.name}.`, data: home },
  {
    path: "/projects",
    endpoint: "/api/projects",
    title: "Projects",
    data: projects,
  },
  ...projects.map((project) => ({
    path: `/projects/${project.slug}`,
    endpoint: `/api/projects/${project.slug}`,
    title: project.name,
    data: project,
  })),
  { path: "/about", endpoint: "/api/about", title: "About", data: about },
  {
    path: "/contact",
    endpoint: "/api/contact",
    title: "Contact",
    data: contacts,
  },
];

async function navigate(page: Page, section: string) {
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: section, exact: true })
    .click();
  await expect(page).toHaveURL(
    section === "Home" ? "/" : `/${section.toLowerCase()}`,
  );
}

async function readJson(page: Page) {
  return JSON.parse(
    (await page.locator(".json-line > span:last-child").allTextContents()).join(
      "\n",
    ),
  );
}

test("local resolver handles routes, missing projects, and section boundaries", () => {
  for (const route of routes)
    expect(resolvePortfolioRoute(route.path)).toMatchObject({
      endpoint: route.endpoint,
      status: 200,
      data: route.data,
    });
  expect(resolvePortfolioRoute("/projects/").kind).toBe("projects");
  for (const path of [
    "/missing",
    "/projects/missing",
    "/projects/sp-spaces/nested",
  ])
    expect(resolvePortfolioRoute(path)).toMatchObject({
      kind: "not-found",
      status: 404,
    });
  expect(getActiveSection("/projects/sp-spaces")).toBe("projects");
  expect(getActiveSection("/projects-archive")).toBeNull();
});

for (const route of routes) {
  test(`direct URL ${route.path}, minimal Preview, JSON, and refresh`, async ({
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
    await expect(
      page.locator('.request-tabs-strip [aria-current="page"]'),
    ).toHaveAttribute(
      "href",
      route.path.startsWith("/projects/") ? "/projects" : route.path,
    );
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

test("project navigation preserves the four tabs, shell, response tab, and history", async ({
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
  await expect(
    page
      .getByRole("navigation")
      .getByRole("link", { name: "Projects", exact: true }),
  ).toHaveAttribute("aria-current", "page");
  await expect(page.getByRole("navigation").getByRole("link")).toHaveCount(4);
  await expect(
    page.getByRole("navigation").getByRole("link", { name: "SP Spaces" }),
  ).toHaveCount(0);
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

test("four permanent tabs stay available through navigation and refresh", async ({
  page,
}) => {
  await page.goto("/");
  const navigation = page.getByRole("navigation", { name: "Main navigation" });
  for (const section of ["Home", "Projects", "About", "Contact"]) {
    await expect(navigation.getByRole("link")).toHaveCount(4);
    await navigate(page, section);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      section === "Home" ? `${home.name}.` : section,
    );
    await expect(
      navigation.getByRole("link", { name: section, exact: true }),
    ).toHaveAttribute("aria-current", "page");
  }
  await page.reload();
  await expect(navigation.getByRole("link")).toHaveCount(4);
  await expect(navigation.getByRole("button")).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: "Open request", exact: true }),
  ).toHaveCount(0);
});

test("Send resolves locally and obsolete controls stay removed", async ({
  page,
}) => {
  const apiRequests: string[] = [];
  page.on("request", (request) => {
    if (new URL(request.url()).pathname.startsWith("/api/"))
      apiRequests.push(request.url());
  });
  await page.goto("/projects");
  await page.getByRole("button", { name: "Send", exact: true }).click();
  await expect(page.locator(".request-feedback")).toContainText(
    "Local request completed · #1",
  );
  await page.getByRole("tab", { name: "JSON", exact: true }).click();
  expect(await readJson(page)).toEqual(projects);
  await page.getByRole("button", { name: "Send", exact: true }).click();
  await expect(page.locator(".request-feedback")).toContainText("#2");
  expect(await readJson(page)).toEqual(projects);
  await expect(page.getByRole("tab")).toHaveCount(2);
  await expect(page.locator("aside, footer, .desktop-sidebar")).toHaveCount(0);
  await expect(page.locator(".simulated-label")).toHaveCount(1);
  await expect(
    page.locator('.window-controls[aria-hidden="true"] > span'),
  ).toHaveCount(3);
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
  test(`missing resource ${path} retains the client`, async ({ page }) => {
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

test("response tabs and primary navigation work with the keyboard", async ({
  page,
}) => {
  await page.goto("/projects");
  await page.getByRole("tab", { name: "Preview", exact: true }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(
    page.getByRole("tab", { name: "JSON", exact: true }),
  ).toBeFocused();
  expect(await readJson(page)).toEqual(projects);
  const contact = page
    .getByRole("navigation")
    .getByRole("link", { name: "Contact", exact: true });
  await contact.focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL("/contact");
  await expect.poll(() => readJson(page)).toEqual(contacts);
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

test("all four tabs fit without horizontal scrolling at narrow widths", async ({
  page,
}) => {
  await page.goto("/projects");
  const navigation = page.getByRole("navigation", { name: "Main navigation" });
  for (const width of [320, 390, 640, 767, 768, 820, 1024, 1100, 1280]) {
    await page.setViewportSize({ width, height: 568 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    expect(
      await navigation.evaluate(
        (element) => element.scrollWidth <= element.clientWidth,
      ),
    ).toBe(true);
    for (const section of ["Home", "Projects", "About", "Contact"]) {
      await expect(
        navigation.getByRole("link", { name: section, exact: true }),
      ).toBeInViewport({ ratio: 1 });
    }
  }
  await page.setViewportSize({ width: 320, height: 568 });
  await navigate(page, "Contact");
  await expect(
    navigation.getByRole("link", { name: "Contact", exact: true }),
  ).toHaveAttribute("aria-current", "page");
  await navigate(page, "Projects");
  await page.getByRole("tab", { name: "JSON", exact: true }).click();
  const code = page.locator(".json-code");
  expect(
    await code.evaluate(
      (element) =>
        element.scrollWidth > element.clientWidth &&
        element.scrollHeight > element.clientHeight,
    ),
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
