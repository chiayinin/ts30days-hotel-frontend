
import { useContext, useRef } from 'react';
import { GlobalContext } from '@core';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';

/**
 * 客製化對話框元件
 * @returns
 */
export const Dialog = () => {
  const { dialogPayload, dispatch } = useContext(GlobalContext);
  const toast = useRef<Toast>(null);

  const accept = () => {
      toast.current?.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
  }

  const reject = () => {
      toast.current?.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
  }

  const confirm1 = () => {
      confirmDialog({
          message: 'Are you sure you want to proceed?',
          header: 'Confirmation',
          icon: 'pi pi-exclamation-triangle',
          defaultFocus: 'accept',
          accept,
          reject
      });
  };

  const confirm2 = () => {
      confirmDialog({
          message: 'Do you want to delete this record?',
          header: 'Delete Confirmation',
          icon: 'pi pi-info-circle',
          defaultFocus: 'reject',
          acceptClassName: 'p-button-danger',
          accept,
          reject
      });
  };

  return (
      <>
          <Toast ref={toast} />
          <ConfirmDialog />
          <div className="card flex flex-wrap gap-2 justify-content-center">
              <Button onClick={confirm1} icon="pi pi-check" label="Confirm" className="mr-2"></Button>
              <Button onClick={confirm2} icon="pi pi-times" label="Delete"></Button>
          </div>
      </>
  )
}
