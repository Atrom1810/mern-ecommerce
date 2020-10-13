import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { Form, Button } from 'react-bootstrap';
import { getUserDetails, editUser } from '../actions/userActions';
import { USER_EDIT_RESET } from '../constants/userConstants';

const UserEditPage = ({ match, history }) => {
  const userId = match.params.id;

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userEdit = useSelector((state) => state.userEdit);
  const { loading: loadingEdit, error: errorEdit, success: successEdit } = userEdit;

  useEffect(() => {
    if (successEdit) {
      dispatch({ type: USER_EDIT_RESET });
      history.push('/admin/userlist');
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, user, userId, successEdit, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(editUser({ _id: userId, name, email, isAdmin }));
  };
  return (
    <Fragment>
      <Link to="/admin/userlist" className="btn btn-dark my-3">
        Nutzerliste
      </Link>
      <FormContainer>
        <h1>Nutzer bearbeiten</h1>
        {loadingEdit && <Loader />}
        {errorEdit && <Message variant="danger">{errorEdit}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>E-Mail</Form.Label>
              <Form.Control
                type="email"
                placeholder="E-Mail Adresse"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="isAdmin">
              <Form.Check
                type="checkbox"
                label="Admin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>
            <Button type="submit" variant="primary">
              Aktualisieren
            </Button>
          </Form>
        )}
      </FormContainer>
    </Fragment>
  );
};

export default UserEditPage;
