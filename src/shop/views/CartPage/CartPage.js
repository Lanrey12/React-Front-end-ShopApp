import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getCartItems,
  removeCartItem,
  getById,
  accountService,
  onSuccessBuy
} from "../../../redux/actions/userActions";
import { connect } from "react-redux";
import UserCardBlock from "./Sections/UserCardBlock";
import { Result, Empty } from "antd";
import Paypal from "../../../util/Paypal";
import Axios from "axios";

function CartPage(props) {
  const [Total, setTotal] = useState(0);
  const [ShowTotal, setShowTotal] = useState(false);
  const [ShowSuccess, setShowSuccess] = useState(false);
  const dispatch = useDispatch();

  const id = accountService.userValue.id;

  const fetchCart = () => {
    let cartItems = [];
    if (props.users.userData && props.users.userData.cart) {
      if (props.users.userData.cart.length > 0) {
        props.users.userData.cart.forEach((item) => {
          cartItems.push(item.id);
        });

        dispatch(getCartItems(cartItems, props.users.userData.cart))
           .then((res) => {
            if (res.payload.length > 0) {
                calculateTotal(res.payload)
            }
           })
      }
    }
  };

  const fetchById = () => {
    dispatch(getById(id));
  };
//   const fetchTotalDetails = () => {
//     if (props.users.cartDetail && props.users.cartDetail.length > 0) {
//       calculateTotal(props.users.cartDetail);
//     }
//   };

  useEffect(fetchById, [dispatch]);
  useEffect(fetchCart, [dispatch, props.users.userData]);
//   useEffect(fetchTotalDetails, [dispatch, props.users.cartDetail]);

  const calculateTotal = (cartDetail) => {
    let total = 0;
    cartDetail.map((item) => {
      total += parseInt(item.price, 10) * item.quantity;
    });
    setTotal(total);
    setShowTotal(true);
  };

  const removeFromCart = (productId) => {
    dispatch(removeCartItem(productId))
    .then((res) => {
        if(res.payload.cartDetail.length <= 0){
            setShowTotal(false)
        }else{
            calculateTotal(res.payload.cartDetail)
        }
    });
  };

  const baseUrl = 'http://localhost:5000/accounts';

  const transactionSuccess = (data) => {
      let variables = {
          cartDetail: props.users.cartDetail, paymentData: data
      }
       Axios.post(`${baseUrl}/user/successBuy`, variables)
       .then(res => {
           if(res.data.success){
                    setShowSuccess(true)
                    setShowTotal(false)

                dispatch(onSuccessBuy({
                     cart: res.data.cart, cartDetail:res.data.cartDetail
                    }))
           }else{
               alert('Failed to buy')
           }
       })
  }
  const transactionError = () => {
      console.log("Paypal error")
  }
  const transactionCancelled = () => {
    console.log("Transaction Cancelled")
  }

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <h1>My Cart</h1>
      <div>
        <UserCardBlock
          products={props.users.cartDetail}
          removeItem={removeFromCart}
        />

        {ShowTotal ? (
          <div style={{ marginTop: "3rem" }}>
            <h2>Total amount: ${Total} </h2>
          </div>
        ) : ShowSuccess ? (
          <Result status="success" title="Successfully Purchased Items" />
        ) : (
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <br />
            <Empty description={false} />
            <p>No Items In the Cart</p>
          </div>
        )}
      </div>
    {ShowTotal &&
     <Paypal
     toPay={Total}
     onSuccess={transactionSuccess}
     transactionError={transactionError}
     transactionCancelled={transactionCancelled}/>
}
  </div>
  );
}

const mapStateToProps = (state) => ({
  users: state.user,
});

export default connect(mapStateToProps)(CartPage);
