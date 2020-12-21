import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, listUsers } from '../../actions/userActions';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import '../css/userManage.css'

function UsersManage(props) {
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userDelete = useSelector((state) => state.userDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = userDelete;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch, successDelete]);
  const deleteHandler = (user) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteUser(user._id));
    }
  };
  return (
    <div className="users">
    <h1>Users</h1>
    {loadingDelete && <LoadingBox></LoadingBox>}
    {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
    {successDelete && (
      <MessageBox variant="success">User Deleted Successfully</MessageBox>
    )}
    {loading ? (
      <LoadingBox></LoadingBox>
    ) : error ? (
      <MessageBox variant="danger">{error}</MessageBox>
    ) : (
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>IS ADMIN</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.idUser}>
              <td>{user.idUser}</td>
              <td>{user.userFname} {user.userLname}</td>
              <td>{user.userEmail}</td>
             
              <td>{user.isAdmin ? 'YES' : 'NO'}</td>
              <td>
                <button
                  type="button"
                  className="small"
                  onClick={() => props.history.push(`/user/${user._id}/edit`)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="small"
                  onClick={() => deleteHandler(user)}
                >
                  Delete
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

export default UsersManage;