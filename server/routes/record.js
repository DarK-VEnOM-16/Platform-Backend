import express from 'express';
import path from 'path';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router=express.Router()

router.get('/',(req,res)=>{
	res.sendFile(path.join(__dirname,'../templates/index.html'))
})

export { router };