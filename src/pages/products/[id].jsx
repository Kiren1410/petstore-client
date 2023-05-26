import { Card, Button, Input } from "react-daisyui";
import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import { addToCart } from "../api/carts";
import jwt_decode from "jwt-decode";



export default function Product({ product }) {
  const [auth, setAuth] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const onChangeHandler = (e) => {
    setQuantity(e.target.value);
  };

  const queryClient = useQueryClient();

  const { mutate } = useMutation(addToCart, {
    onSuccess: (data) => {
      alert(data.msg);
      queryClient.invalidateQueries("cart");
    },
    onError: (error) => {
      alert(error.response.data.msg);
    },
  });

  const onSubmitHandler = (e) => {
    let productId = product._id;
    e.preventDefault();
    if (quantity < 1) alert("Minimum quantity should be atleast 1");
    if (quantity > product.quantity)
      alert("Quantity should not exceed available quantity");
    mutate({ quantity, productId });
  };
  useEffect(() => {
    const getToken = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        setAuth(token);
      }
    };
    getToken();
  }, []);
  const decoded = auth ? jwt_decode(auth) : null
  

  return (
    <>
    {decoded?.data?.isAdmin && decoded ? (
    <div>
      <Card>
        <Card.Image
          src={`http://localhost:1234/${product.image.replace("public", "")}`}
          alt={product.name}
          className="object-contain h-80 w-full "
        />
        {/* <div class="bg-contain bg-center ..." style="background-image: url(...)"></div> */}
        <Card.Body>
          <Card.Title tag="h2" className="justify-center">{product.name}</Card.Title>
          <div className="justify-center">
          <p>{product.description}</p>
          <p>Price : Rm {product.price}</p>
          </div>
        </Card.Body>
      </Card>
    </div>
    
  ) : (

    <div>
    <Card>
      <Card.Image
        src={`http://localhost:1234/${product.image.replace("public", "")}`}
        alt={product.name}
        className="object-contain h-80 w-full "
      />
      {/* <div class="bg-contain bg-center ..." style="background-image: url(...)"></div> */}
      <Card.Body>
        <Card.Title tag="h2" className="justify-center">{product.name}</Card.Title>
        <div className="justify-center">
        <p>{product.description}</p>
        <p>Price : Rm {product.price}</p>
        </div>
        <Card.Actions className="justify-start">
          <form onSubmit={onSubmitHandler}>
            <div className="form-control">
              <div className="input-group">
                <Input
                  min={1}
                  type="number"
                  name="quantity"
                  onChange={onChangeHandler}
                />
                <Button color="accent">Add to Cart</Button>
              </div>
            </div>
          </form>
        </Card.Actions>
      </Card.Body>
    </Card>
  </div>
    )}
    </>
  );
}
