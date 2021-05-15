import { weedize } from "weedize";

class Weed365 extends HTMLElement {
  shadow: ShadowRoot;
  constructor() {
    const layout = weedize(new Date("2021-01-01"));
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.shadow.innerHTML = `
      <style></style>
      <div class="kusas">
        ${layout.map((week) =>
          week.map((day) => `<div>${JSON.stringify(day)}</div>`)
        )}
      </div>
    `;
    console.log(this.attributes);
  }
}

customElements.define("weed-365", Weed365);
