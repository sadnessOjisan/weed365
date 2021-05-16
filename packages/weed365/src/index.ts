import { weedizeTo } from "weedize";

class Weed365 extends HTMLElement {
  shadow: ShadowRoot;
  constructor() {
    super();
    const endDate = this.getAttribute("date");
    if (endDate === null) throw new Error("should set endDate");

    const layout = weedizeTo(new Date(endDate));

    const kusasString = this.getAttribute("kusas");
    if (kusasString === null) throw new Error("should set kusasString");
    const kusas = JSON.parse(kusasString);
    const values = (Object.values(kusas) as any) as number[]; // TODO: validation
    const max = values.reduce((a, b) => {
      const max = Math.max(a, b);
      if (isNaN(max)) {
        console.log("a, b", a, b);
      }
      return max;
    });
    console.log(max);
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
      <style>
      .month{
        display:flex;
      }
      .week{
        display: flex;
        flex-direction: column;
      }
      .day{
        width: 11px;
        height: 11px;
        margin-top: 6px;
        margin-left: 6px;
        outline: 1px solid hsl(210deg 13% 12% / 6%);
      }
      .fill {
        background: rgb(33 110 57);
      }
      .zero {
        background: #ebedf0;
      }
      </style>
      <div class="month">
        ${kusaLayout
          .map(
            (week) =>
              `<div class="week">
          ${week
            .map(
              (day) =>
                `<div class="day ${day === undefined ? "empty" : "fill"} ${
                  day !== undefined && day.value === 0 ? "zero" : ""
                }" style="opacity: ${
                  day === undefined ? 0 : day.value === 0 ? 1 : day.value
                };"></div>`
            )
            .join(" ")}
          </div>`
          )
          .join(" ")}
      </div>
    `;
  }
}

customElements.define("weed-365", Weed365);