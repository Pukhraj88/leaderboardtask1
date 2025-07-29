import usermodel from "../model/usermodel.js";

// INSERT  USER  FUNTIONLITY
export const AddUser = async (req, res) => {
  const { name } = req.body;
  const response = await usermodel.create({ name });
  res.send({
    status: 0,
    msg: "User Registered Successfully",
    response,
  });
};

// FETCH USER DATA  FUNTIONLITY
export const AllUserData = async (req, res) => {
  const response = await usermodel.find();
  res.send({ status: 0, msg: "User Founds", response });
};

// UPDATE  USER DATA
export const UpdatePoint = async (req, res) => {
  const id = req.params.id;
  const { point } = req.body;
  // POINT UPDATED
  const response = await usermodel.updateOne(
    { _id: id },
    { $inc: { points: point } }
  );
  res.send({ status: 0, msg: "Point Updated Sucessfully", response });
};
