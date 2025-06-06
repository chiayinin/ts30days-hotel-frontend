import * as yup from 'yup';

// 註冊第一步驟，E-mail 驗證
export const VALI_EMAIL_SCHEMA = yup.object({
  email: yup.string()
    .email("電子郵件的格式有誤")
    .required("欄位不得為空"),
  password: yup
    .string()
    .transform((value) => value.toLowerCase().replace(/\s+/g, "")) // 將大寫轉換為小寫，並移除所有空白
    .min(8, "密碼需至少 8 碼以上")
    .matches(/^(?=.*[a-z])(?=.*\d).+$/, "密碼需包含英文及數字")
    .required("欄位不得為空"), // 密碼需至少 8 碼以上，並英數混合
  confirmPassword: yup
    .string()
    .transform((value) => value.toLowerCase().replace(/\s+/g, "")) // 將大寫轉換為小寫，並移除所有空白
    .required("欄位不得為空") // 密碼需至少 8 碼以上，並英數混合
    .oneOf([yup.ref('password')], "和密碼不相符")
});

// 註冊第二步驟，表單驗證
export const USER_SIGN_UP_SCHEMA = yup.object({
  name: yup
    .string()
    .required("請輸入姓名")
    .default(""),
  phone: yup
    .string()
    .required("請輸入手機號碼")
    .matches(/^09[0-9]{8}$/, "請輸入正確的電話號碼")
    .default(""),
  birthday: yup.object({
    year: yup.string().default(""),
    month: yup.string().default(""),
    day: yup.string().default(""),
  }),
  address: yup.object({
    city: yup.string().required("請選擇縣市").default(""),
    county: yup.string().required("請選擇區域").default(""),
    detail: yup.string().required("請輸入詳細地址").default(""),
    zipcode: yup.string().default(""),
  }),
  agreement: yup
    .boolean()
    .oneOf([true], "請同意條款")
    .default(false)
});

// 預訂房間
export const BOOKING_SCHEMA = yup.object({
  name: yup
    .string()
    .required("請輸入姓名")
    .default(""),
  phone: yup
    .string()
    .required("請輸入手機號碼")
    .matches(/^09[0-9]{8}$/, "請輸入正確的電話號碼")
    .default(""),
  email: yup.string()
    .email("電子信箱的格式有誤")
    .required("欄位不得為空"),
  address: yup.object({
    city: yup.string().required("請選擇縣市").default(""),
    county: yup.string().required("請選擇區域").default(""),
    detail: yup.string().required("請輸入詳細地址").default(""),
    zipcode: yup.string().default(""),
  })
});

// 重設密碼
export const EDIT_PASSWORD_SCHEMA = yup.object({
  oldPassword: yup
    .string()
    .transform((value) => value.toLowerCase().replace(/\s+/g, "")) // 將大寫轉換為小寫，並移除所有空白
    .required("欄位不得為空"), // 密碼需至少 8 碼以上，並英數混合,
  newPassword: yup
    .string()
    .transform((value) => value.toLowerCase().replace(/\s+/g, "")) // 將大寫轉換為小寫，並移除所有空白
    .min(8, "密碼需至少 8 碼以上")
    .matches(/^(?=.*[a-z])(?=.*\d).+$/, "密碼需包含英文及數字")
    .required("欄位不得為空") // 密碼需至少 8 碼以上，並英數混合
    .when('oldPassword', (oldPassword, field) =>
      oldPassword ? field.required("新密碼不得跟舊密碼相同") : field
    ),
  confirmPassword: yup
    .string()
    .transform((value) => value.toLowerCase().replace(/\s+/g, "")) // 將大寫轉換為小寫，並移除所有空白
    .required("欄位不得為空") // 密碼需至少 8 碼以上，並英數混合
    .oneOf([yup.ref('newPassword')], "和密碼不相符")
});

// 重設個人資料
export const EDIT_USERINFO_SCHEMA = yup.object({
  name: yup
    .string()
    .required("請輸入姓名")
    .default(""),
  phone: yup
    .string()
    .required("請輸入手機號碼")
    .matches(/^09[0-9]{8}$/, "請輸入正確的電話號碼")
    .default(""),
  birthday: yup.object({
    year: yup.string().default(""),
    month: yup.string().default(""),
    day: yup.string().default(""),
  }),
  address: yup.object({
    city: yup.string().required("請選擇縣市").default(""),
    county: yup.string().required("請選擇區域").default(""),
    detail: yup.string().required("請輸入詳細地址").default(""),
    zipcode: yup.string().default(""),
  })
});
