// Custom window event fired after any cart mutation so client islands
// (e.g. the nav cart badge) can refresh without a server re-render.
export const CART_CHANGED_EVENT = "reflair:cart-changed";

export function notifyCartChanged() {
    if (typeof window !== "undefined") {
        window.dispatchEvent(new Event(CART_CHANGED_EVENT));
    }
}
