
const express = require("express");
const router = express.Router();

const { login, register } = require("../controllers/auth");
const auth = require("../middleware/auth");

router.post("/register", register);
router.post("/login", login);

router.get("/validate-token", auth, (req, res) => {
  const { _id, name } = req.user;
  res.status(200).json({ user: { _id, name } });
});
module.exports = router;