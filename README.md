# Product - React Hooks and Context API Exercise

Du an demo shopping product duoc xay dung bang React, TypeScript va Vite. Muc tieu chinh la thuc hanh React Hooks, Context API, reducer, routing, localStorage va toi uu render voi `useMemo`, `useCallback`, debounce va virtualized list.
# Link demo: https://drive.google.com/file/d/16CgZV5aXzD02Rc4UUX4_5rux6oUji2qY/view?usp=sharing
## Tech Stack

- React 19
- TypeScript
- Vite
- React Router DOM
- React Window
- Tailwind CSS
- Context API
- useReducer
- localStorage

## Project Structure

```txt
src/
  App.tsx
  main.tsx
  index.css
  components/
    header/
      index.tsx
    productCart/
      index.tsx
    searchBox/
      index.tsx
  constants/
    grid.ts
  contexts/
    cart/
      cartContext.ts
      cartProvider.tsx
    theme/
      themeContext.ts
      themeProvider.tsx
    user/
      userContext.ts
      userProvider.tsx
  hooks/
    useCart.ts
    useDebounce.ts
    useResponsiveColumns.ts
    useTheme.ts
    useUser.ts
  layout/
    index.tsx
  pages/
    cart/
      index.tsx
    home/
      index.tsx
    login/
      index.tsx
  reducers/
    cart/
      index.ts
  router/
    index.tsx
  types/
    cart.type.ts
    product.type.ts
    user.type.ts
  utils/
    formatCurrency.ts
    generateProducts.ts
```

## Main Features

- Hien thi danh sach 1000 san pham fake.
- Tim kiem san pham theo ten.
- Filter san pham theo category.
- Virtualized grid de render danh sach lon muot hon.
- Responsive grid tu 1 den 4 columns tuy kich thuoc man hinh.
- Dang nhap bang user co san trong `types/user.type.ts`.
- Them, xoa, tang, giam so luong san pham trong cart.
- Cart rieng theo tung user.
- Luu user, cart va theme vao `localStorage`.
- Toggle light/dark theme.

## App Entry Flow

`main.tsx` render `App` vao DOM:

```txt
main.tsx
  -> App.tsx
    -> ThemeProvider
      -> UserProvider
        -> CartProvider
          -> RouterProvider
```

Thu tu provider nay quan trong vi `CartProvider` can doc user hien tai thong qua `useUser()` de gan cart item theo `userId`.

## Routing Flow

Router duoc khai bao trong `src/router/index.tsx`.

```txt
/       -> Layout -> Home
/cart   -> Layout -> Cart
/login  -> Login
```

`Layout` render `Header` va `Outlet`. Cac page nam trong layout se dung chung header.

## Data Flow

### Product List

```txt
Home
  -> generateProducts(1000)
  -> categories duoc tao tu product.category
  -> SearchBox cap nhat search va selectedCategory
  -> useDebounce(search)
  -> filteredProducts
  -> React Window Grid
  -> ProductCard
```

Product khong lay tu API, ma duoc tao o `src/utils/generateProducts.ts`. Moi product co:

- `id`
- `name`
- `price`
- `image`
- `category`
- `description`

### Search and Category Filter

`SearchBox` nhan cac props:

- `value`
- `onChange`
- `categories`
- `selectedCategory`
- `onCategoryChange`

Logic filter nam trong `Home`:

```txt
products
  -> filter theo debouncedSearch
  -> filter theo selectedCategory
  -> filteredProducts
```

Neu category la `All`, app hien tat ca san pham. Neu chon category cu the, app chi hien san pham co `product.category` trung voi category do.

### Cart Flow

```txt
ProductCard
  -> onAddToCart(product)
  -> Home.handleAddToCart
  -> useCart().addProduct(product)
  -> CartProvider dispatch ADD_PRODUCT
  -> cartReducer update state
  -> localStorage luu cart
```

Cart state duoc quan ly bang `useReducer`. Reducer nam trong `src/reducers/cart/index.ts`.

Cart actions:

- `ADD_PRODUCT`
- `REMOVE_PRODUCT`
- `INCREASE_QUANTITY`
- `DECREASE_QUANTITY`
- `CLEAR_CART`

Moi cart item co them:

- `quantity`
- `userId`

Nho `userId`, moi user se thay gio hang rieng cua minh.

### User Flow

```txt
Login
  -> validate form
  -> tim user trong userList
  -> updateUser(user)
  -> luu user vao localStorage
  -> navigate("/")
```

`UserProvider` doc user ban dau tu `localStorage`. Neu logout, user se bi xoa khoi state va `localStorage`.

### Theme Flow

```txt
ThemeProvider
  -> doc theme tu localStorage
  -> neu chua co thi dung prefers-color-scheme
  -> gan data-theme len document.documentElement
  -> CSS variables doi mau theo theme
```

Theme duoc quan ly trong `ThemeProvider`, con mau sac duoc dinh nghia bang CSS variables trong `src/index.css`.

## Important Hooks

- `useUser`: doc `UserContext`, dung cho login/logout va lay user hien tai.
- `useCart`: doc `CartContext`, dung cho cart actions va cart totals.
- `useTheme`: doc `ThemeContext`, dung cho toggle theme.
- `useDebounce`: tri hoan gia tri search de tranh filter lai qua nhieu khi nguoi dung dang go.
- `useResponsiveColumns`: dung `ResizeObserver` de tinh so column cua product grid theo width.

## Performance Notes

- `useMemo` duoc dung de:
  - tao product list mot lan
  - tao category list
  - tinh filtered products
  - tinh cart totals
  - memo context value
- `useCallback` duoc dung cho cac handler nhu add/remove cart, login related actions va add to cart.
- `react-window` chi render cac product dang nam trong viewport, giup danh sach 1000 san pham van nhe.
- `useDebounce` giam so lan filter khi search input thay doi lien tuc.

## Local Storage Keys

- `user`: user dang dang nhap.
- `cart`: toan bo cart state.
- `theme`: theme hien tai, gom `light` hoac `dark`.

## Run Project

Install dependencies:

```bash
npm install
```

Run dev server:

```bash
npm run dev
```

Build production:

```bash
npm run build
```

Run lint:

```bash
npm run lint
```
