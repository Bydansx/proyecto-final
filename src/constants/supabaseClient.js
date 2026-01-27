import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fdjkmcwctwhcvqolzjow.supabase.co';
const supabaseKey = 'sb_publishable_ZVhX-jc_T0TnK0vFsMMRww_ntQsRtu6';

export const supabase = createClient(supabaseUrl, supabaseKey);