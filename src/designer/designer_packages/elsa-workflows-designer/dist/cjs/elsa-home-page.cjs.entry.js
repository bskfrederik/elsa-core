'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-2c400919.js');
const toolbarComponentStore = require('./toolbar-component-store-27cb56e9.js');
const models = require('./models-06a27d45.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./index-d016c735.js');

const homePageCss = "";

const HomePage = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  async componentWillLoad() {
    var _a;
    const mainItem = (_a = toolbarComponentStore.state$1.mainItem) !== null && _a !== void 0 ? _a : {
      text: 'New'
    };
    toolbarComponentStore.state.components = [() => index.h("elsa-dropdown-button", { items: toolbarComponentStore.state$1.items, text: mainItem.text, handler: mainItem.handler, origin: models.DropdownButtonOrigin.TopRight })];
  }
  render() {
    const visualPath = index.getAssetPath('./assets/elsa-breaking-barriers-undraw.svg');
    return (index.h("div", { class: "home-wrapper tw-relative tw-bg-gray-800 tw-overflow-hidden tw-h-screen" }, index.h("main", { class: "tw-mt-16 sm:tw-mt-24" }, index.h("div", { class: "tw-mx-auto tw-max-w-7xl" }, index.h("div", { class: "lg:tw-grid lg:tw-grid-cols-12 lg:tw-gap-8" }, index.h("div", { class: "tw-px-4 sm:tw-px-6 sm:tw-text-center md:tw-max-w-2xl md:tw-mx-auto lg:tw-col-span-6 lg:tw-text-left lg:tw-flex lg:tw-items-center" }, index.h("div", { class: "home-caption-wrapper" }, index.h("h1", { class: "tw-mt-4 tw-text-4xl tw-tracking-tight tw-font-extrabold tw-text-white sm:tw-mt-5 sm:tw-leading-none lg:tw-mt-6 lg:tw-text-5xl xl:tw-text-6xl" }, index.h("span", { class: "md:tw-block" }, " Welcome to ", index.h("span", { class: 'tw-text-blue-500 md:tw-block' }, "Elsa Workflows"), " ", index.h("span", null, "3.0"))), index.h("p", { class: "tagline tw-mt-3 tw-text-base tw-text-gray-300 sm:tw-mt-5 sm:tw-text-xl lg:tw-text-lg xl:tw-text-xl" }, "Decoding the future."))), index.h("div", { class: "tw-mt-16 sm:tw-mt-24 lg:tw-mt-0 lg:tw-col-span-6" }, index.h("div", { class: "sm:tw-max-w-md sm:tw-w-full sm:tw-mx-auto sm:tw-rounded-lg sm:tw-overflow-hidden" }, index.h("div", { class: "tw-px-4 tw-py-8 sm:tw-px-10" }, index.h("img", { class: "home-visual", src: visualPath, alt: "", width: 400 })))))))));
  }
  static get assetsDirs() { return ["assets"]; }
};
HomePage.style = homePageCss;

exports.elsa_home_page = HomePage;

//# sourceMappingURL=elsa-home-page.cjs.entry.js.map