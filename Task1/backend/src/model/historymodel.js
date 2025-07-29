import mongoose from "mongoose";

const historyschema = mongoose.Schema({
    userid: {
    type:mongoose.Schema.Types.ObjectId,
    ref:"users"
  },
  point: Number,
});

const historymodel = mongoose.model("history", historyschema);

export default historymodel;
