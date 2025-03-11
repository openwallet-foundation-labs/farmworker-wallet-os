import { ShareOptions } from '../types';
declare const requireAndAskPermissions: (options: Pick<ShareOptions, 'url' | 'urls'>) => Promise<boolean | never>;
export default requireAndAskPermissions;
