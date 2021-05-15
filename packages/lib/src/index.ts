class Weed365 extends HTMLElement {
  shadow;
  constructor() {
    super();
    // 1. HTMLから分離されたノード(ShadowDOM)を作成する。
    //    これで、親のドキュメントのCSSなどに影響されない環境を作成できます。
    this.shadow = this.attachShadow({ mode: "open" });
    // 2. 今の時間を表示する h1 エレメントを ShadowDOM 下に作成する。
    const now = new Date();
    const clockElement = document.createElement("h1");
    clockElement.textContent = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
    this.shadow.append(clockElement);
  }
}

customElements.define("weed-365", Weed365);
