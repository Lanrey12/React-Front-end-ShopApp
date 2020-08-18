import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Col, Row } from "antd";
import "antd/dist/antd.css";
import ProductImage from "./Sections/ProductImage";
import ProductInfo from "./Sections/ProductInfo";
import { addToCart } from "../../../redux/actions/userActions";
import { useDispatch } from "react-redux"


function DetailProductPage(props) {

  const baseUrl = "http://localhost:5000/accounts";
  const productId = props.match.params.productId;
  const [Product, setProduct] = useState([]);

  
  useEffect(() => {
    Axios.get(
      `${baseUrl}/product/products_by_id?id=${productId}&type=single`
    ).then((res) => {
      setProduct(res.data[0]);
    });
  });

  
  const dispatch = useDispatch()
  const addToCartHandler = (productId) => {
            dispatch(addToCart(productId))
  }

 

  return (
    <div className="postPage" style={{ width: "100%", padding: "3rem, 4rem" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1>{Product.title}</h1>
      </div>
      <br />
      <Row gutter={[16, 16]}>
        <Col lg={12} xs={24}>
          <ProductImage detail={Product}/>
        </Col>
        <Col lg={12} xs={24}>
          <ProductInfo  
          addToCart={addToCartHandler}
          detail={Product}/>
        </Col>
      </Row>
    </div>
  );
}

export default DetailProductPage;
