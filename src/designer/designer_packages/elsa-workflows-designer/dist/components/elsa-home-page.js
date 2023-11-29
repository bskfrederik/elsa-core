import { proxyCustomElement, HTMLElement, h, getAssetPath } from '@stencil/core/internal/client';
import { s as state, a as state$1 } from './toolbar-component-store.js';
import { a as DropdownButtonOrigin, d as defineCustomElement$2 } from './dropdown-button.js';

const homePageCss = "";

const HomePage = /*@__PURE__*/ proxyCustomElement(class HomePage extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
  }
  async componentWillLoad() {
    var _a;
    const mainItem = (_a = state$1.mainItem) !== null && _a !== void 0 ? _a : {
      text: 'New'
    };
    state.components = [() => h("elsa-dropdown-button", { items: state$1.items, text: mainItem.text, handler: mainItem.handler, origin: DropdownButtonOrigin.TopRight })];
  }
  render() {
    const visualPath = getAssetPath('./assets/elsa-breaking-barriers-undraw.svg');
    return (h("div", { class: "home-wrapper tw-relative tw-bg-gray-800 tw-overflow-hidden tw-h-screen" }, h("main", { class: "tw-mt-16 sm:tw-mt-24" }, h("div", { class: "tw-mx-auto tw-max-w-7xl" }, h("div", { class: "lg:tw-grid lg:tw-grid-cols-12 lg:tw-gap-8" }, h("div", { class: "tw-px-4 sm:tw-px-6 sm:tw-text-center md:tw-max-w-2xl md:tw-mx-auto lg:tw-col-span-6 lg:tw-text-left lg:tw-flex lg:tw-items-center" }, h("div", { class: "home-caption-wrapper" }, h("h1", { class: "tw-mt-4 tw-text-4xl tw-tracking-tight tw-font-extrabold tw-text-white sm:tw-mt-5 sm:tw-leading-none lg:tw-mt-6 lg:tw-text-5xl xl:tw-text-6xl" }, h("span", { class: "md:tw-block" }, " Welcome to ", h("span", { class: 'tw-text-blue-500 md:tw-block' }, "Elsa Workflows"), " ", h("span", null, "3.0"))), h("p", { class: "tagline tw-mt-3 tw-text-base tw-text-gray-300 sm:tw-mt-5 sm:tw-text-xl lg:tw-text-lg xl:tw-text-xl" }, "Decoding the future."))), h("div", { class: "tw-mt-16 sm:tw-mt-24 lg:tw-mt-0 lg:tw-col-span-6" }, h("div", { class: "sm:tw-max-w-md sm:tw-w-full sm:tw-mx-auto sm:tw-rounded-lg sm:tw-overflow-hidden" }, h("div", { class: "tw-px-4 tw-py-8 sm:tw-px-10" }, h("img", { class: "home-visual", src: visualPath, alt: "", width: 400 })))))))));
  }
  static get assetsDirs() { return ["assets"]; }
  static get style() { return homePageCss; }
}, [0, "elsa-home-page"]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["elsa-home-page", "elsa-dropdown-button"];
  components.forEach(tagName => { switch (tagName) {
    case "elsa-home-page":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, HomePage);
      }
      break;
    case "elsa-dropdown-button":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const ElsaHomePage = HomePage;
const defineCustomElement = defineCustomElement$1;

export { ElsaHomePage, defineCustomElement };

//# sourceMappingURL=elsa-home-page.js.map