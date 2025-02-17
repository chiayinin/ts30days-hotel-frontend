import { useRef, forwardRef, useContext, useEffect } from 'react';
import { Toast } from 'primereact/toast';
import { GlobalContext } from '@core';

export const MyToast = forwardRef((_, ref) => {
  const { toastPayload, dispatch } = useContext(GlobalContext);
  const toastRef = useRef<Toast>(null);

  useEffect(() => {
    if(toastPayload.display) {
      toastRef.current?.show({
        severity: toastPayload.severity,
        summary: toastPayload.summary,
        detail: toastPayload.detail,
        life: toastPayload.life || 3000,
      });
    };
  }, [toastPayload, dispatch]);

  // 將 ref 傳遞給內部的 Toast
  return(<Toast ref={toastRef} />)
});
