import { User, validateUser } from "../models/users";
import * as _ from "lodash";
import * as bcrypt from "bcrypt";
import * as joi from "@hapi/joi";
import * as jwt from "jsonwebtoken";
import { get } from "config";
export const register = async (req: any, res: any) => {
  const { email, name, password } = req.body;
  console.log(req.file);
  const { originalName: image } = req.file;
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let user = await User.findOne({ email });
  if (user) return res.status(400).send("User is already exits");
  user = new User({ email, name, password, image });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  // await user.save();
  res.status(200).send(`User ${user.name}  registered successfully`);
};

export const getMe = async (req: any, res: any) => {
  const user = await User.findById(req.user._id).select("-password");
  res.status(200).send(user);
};
export const login = async (req: any, res: any) => {
  const { email, password } = req.body;
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const user = await User.findOne({ email });
  if (!user) return res.status(400).send("Invalid email and password");
  const validateUser = await bcrypt.compare(password, user.password.toString());
  if (!validateUser) return res.status(400).send("Invalid email and password");
  const token = jwt.sign(
    { _id: user._id, name: user.name },
    get("jwtPrivateKey"),
    { expiresIn: "2h" }
  );
  res.status(200).send(token);
};
export const validate = (user: any) => {
  const schema = joi.object({
    email: joi.string().min(10).max(100).email().required(),
    password: joi.string().min(6).max(1024).required(),
  });
  return schema.validate(user);
};
