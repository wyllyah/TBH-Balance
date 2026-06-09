import {
  Gem,
} from "lucide-react";

export const ITEM_TYPES = [
  { value: "generic", label: "Outro", Icon: Gem },
  {
    value: "sword",
    label: "Arma",
    image: "/assets/item-icons/weapon.png",
  },
  {
    value: "ring",
    label: "Jóias",
    image: "/assets/item-icons/jewelry.png",
  },
  {
    value: "arrow",
    label: "Secundária",
    image: "/assets/item-icons/secondary.png",
  },
  {
    value: "chest",
    label: "Armadura",
    image: "/assets/item-icons/armor.png",
  },
  {
    value: "helmet",
    label: "Capacete",
    image: "/assets/item-icons/helmet.png",
  },
  {
    value: "boots",
    label: "Botas",
    image: "/assets/item-icons/boots.png",
  },
  {
    value: "gloves",
    label: "Luvas",
    image: "/assets/item-icons/gloves.png",
  },
  {
    value: "material",
    label: "Material",
    image: "/assets/item-icons/material.png",
  },
];

export const getItemType = (value) =>
  ITEM_TYPES.find((type) => type.value === value) ?? ITEM_TYPES[0];
