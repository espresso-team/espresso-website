
import { Router } from "express";
import { upload_image } from "../controllers/image.controller.js";
import multer from 'multer';

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/upload-image', upload.single('file'), upload_image);

export const apiRoutes = router;