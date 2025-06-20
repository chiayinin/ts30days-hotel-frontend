# 飯店訂房網站(React + TypeScript + Vite)

## Demo
[享樂飯店訂房網站](https://chiayinin.com/ts30days-hotel-frontend/)
```
Demo 帳號
帳號：abc@text.com
密碼：1111111q
```

## Design
[設計稿](https://www.figma.com/design/23VhjSXFWeZfXYXjcZOceb/%E5%85%AD%E8%A7%92-Project---%E9%85%92%E5%BA%97%E8%A8%82%E6%88%BF%E7%B6%B2%E7%AB%99?node-id=0-1&t=GywMX5Ra07NDFvmL-1)

## 關於專案
- 使用 Vite 建置 React 搭配 Typescript 開發
- NodeJS 版本 v20.9.0（建議 18.16.0 以上）
- 本機運行
```
npm run build
```

## 使用套件
- react
- react-router
- react-hook-form
- yup
- tailwind css
- primereact
- swiper
- axios
- sass

## 專案架構
- assets：圖片檔案，如 JPG、SVG、icon
- components：自定義元件，如 Header、Footer、Loader
constants：存放不會改變的常量值。
- pages：頁面，如 Home、Login
- styles：
  - CSS 樣式，支援 SCSS，
  - _variables.scss、index.scss 參考 primereact，可自行調整
- apis：呼叫 API 功能，使用 axios
- core：全局狀態管理， Reducer、Context
- type：定義使用到的 Type
- main.tsx：React 的進入點，React.StrictMode 是否要拿掉？
- app-routing.tsx：
  - router 表
  - 在 Github Page 部屬使用 HashRouter ex：XXXXXX/#/room
  - 若部署環境可以設定的話也可改成 BrowserRouter ex：XXXXX/booking

## Styles
- main.scss：引入所有 scss 檔案
- _base.scss ：基礎設定，如 字型
- _components.scss : 針對客製化元件的樣式設定，如 Button、Loader
- _tailwind.scss ：引入 tailwind css 檔案
- _vendors.scss ：外部套件客製化設定，如 Primereact、Swiper

## API 呼叫工具函式說明 `fetchData`、Axios

`fetchData` 是一個泛型的通用 API 呼叫函式，支援 `GET`、`POST`、`PUT`、`DELETE` 四種請求方式，搭配自訂的 Axios 實例進行封裝處理，並整合 Token 認證與錯誤處理邏輯。

### 使用方式

```ts
const result = await fetchData<DataType>('get', '/api/some-endpoint', undefined, token);
```

### 函式簽章

```ts
fetchData<T>(
  method: 'get' | 'post' | 'put' | 'delete',
  url: string,
  params?: unknown,
  token?: string
): Promise<T>
```

### 參數說明

| 參數     | 說明                                  |
|----------|---------------------------------------|
| `method` | HTTP 請求方法（'get'、'post'、'put'、'delete'） |
| `url`    | 請求 API 的路徑                         |
| `params` | 傳送的資料，會自動轉成 JSON 字串（選填）   |
| `token`  | Bearer Token（選填，如需驗證時使用）        |

### 回應格式

API 預期回傳格式如下：

```ts
interface APIResponseDIO<T> {
  status: boolean;
  token?: string;
  message: string;
  result: T;
}
```

當 `status` 為 `true` 時，會回傳 `result` 資料；若包含新的 `token`，會自動更新並儲存至 Cookie。

### 錯誤處理

- 若回應 `status` 為 `false`，或發生 HTTP 4xx/5xx 錯誤，會統一丟出例外（`Error`），訊息包含後端回傳的 `message`。
- Axios 的錯誤與非 Axios 錯誤會分別處理，增加錯誤資訊的準確性。

### 補充說明

- 函式會自動將 Token 存入 Cookie（使用 `storeInStorage(KEY_TOKEN, ..., 'COOKIE')`）。
- 建議將 API 模組集中放在 `src/services` 資料夾中，並以 `XXXService.ts` 命名。
- 呼叫時請搭配 `try-catch` 做錯誤處理，避免未預期的中斷。

### 使用範例

```ts
interface LoginRequest {
  email: string;
  password: string;
}
interface LoginResponse {
  user: {
    name: string;
    email: string;
  };
}

const login = async (data: LoginRequest): Promise<LoginResponse> => {
  return await fetchData<LoginResponse>('post', '/api/v1/user/login', data);
};

// 在元件中呼叫
try {
  const loginData = await login({ email: 'test@example.com', password: '12345678' });
  console.log('登入成功', loginData);
} catch (error) {
  console.error('登入失敗：', (error as Error).message);
}
```
