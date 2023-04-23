import ErrorHandler from "../middlewares/error.js";
import { Books } from "../models/task.js";


//Adding a new nook

export const newBook = async (req, res, next) => {
  try {
    const { title, author } = req.body;

    await Books.create({
      title,
      author,
      user: req.user,
    });

    res.status(201).json({
      success: true,
      message: "Task added Successfully",
    });
  } catch (error) {
    next(error);
  }
};


//Searching a particular book
export const getBook = async (req, res, next) => {
  try {
    const search = req.body.search;
    const Book_data = await Books.find({
      $or: [
        { title: { $regex: ".*" + search + ".*", $options: "i" } },
        { name: { $regex: ".*" + search + ".*", $options: "i" } },
      ],
    });
    if (Book_data.length > 0) {
      res.status(200).json({
        success: true,
        books: Book_data.map((book) => ({
         
          title: book.title,
          author: book.author,
    
        })),
      });
    } else {
      res.status(200).json({
        success: false,
        message: "Book not found",
      });
    }
  } catch (error) {
    next(error);
  }
};



//displaying all books
export const getAllBooks = async (req, res, next) => {
  try {
   const tasks = await Books.find();

    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};


// export const updateTask = async (req, res, next) => {
//   try {
//     const task = await Books.findById(req.params.id);

//     if (!task) return next(new ErrorHandler("Task not found", 404));

//     task.isCompleted = !task.isCompleted;
//     await task.save();

//     res.status(200).json({
//       success: true,
//       message: "Task Updated!",
//     });
//   } catch (error) {
//     next(error);
//   }
// };

export const deleteBook = async (req, res, next) => {
  try {
    const book = await Books.findById(req.params.id);

    if (!book) return next(new ErrorHandler("book not found", 404));
    await book.deleteOne();

    res.status(200).json({
      message: "Book Deleted!",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
