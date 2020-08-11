import express from 'express';
import Order from '../models/orderModel';
import { isAuth, isAdmin } from '../util';

const router = express.Router();

router.get("/", isAuth, async (req, res) => {
    const orders = await Order.find({}).populate('user');
    res.send(orders);
});

router.get("/mine", isAuth, async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.send(orders);
})

router.get("/:id", isAuth, async (req, res) => {
    const order = await Order.findOne({ _id: req.params.id });
    if (order) {
        res.send(order);
    } else {
        res.status(404).send("Không tìm thấy đơn hàng.")
    }
});

router.delete("/:id", isAuth, isAdmin, async (req, res) => {
    const order = await Order.findOne({ _id: req.params.id });
    if (order) {
        const deletedOrder = await order.remove();
        res.send(deletedOrder);
    } else {
        res.status(404).send("Không tìm thấy đơn hàng.")
    }
});

router.post("/", isAuth, async (req, res) => {
    const newOrder = new Order({
        orderItems: req.body.orderItems,
        user: req.user._id,
        shipping: req.body.shipping,
        payment: req.body.payment,
        itemsPrice: req.body.itemsPrice,
        taxPrice: req.body.taxPrice,
        shippingPrice: req.body.shippingPrice,
        totalPrice: req.body.totalPrice,
    });
    const newOrderCreated = await newOrder.save();
    res.status(201).send({ message: "Đơn hàng mới đã được tạo", data: newOrderCreated });
});

router.put("/:id/pay", isAuth, async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.payment = {
            paymentMethod: 'paypal',
            paymentResult: {
                payerID: req.body.payerID,
                orderID: req.body.orderID,
                paymentID: req.body.paymentID
            }
        }
        const updatedOrder = await order.save();
        res.send({ message: 'Đơn hàng đã được trả.', order: updatedOrder });
    } else {
        res.status(404).send({ message: 'Không tìm thấy đơn hàng.' })
    }
});

router.put("/:id/shipping", isAuth, async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        const finishTime = Date.now();
        order.isPaid = true;
        order.paidAt = order.paidAt ? order.paidAt : finishTime;
        order.isDelivered = true;
        order.deliveredAt = finishTime;
        const updatedOrder = await order.save();
        res.send({ message: 'Đơn hàng đã được giao.', order: updatedOrder });
    } else {
        res.status(404).send({ message: 'Không tìm thấy đơn hàng.' })
    }
});

export default router; 