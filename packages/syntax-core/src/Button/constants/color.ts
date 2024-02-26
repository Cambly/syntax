export function classicColor(
  color:
    | "primary"
    | "secondary"
    | "tertiary"
    | "quaternary"
    | "destructive-primary"
    | "destructive-secondary"
    | "destructive-tertiary"
    | "branded"
    | "success"
    | "success-primary"
    | "success-secondary"
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
  if (color === "quaternary") {
    return "inverse";
  } else if (color === "destructive-tertiary") {
    return "destructive-secondary";
  } else if (color === "success-primary" || color === "success-secondary") {
    return "success";
  }
  return color;
}

export function cambioColor(
  color:
    | "primary"
    | "secondary"
    | "tertiary"
    | "quaternary"
    | "destructive-primary"
    | "destructive-secondary"
    | "destructive-tertiary"
    | "branded"
    | "success"
    | "success-primary"
    | "success-secondary"
    | "inverse",
):
  | "primary"
  | "secondary"
  | "tertiary"
  | "quaternary"
  | "destructive-primary"
  | "destructive-secondary"
  | "branded"
  | "success-primary"
  | "success-secondary" {
  if (color === "success") {
    return "success-primary";
  } else if (color === "destructive-tertiary") {
    return "destructive-secondary";
  } else if (color === "inverse") {
    return "quaternary";
  }
  return color;
}
