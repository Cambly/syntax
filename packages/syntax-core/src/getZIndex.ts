/**
 * [getZIndex](https://cambly-syntax.vercel.app/?path=/docs/ZIndex--docs) is a utility function that returns a z-index value based on the layer and local layer.
 */
export default function getZIndex(
  /**
   * The layer to get the z-index for.
   *
   * * `base`: 0 // base layer
   * * `menu`: 10 // example: dropdown menus
   * * `sticky`: 20 // example: sticky headers
   * * `fixed`: 30 // example: fixed position elements
   * * `modal`: 40 // example: modals
   * * `popup`: 50 // example: tooltips or popovers
   *
   * @defaultValue `base`
   */
  layer: "base" | "menu" | "sticky" | "fixed" | "modal" | "popup" = "base",
  /**
   * getZIndex recognizes that there are occasional needs to have multiple things stacked in the same layer.
   * For example, two modals existing in the same layer. In these occasions, you can pass a localLayer to the function to manually tweak the z-index within each layer.
   *
   * @defaultValue `0`
   */
  localLayer: -3 | -2 | -1 | 0 | 1 | 2 | 3 = 0,
): number {
  const layerIndex = {
    base: 0,
    menu: 10,
    sticky: 20,
    fixed: 30,
    modal: 40,
    popup: 50,
  };

  return layerIndex[layer] + localLayer;
}
