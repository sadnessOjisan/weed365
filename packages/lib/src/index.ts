import { weedize } from "weedize";

class Weed365 extends HTMLElement {
  shadow: ShadowRoot;
  constructor() {
    super();
    const start = this.getAttribute("start");
    if (start === null) throw new Error("should set start");

    const layout = weedize(new Date(start));

    console.log(layout);
    const kusasString = this.getAttribute("kusas");
    if (kusasString === null) throw new Error("should set kusasString");
    const kusas = JSON.parse(kusasString);
    const values = (Object.values(kusas) as any) as number[]; // TODO: validation
    const max = values.reduce((a, b) => Math.max(a, b));
    const kusaLayout = layout.map((week) => {
      return week.map((dateString) => {
        if (dateString === undefined) return undefined;
        const date = dateString as Date;
        const YYYYMMDD = `${date.getFullYear()}-${(date.getMonth() + 1)
          .toString()
          .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
        const value = kusas[YYYYMMDD] ?? 0;
        return { date: dateString, value: value / max };
      });
    });
    this.shadow = this.attachShadow({ mode: "open" });
    this.shadow.innerHTML = `
      <style></style>
      <div class="kusas">
        ${kusaLayout.map((week) =>
          week.map((day) => `<div>${JSON.stringify(day)}</div>`)
        )}
      </div>
    `;
  }
}

customElements.define("weed-365", Weed365);
