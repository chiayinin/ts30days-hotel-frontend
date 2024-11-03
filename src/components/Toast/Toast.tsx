import { useRef, forwardRef, useImperativeHandle } from 'react';
import { Toast } from 'primereact/toast';

export type MyToastProps = {
  severity: "success" | "info" | "warn" | "error" | "secondary" | "contrast" | undefined;
  summary: string;
  detail?: string;
  life?: number;
};

export const MyToast = forwardRef((_, ref) => {
  const toast = useRef<Toast>(null);

  useImperativeHandle(ref, () => ({
    show: ({ severity, summary, detail, life = 3000 }: MyToastProps) => {
      toast.current?.show({ severity, summary, detail, life });
    },
  }));

  return (
    <Toast ref={toast} />
    );
});
