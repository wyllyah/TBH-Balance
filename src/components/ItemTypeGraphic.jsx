import { createElement } from "react";
import { getItemType } from "../itemTypes";

export default function ItemTypeGraphic({ type, size = 20 }) {
  const itemType = getItemType(
    typeof type === "string" ? type : type?.value,
  );

  if (itemType.image) {
    return (
      <img
        className="item-type-image"
        src={itemType.image}
        alt=""
        width={size}
        height={size}
      />
    );
  }

  return createElement(itemType.Icon, { size, strokeWidth: 1.8 });
}
