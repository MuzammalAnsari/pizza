import multer from 'multer';
import nextConnect from 'next-connect';
import cloudinary from '../../../../cloudinary.config'; // Adjust path as necessary

// Initialize multer for handling file uploads
const upload = multer({ dest: 'uploads/' });

// Create a handler using next-connect
const handler = nextConnect()
  .use(upload.single('file'))
  .post(async (req, res) => {
    try {
      const file = req.file;

      if (!file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      // Upload file to Cloudinary
      const result = await cloudinary.uploader.upload(file.path);
      res.status(200).json({ url: result.secure_url });
    } catch (error) {
      res.status(500).json({ error: 'Failed to upload image' });
    }
  });

export default handler;