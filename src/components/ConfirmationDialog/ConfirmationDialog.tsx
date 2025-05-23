import { useRef, useContext, forwardRef, useImperativeHandle } from 'react';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { GlobalContext } from '@core';

export const ConfirmationDialog = forwardRef((_, ref) => {
  const { dispatch } = useContext(GlobalContext)
  const toast = useRef<Toast>(null);

  const accept = () => {
    dispatch({
      type: 'SET_TOAST',
      payload: {
        severity: 'success',
        summary: '取消預定',
        detail: '已成功取消預定。',
        display: true,
      },
    });
  }

  const reject = () => {
    dispatch({
      type: 'SET_TOAST',
      payload: {
        severity: 'error',
        summary: '失敗',
        detail: '取消預定失敗，請再操作一次。',
        display: true,
      },
    });
  }

  // 提供給父元件呼叫的 confirm 方法
  useImperativeHandle(ref, () => ({
    showConfirm: () => {
      confirmDialog({
        message: '確定要取消此房型的預訂嗎？',
        header: '取消預定',
        icon: '',
        defaultFocus: 'accept',
        acceptLabel: '確定取消',
        rejectLabel: '關閉視窗',
        accept,
        reject,
      });
    }
  }));

  return (
    <>
      <Toast ref={toast} />
      <ConfirmDialog
        className="w-11/12 md:w-[600px]"
        maskClassName=""
        headerClassName="p-4 bg-neutral-40"
        contentClassName="h-[104px] md:h-[184px] justify-center p-0"
        acceptClassName="btn-primary w-full"
        rejectClassName="btn-secondary w-full" />
    </>
  );
});
