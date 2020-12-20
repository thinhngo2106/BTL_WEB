import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrder, listOrders,updateOrder } from '../../actions/orderActions';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import { ORDER_DELETE_RESET, ORDER_UPDATE_RESET } from '../../constants/orderConstants';
import DoneIcon from '@material-ui/icons/Done';


export const Orders = () => {
  return (
    <div className='orders'>
      <h1>Reports</h1>
    </div>
  );
};

export const OrdersManage = (props) => {
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;
  const orderDelete = useSelector((state) => state.orderDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = orderDelete;
  const orderUpdate = useSelector((state) => state.orderUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = orderUpdate;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: ORDER_DELETE_RESET });
    dispatch({ type: ORDER_UPDATE_RESET });
    dispatch(listOrders());
  }, [dispatch, successDelete, successUpdate]);
  const deleteHandler = (order) => {
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteOrder(order.idOrder));
    }
  };
  const updateStatus = (order) =>{
    dispatch(updateOrder(order.idOrder));
  }

  function numberWithCommas(order) {
    const x = order.orderdetails.reduce((a, c) => a + c.quantityOrder * c.priceEach,0);
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return (
    <div className="order-admin-list">
      <h1>Orders</h1>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>Email</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.idOrder}>
                <td>{order.idOrder}</td>
                <td>{order.user.userLname} {order.user.userFname}</td>
                <td>{order.user.userEmail}</td>
                <td>{order.orderDate}</td>
                <td>{numberWithCommas(order)}</td>
                <td>{
                  order.paymentMethod == 'PayPal' ? "Đã thanh toán" : "Thanh toán khi nhận hàng"
                  }</td>
                <td>
                  {order.shippedDate}
                </td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() => {
                      props.history.push(`/order/${order._id}`);
                    }}
                  >
                    Details
                  </button>
                  <button
                    type="button"
                    className="small"
                    onClick={() => deleteHandler(order)}
                  >
                    Delete
                  </button>
                  <button 
                    type="button"
                    className="small"
                    onClick={() => updateStatus(order)}
                    >
                      <DoneIcon/>
                  </button>
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export const DeleteOrders = () => {
  return (
    <div className='admin-orders'>
      <h1>Reports/reports2</h1>
    </div>
  );
};
