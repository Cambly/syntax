export function classicColor(
  color:
    | "primary"
    | "secondary"
    | "tertiary"
    | "destructive-primary"
    | "destructive-secondary"
    | "destructive-tertiary"
    | "branded"
    | "success"
    | "success-primary"
    | "success-secondary"
    | "success-tertiary"
    | "inverse",
):
  | "primary"
  | "secondary"
  | "tertiary"
  | "destructive-primary"
  | "destructive-secondary"
  | "branded"
  | "success"
  | "inverse" {
  if (color === "destructive-tertiary") {
    return "destructive-secondary";
  } else if (
    color === "success-primary" ||
    color === "success-secondary" ||
    color === "success-tertiary"
  ) {
    return "success";
  }
  return color;
}

export function cambioColor(
  color:
    | "primary"
    | "secondary"
    | "tertiary"
    | "destructive-primary"
    | "destructive-secondary"
    | "destructive-tertiary"
    | "branded"
    | "success"
    | "success-primary"
    | "success-secondary"
    | "success-tertiary"
    | "inverse",
):
  | "primary"
  | "secondary"
  | "tertiary"
  | "destructive-primary"
  | "destructive-secondary"
  | "destructive-tertiary"
  | "branded"
  | "success-primary"
  | "success-secondary"
  | "success-tertiary" {
  if (color === "success") {
    return "success-primary";
  }
  // TODO - validate with AJ
  else if (color === "inverse") {
    return "secondary";
  }
  return color;
}
