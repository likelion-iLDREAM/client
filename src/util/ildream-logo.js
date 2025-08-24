import ildream from "./../assets/ildream.svg";
import ildreamText from "./../assets/ildreamText.svg";

export function getLogo(ildreamId) {
  switch (ildreamId) {
    case 1:
      return ildream;
    case 2:
      return ildreamText;
    default:
      return null;
  }
}
