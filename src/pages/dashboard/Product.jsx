import { Table, Mask, Button } from "react-daisyui";
import { useMutation, useQueryClient } from "react-query";
import Swal from "sweetalert2";
import { deleteProduct } from "../api/products";
import { useState } from "react";
import EditProduct from "@/components/Modal/EditProduct";

export default function DashboardProduct({ product }) {
  const [visible, setVisible] = useState(false);
  const queryClient = useQueryClient();
  const { mutate } = useMutation(deleteProduct, {
    onSuccess: (data) => {
      Swal.fire("Deleted!", data.msg, "success");
      queryClient.invalidateQueries("products");
    },
    onError: (error) => {
      Swal.fire("Oops", error.response.data.msg, "error");
    },
  });

  const deleteHandler = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        mutate(id);
      }
    });
  };

  return (
    <Table.Row>
      <div>
        <Mask
          variant="squircle"
           src={`http://localhost:1234${product.image.replace("public", "")}`}
          className="object-scale-down h-20 w-40"
        />
      </div>
      <div className="items-center space-x-3 truncate">
        <div>
          <div className="font-bold">{product.name}</div>
        </div>
      </div>
      <div>{product.description}</div>
      <div>{product.price}</div>
      <div>{product.quantity}</div>
      {!product.isActive ? (
        <>
          <Button color="error">X</Button>
        </>
      ) : (
        <>
          <Button color="success">Check</Button>
        </>
      )}
      <Button color="warning" onClick={() => setVisible(true)}>
        Edit
      </Button>
      <EditProduct
        visible={visible}
        setVisible={setVisible}
        product={product}
      />

      <Button color="error" onClick={() => deleteHandler(product._id)}>
        Delete
      </Button>
    </Table.Row>
  );
}
