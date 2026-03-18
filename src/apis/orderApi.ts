import { apiHandler } from "./userApi";


export interface LocationTypes{
    long:number;
    lat:number;
    address:string;
    timestamp:number;
};
export type OrderStatusType = "pending"|"delivered"|"cancelled"|"returned";
export type PaymentStatusType = "pending"|"success"|"failed"|"refunded";
export type ModeOfPaymentType = "cod"|"card";
export interface OrderTypes{
    userID:string;
    products:{
        productID:string;
        price:number;
        quantity:number;
    }[];
    orderStatus:OrderStatusType;
    paymentStatus:PaymentStatusType;
    modeOfPayment:ModeOfPaymentType;
    totalAmount:number;
    location:LocationTypes;
    createdAt:string;
    updatedAt:string;
};
export type CreateOrderFormTypes = Pick<OrderTypes, "products"|"totalAmount"|"modeOfPayment"|"orderStatus"|"paymentStatus"|"location">;
export type UpdateOrderFormTypes = Partial<Pick<OrderTypes, "orderStatus"|"paymentStatus">>&{orderID:string;};


export async function myOrders() {
    const res = await apiHandler<null, OrderTypes[]>({
        endPoint:`/order/`,
        method:"GET",
        credentials:"include"
    });
    return res;
};
export async function createOrder(createOrderForm:CreateOrderFormTypes) {
    const res = await apiHandler<CreateOrderFormTypes, null>({
        endPoint:`/order/`,
        method:"POST",
        credentials:"include",
        body:createOrderForm
    });
    return res;
};
export async function updateOrder(updateOrderFrom:UpdateOrderFormTypes) {
    const res = await apiHandler<UpdateOrderFormTypes, {orderStatus:OrderStatusType; paymentStatus:PaymentStatusType;}>({
        endPoint:`/order/`,
        method:"PATCH",
        credentials:"include",
        body:updateOrderFrom
    });
    return res;
};