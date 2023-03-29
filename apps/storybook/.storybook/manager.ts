import { addons } from "@storybook/addons";
import syntaxTheme from "./syntaxTheme";

const link = document.createElement("link");
link.setAttribute("rel", "shortcut icon");
link.setAttribute("href", "favicon.ico");
document.head.appendChild(link);

addons.setConfig({
  theme: syntaxTheme,
});
