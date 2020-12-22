import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listOrderMine } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function OrderHistoryScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  if (!userInfo) {
    props.history.push('/signin');
  }

  const orderMineList = useSelector((state) => state.orderMineList);
  const { loading, error, orders } = orderMineList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listOrderMine());
  }, [dispatch]);
  function numberWithCommas(order) {
    const x = order.orderdetails.reduce((a, c) => a + c.quantityOrder * c.priceEach,0);
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }


  return (
    <div className="order-history">
      <h1 className="order-title">Lịch sử đơn hàng</h1>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Mã đơn hàng</th>
              <th>Người đặt hàng</th>
              <th>Ngày đặt hàng</th>
              <th>Số tiền</th>
              <th>Ngày giao hàng</th>
              <th>Tình trạng</th>
              <th>Chi tiết đơn hàng</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.idOrder}>
                <td>{order.idOrder}</td>
                <td>{order.customerName}</td>
                <td>{order.orderDate.substring(0, 10)}</td>
                
                <td>
                <span className="total-price"> 
                  {numberWithCommas(order)} ₫
                </span>
                </td>
                <td>
                  {order.shippedDate}
                </td>
                <td>
                  {order.status}
                </td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() => {
                      props.history.push(`/order/${order.idOrder}`);
                    }}
                  >
                    Chi tiết
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}