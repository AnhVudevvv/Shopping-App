# Product - Bài Tập React Hooks, Context API Và Redux Toolkit

Dự án demo shopping product được xây dựng bằng React, TypeScript và Vite. Mục tiêu chính là thực hành React Hooks, Redux Toolkit, Context API, routing, localStorage và tối ưu render với `useMemo`, `useCallback`, debounce và virtualized list.

## Link Demo

https://drive.google.com/file/d/1waBbYujgBOxrYL7bobp4wBkvbjny_M8y/view?usp=sharing

## Link Deploy

https://shoppingappppp.netlify.app/

## Tài Khoản Demo

```txt
tranvu051004@gmail.com | 123456
vu174657@gmail.com     | 123456
```

## Công Nghệ Sử Dụng

- React 19
- TypeScript
- Vite
- Redux Toolkit
- React Redux
- React Router DOM
- React Window
- Tailwind CSS
- Context API cho theme
- localStorage

## Cấu Trúc Dự Án

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
      cartContext.ts        # legacy, không còn dùng trong app hiện tại
      cartProvider.tsx      # legacy, không còn dùng trong app hiện tại
    theme/
      themeContext.ts
      themeProvider.tsx
    user/
      userContext.ts        # legacy, không còn dùng trong app hiện tại
      userProvider.tsx      # legacy, không còn dùng trong app hiện tại
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
      index.ts              # legacy reducer, không còn dùng trong app hiện tại
  router/
    index.tsx
  store/
    index.ts
    hook.ts
    cart/
      cartSlice.ts
    user/
      userSlice.ts
  types/
    cart.type.ts
    product.type.ts
    user.type.ts
  utils/
    formatCurrency.ts
    generateProducts.ts
```

## Tính Năng Chính

- Hiển thị danh sách 1000 sản phẩm fake.
- Tìm kiếm sản phẩm theo tên.
- Lọc sản phẩm theo category.
- Dùng virtualized grid để render danh sách lớn mượt hơn.
- Responsive grid từ 1 đến 4 columns tùy kích thước màn hình.
- Đăng nhập bằng user có sẵn trong `src/types/user.type.ts`.
- Quản lý user state bằng Redux Toolkit.
- Quản lý cart state bằng Redux Toolkit.
- Thêm, xóa, tăng, giảm số lượng sản phẩm trong cart.
- Cart riêng theo từng user.
- Lưu user, cart và theme vào `localStorage`.
- Toggle light/dark theme bằng Context API.

## Luồng Khởi Tạo App

`main.tsx` render `App` vào DOM và bọc app bằng Redux Provider:

```txt
main.tsx
  -> Provider store={store}
    -> App.tsx
      -> ThemeProvider
        -> RouterProvider
```

`Provider` của `react-redux` giúp các component và custom hook có thể đọc/dispatch Redux state.

`ThemeProvider` vẫn được giữ lại vì theme là state đơn giản và tách biệt với user/cart.

## Luồng Redux Store

Redux store được khai báo trong `src/store/index.ts`.

```txt
store
  -> user: userReducer
  -> cart: cartReducer
```

State shape chính:

```txt
state.user.user
state.cart.cartItems
```

`src/store/hook.ts` tạo typed hooks:

- `useAppDispatch`
- `useAppSelector`

Hai hook này giúp TypeScript hiểu đúng type của Redux state và dispatch.

## Luồng User

User state được quản lý trong `src/store/user/userSlice.ts`.

```txt
Login
  -> validate form
  -> tìm user trong userList
  -> useUser().updateUser(user)
  -> dispatch updateUser
  -> state.user.user được cập nhật
  -> store.subscribe lưu user vào localStorage
  -> navigate("/")
```

Actions trong `userSlice`:

- `updateUser`
- `logout`

`useUser` là custom hook nằm ở `src/hooks/useUser.ts`. Hook này đã chuyển sang dùng Redux, nhưng vẫn giữ API cũ:

```txt
useUser()
  -> user
  -> updateUser
  -> logout
```

Nhờ vậy các component như `Header`, `Login`, `Home`, `Cart` không cần đọc Redux trực tiếp.

## Luồng Cart

Cart state được quản lý trong `src/store/cart/cartSlice.ts`.

```txt
ProductCard
  -> onAddToCart(product)
  -> Home.handleAddToCart
  -> useCart().addProduct(product)
  -> dispatch addProduct({ product, userId })
  -> cartSlice update state.cart.cartItems
  -> store.subscribe lưu cart vào localStorage
```

Actions trong `cartSlice`:

- `addProduct`
- `removeProduct`
- `increaseQuantity`
- `decreaseQuantity`
- `clearCart`

Mỗi cart item có thêm:

- `quantity`
- `userId`

Nhờ `userId`, mỗi user sẽ thấy giỏ hàng riêng của mình.

`useCart` là custom hook nằm ở `src/hooks/useCart.ts`. Hook này đọc Redux state và tính các giá trị phụ trợ:

- `cartItems`
- `currentUserCartItems`
- `totalQuantity`
- `totalPrice`

Hook này cũng expose các cart actions cho component:

- `addProduct`
- `removeProduct`
- `increaseQuantity`
- `decreaseQuantity`
- `clearCart`

## Luồng Danh Sách Sản Phẩm

```txt
Home
  -> generateProducts(1000)
  -> categories được tạo từ product.category
  -> SearchBox cập nhật search và selectedCategory
  -> useDebounce(search)
  -> filteredProducts
  -> React Window Grid
  -> ProductCard
```

Product không lấy từ API, mà được tạo ở `src/utils/generateProducts.ts`. Mỗi product có:

- `id`
- `name`
- `price`
- `image`
- `category`
- `description`

## Tìm Kiếm Và Lọc Category

`SearchBox` nhận các props:

- `value`
- `onChange`
- `categories`
- `selectedCategory`
- `onCategoryChange`

Logic filter nằm trong `Home`:

```txt
products
  -> filter theo debouncedSearch
  -> filter theo selectedCategory
  -> filteredProducts
```

Nếu category là `All`, app hiển thị tất cả sản phẩm. Nếu chọn category cụ thể, app chỉ hiển thị sản phẩm có `product.category` trùng với category đó.

## Luồng Theme

Theme vẫn được quản lý bằng Context API trong `src/contexts/theme/themeProvider.tsx`.

```txt
ThemeProvider
  -> đọc theme từ localStorage
  -> nếu chưa có thì dùng prefers-color-scheme
  -> gắn data-theme lên document.documentElement
  -> CSS variables đổi màu theo theme
```

Màu sắc được định nghĩa bằng CSS variables trong `src/index.css`.

## Các Hook Quan Trọng

- `useUser`: đọc Redux user state, dùng cho login/logout và lấy user hiện tại.
- `useCart`: đọc Redux cart state, dispatch cart actions và tính cart totals.
- `useTheme`: đọc `ThemeContext`, dùng cho toggle theme.
- `useDebounce`: trì hoãn giá trị search để tránh filter lại quá nhiều khi người dùng đang gõ.
- `useResponsiveColumns`: dùng `ResizeObserver` để tính số column của product grid theo width.

## Ghi Chú Hiệu Năng

- `useMemo` được dùng để:
  - tạo product list một lần
  - tạo category list
  - tính filtered products
  - tính cart items của user hiện tại
  - tính cart totals
- `useCallback` được dùng cho các handler như add/remove cart, login related actions và add to cart.
- `react-window` chỉ render các product đang nằm trong viewport, giúp danh sách 1000 sản phẩm vẫn nhẹ.
- `useDebounce` giảm số lần filter khi search input thay đổi liên tục.
- Redux Toolkit giúp gom logic update user/cart vào slice, dễ debug và mở rộng hơn khi app lớn lên.

## Local Storage Keys

- `user`: user đang đăng nhập.
- `cart`: toàn bộ cart state.
- `theme`: theme hiện tại, gồm `light` hoặc `dark`.

## Các File Context Legacy

Project hiện vẫn giữ lại các file Context/reducer cũ để đối chiếu với version trước:

- `src/contexts/user/userContext.ts`
- `src/contexts/user/userProvider.tsx`
- `src/contexts/cart/cartContext.ts`
- `src/contexts/cart/cartProvider.tsx`
- `src/reducers/cart/index.ts`

Trong app hiện tại, `user` và `cart` không còn dùng các file này nữa. Logic mới nằm trong `src/store`.

## Chạy Project

Cài dependencies:

```bash
npm install
```

Chạy dev server:

```bash
npm run dev
```

Build production:

```bash
npm run build
```

Chạy lint:

```bash
npm run lint
```
