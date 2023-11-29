import { h } from '@stencil/core/internal/client';

const Hint = ({ text }) => text ? h("p", { class: "form-field-hint tw-mt-2 tw-text-sm tw-text-gray-500" }, text) : undefined;

export { Hint as H };

//# sourceMappingURL=hint.js.map