/* MIDDLEWARES FOR ORDER ROUTES  */
const { Order, CartItem } = require("../models/order");
const { errorHandler } = require("../helpers/dbErrorHandler");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(
  "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"
);

/* Param that run on call*/
exports.orderById = (req, res, next, id) => {
  Order.findById(id)
    .populate("products.product", "name price")
    .exec((err, order) => {
      if (err || !order) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      req.order = order;
      next();
    });
};

/* Create order func*/
exports.create = (req, res) => {
  console.log("CREATE ORDER: ", req.body);
  req.body.order.user = req.profile;
  const order = new Order(req.body.order);
  order.save((error, data) => {
    if (error) {
      return res.status(400).json({
        error: errorHandler(error),
      });
    }
    // send email alert to admin
    // order.address
    // order.products.length
    // order.amount

    /* const emailData = {
      to: "", // admin email
      from: "denmlabajic@gmail.com", // company email
      subject: `A new order is received`,
      html: `
          <h2>Hey Admin, Somebody just made a purchase in your MeanGame e-store</h2>
          <h3>Customer name: ${order.user.name}</h3>
          <h3>Customer address: ${order.address}</h3>
          <h3>User's purchase history: ${
            order.user.history.length
          } purchase</h3>
          <h3>User's email: ${order.user.email}</h3>
          <h3>Total products: ${order.products.length}</h3>
          <h3>Transaction ID: ${order.transaction_id}</h3>
          <h3>Order status: ${order.status}</h3>
          <h3>Product details:</h3>
          <hr />
          <hr/>
          ${order.products
            .map((p) => {
              return `<div>
                      <h4>Product Name: ${p.name}</h4>
                      <h4>Product Price: ${p.price}</h4>
                      <h4>Product Quantity: ${p.count}</h4>
              </div>`;
            })
            .join("--------------------")}
          <h3>Total order cost: ${order.amount}</h3>
          <p>Login to your dashboard</a> to see the order in detail.</p>
      `,
    };
    sgMail
      .send(emailData)
      .then((sent) => console.log("SENT >>>", sent))
      .catch((err) => console.log("ERR >>>", err));

    // email to buyer
    const emailData2 = {
      to: order.user.email,
      from: "", // email of admin(company)
      subject: `You order is in process!`,
      html: `
          <h2>Hey ${
            req.profile.name
          }, Thank you for shopping with MeanGames.</h2>
          <h3>Total products: ${order.products.length}</h3>
          <h3>Transaction ID: ${order.transaction_id}</h3>
          <h3>Order status: ${order.status}</h3>
          <h3>Product details:</h3>
          <hr />
          <hr />
          ${order.products
            .map((p) => {
              return `<div>
                      <h4>Product Name: ${p.name}</h4>
                      <h4>Product Price: ${p.price}</h4>
                      <h4>Product Quantity: ${p.count}</h4>
              </div>`;
            })
            .join("--------------------")}
          <h3>Total order cost: ${order.amount}</h3>
          <p>Thank your for shopping with MeanGames.</p>
          <hr/>
      `,
    };
    sgMail
      .send(emailData2)
      .then((sent) => console.log("SENT 2 >>>", sent))
      .catch((err) => console.log("ERR 2 >>>", err));
      */

    res.json(data);
  });
};

exports.listOrders = (req, res) => {
  Order.find()
    .populate("user", "_id name lastname address")
    .sort("-created")
    .exec((error, orders) => {
      if (error) {
        res.status(400).json({
          error: errorHandler(error),
        });
      }

      res.json(orders);
    });
};

exports.getStatusValues = (req, res) => {
  res.json(Order.schema.path("status").enumValues);
};

exports.updateOrderStatus = (req, res) => {
  Order.update(
    { _id: req.body.orderId },
    { $set: { status: req.body.status } },
    (err, order) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(order);
    }
  );
};
