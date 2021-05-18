import { PageTableColumn } from '@vanx/framework';

export const columnType = {
  status(key: string): PageTableColumn {
    return { key, format: 'status' };
  },
  action(edit: string): PageTableColumn {
    return { key: 'action', width: '300px', right: true, format: 'action', extra: { edit } };
  }
};
