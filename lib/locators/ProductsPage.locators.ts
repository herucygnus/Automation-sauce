
import cssEscape from 'css.escape';

export const ProductsPageLocators = {
  titlePage: '.title',
  headerLabel: '.header_label',
  burgerMenu: '#react-burger-menu-btn',
  aboutSidebarLink: '#about_sidebar_link',
  shoppingCartLink: '.shopping_cart_link',
  shoppingCartBadge: '.shopping_cart_badge',
  inventoryList: '.inventory_list',
  itemName: '.inventory_item_name ',
  itemDesc: '.inventory_item_desc',
  itemImage: '.inventory_item_img',
  itemPrice: '.inventory_item_price',
  addCart_Button: (productName: string) => {
    const formattedName = cssEscape(productName.toLowerCase().replace(/ /g, '-'));
    return `#add-to-cart-${formattedName}`;
  },
};