import { PageTableColumn } from '@vanx/framework';

export const columnType = {
  status(key: string, control = false, response?: (res: any) => void): PageTableColumn {
    return { key, format: 'status', extra: { control, response } };
  },
  action(edit: string): PageTableColumn {
    return { key: 'action', width: '120px', right: true, format: 'action', extra: { edit } };
  }
};
