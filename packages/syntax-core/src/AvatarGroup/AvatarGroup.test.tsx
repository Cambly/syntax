import { screen, render } from "@testing-library/react";
import AvatarGroup from "./AvatarGroup";
import Avatar from "../Avatar/Avatar";

describe("avatarGroup", () => {
  it("renders successfully", () => {
    const baseElement = render(
      <AvatarGroup>
        <Avatar accessibilityLabel="Joseph Liotta" src="image.png" />
      </AvatarGroup>,
    );
    expect(baseElement).toBeTruthy();
  });
  it("renders images with the correct labels", async () => {
    render(
      <AvatarGroup>
        <Avatar accessibilityLabel="Joseph Liotta" src="image.png" />
        <Avatar accessibilityLabel="Empty Avatar 1" src="image.png" />
        <Avatar accessibilityLabel="Empty Avatar 2" src="image.png" />
      </AvatarGroup>,
    );
    const image1 = await screen.findByAltText("Joseph Liotta");
    expect(image1 instanceof HTMLImageElement).toBeTruthy();
    const image2 = await screen.findByAltText("Empty Avatar 1");
    expect(image2 instanceof HTMLImageElement).toBeTruthy();
  });
});
