```js
// model
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
    orderDetails: { type: {}, required: true },
    items: [
      {
        book: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Book",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
```

```js
// controller
exports.getOrdersWithStatus = async (req, res) => {
  const desiredStatus = req.params.status;
  try {
    // MongoDB aggregation pipeline
    const orders = await Order.aggregate([
      {
        $match: { status: desiredStatus },
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      // Do the lookup matching
      {
        $lookup: {
          from: "books",
          localField: "items.book",
          foreignField: "_id",
          as: "bookObjects",
        },
      },
      { // this is for adding the quantity field in each book
        $addFields: {
          bookObjects: {
            $cond: {
              if: { $eq: [{ $size: "$bookObjects" }, 0] },
              then: [],
              else: {
                $map: {
                  input: "$bookObjects",
                  as: "bookObject",
                  in: {
                    $mergeObjects: [
                      "$$bookObject",
                      {
                        quantity: {
                          $reduce: {
                            input: "$items",
                            initialValue: 0,
                            in: {
                              $cond: [
                                { $eq: ["$$this.book", "$$bookObject._id"] },
                                { $add: ["$$value", "$$this.quantity"] },
                                "$$value",
                              ],
                            },
                          },
                        },
                      },
                    ],
                  },
                },
              },
            },
          },
        },
      },
      {
        $project: {
          "user.name": 1,
          "user.email": 1,
          orderDetails: 1,
          _id: 1,
          bookObjects: 1,
        },
      },
    ]);

    res.status(200).json(orders);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error occurred while retrieving orders.",
        error: error.message,
      });
  }
};
```
