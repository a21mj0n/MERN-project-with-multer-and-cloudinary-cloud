const router = require('express').Router();
const cloudinary = require('../utils/cloudinary');
const upload = require('../utils/multer');
const User = require('../model/user');

const photoFields = upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'address', maxCount: 1 },
]);

router.post('/', photoFields, async (req, res) => {
  try {
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.files['image'][0].path);
    const address = await cloudinary.uploader.upload(req.files['address'][0].path);

    // Create new user
    let user = new User({
      phone: req.body.phone,
      avatar: result.secure_url,
      address: address.secure_url,
      filial_id: req.body.filial_id,
      card_number: req.body.card_number,
      cloudinary_id: result.public_id,
    });
    // Save user
    await user.save();
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

router.get('/', async (req, res) => {
  try {
    let user = await User.find();
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

router.get('/checked/:id', async (req, res) => {
  try {
    let user = await User.findById(req.params.id);

    if (user) {

      user.isChecked = req.query.checked;

      await user.save();
      return res.status(200).send({ user });

    } else {
      return res.json({ message: 'User not found' });
    }

  } catch (err) {
    console.log(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    // Find user by id
    let user = await User.findById(req.params.id);
    // Delete image from cloudinary
    await cloudinary.uploader.destroy(user.cloudinary_id);
    // Delete user from db
    await user.remove();
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    // Delete image from cloudinary
    await cloudinary.uploader.destroy(user.cloudinary_id);
    // Upload image to cloudinary
    let result;
    if (req.file) {
      result = await cloudinary.uploader.upload(req.file.path);
    }
    const data = {
      name: req.body.name || user.name,
      avatar: result?.secure_url || user.avatar,
      cloudinary_id: result?.public_id || user.cloudinary_id,
    };
    user = await User.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    // Find user by id
    let user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
