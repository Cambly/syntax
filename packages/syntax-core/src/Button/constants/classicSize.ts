export default function classicSize(
  size: "sm" | "md" | "lg" | "xl",
): "sm" | "md" | "lg" {
  return size === "xl" ? "lg" : size;
}
