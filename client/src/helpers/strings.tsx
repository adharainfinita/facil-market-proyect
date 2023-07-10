import { LiaHomeSolid } from "react-icons/lia";
import { MdOutlineManageAccounts, MdOutlineSell } from "react-icons/md";
import { HiUserGroup } from "react-icons/hi";
import { BiSolidShoppingBags, BiLogOut } from "react-icons/bi";
import { BsBagCheck, BsCartCheck } from "react-icons/bs";

export const navBarOptions = [
  { category: "Inicio", id: 1, to: "/" },
  { category: "Productos", id: 2, to: "/products" },
  { category: "Nosotros", id: 3, to: "/about" },
  { category: "Vender", id: 4, to: "/vender" },
];

export const modalNavBar = [
  {
    id: 1,
    category: "Inicio",
    icon: <LiaHomeSolid />,
    to: "/",
    login: false,
  },
  {
    id: 2,
    category: "Productos",
    icon: <BiSolidShoppingBags />,
    to: "/products",
    login: false,
  },
  {
    id: 3,
    category: "Nosotros",
    icon: <HiUserGroup />,
    to: "/about",
    login: false,
  },
  {
    id: 4,
    category: "Vender",
    icon: <MdOutlineSell />,
    to: "/vender",
    login: false,
  },
  {
    id: 5,
    category: "Mi Perfil",
    icon: <MdOutlineManageAccounts />,
    to: "/profile",
    login: true,
  },
  {
    id: 6,
    category: "Mi Productos",
    icon: <BsBagCheck />,
    to: "/ventas",
    login: true,
  },
  {
    id: 7,
    category: "Mi compras",
    icon: <BsCartCheck />,
    to: "/compras",
    login: true,
  },
  {
    id: 8,
    category: "Cerrar Sesión",
    icon: <BiLogOut />,
    to: "/",
    logOut: true,
    login: true,
  },
];
