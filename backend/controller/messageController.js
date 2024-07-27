import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Message } from "../models/messageSchema.js";

export const sendMessage = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, phone, message } = req.body;
  if (!firstName || !lastName || !email || !phone || !message) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }
  await Message.create({ firstName, lastName, email, phone, message });
  res.status(200).json({
    success: true,
    message: "Message Sent!",
  });
});

export const getAllMessages = catchAsyncErrors(async (req, res, next) => {
  const messages = await Message.find();
  res.status(200).json({
    success: true,
    messages,
  });
});
export const updatemesage = catchAsyncErrors(
  async (req, res, next) => {
    const { id } = req.params;
    let message = await Message.findById(id);
    if (!message) {
      return next(new ErrorHandler("message not found!", 404));
    }
    message = await Message.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(200).json({
      success: true,
      message: "message Status Updated!",
    });
  }
);

export const deletemesage = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const message = await Message.findById(id);
  if (!message) {
    return next(new ErrorHandler("message Not Found!", 404));
  }
  await message.deleteOne();
  res.status(200).json({
    success: true,
    message: "message Deleted!",
  });
});
export const getmessageById = catchAsyncErrors(async (req, res, next) => {
  const message = await Message.findById(req.params.id);
  if (message) {
    res.status(200).json(message);
  } else {
    return res.status(404).json({ msg: "message not found" });
  }

});