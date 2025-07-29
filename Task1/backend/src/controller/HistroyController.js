import historymodel from "../model/historymodel.js";


export const HistoryStore = async (req, res) => {
  const { selectedUser,point } = req.body;
  const response = await historymodel.create({ userid: selectedUser, point });
  res.send({
    status: 0,
    msg: "User Histroy Store Successfully",
    response,
  });
};


// fetch data
export const HistoryData = async (req, res) => {
  const response = await historymodel.find().populate("userid");
  res.send({
    status: 0,
    msg: "User Fetch Successfully",
    response,
  });
};