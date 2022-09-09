import { deleteAsync } from 'del';

export const clean = () => deleteAsync(app.path.clean);