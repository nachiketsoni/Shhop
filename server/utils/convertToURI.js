import path from 'path';
import dU from 'datauri/parser.js';

const dURI=new dU();
export const dataUri=(res)=>(dURI.format(res.avatar.name,res.avatar.data).content)
    