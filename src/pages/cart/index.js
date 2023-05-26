import { useQuery } from "react-query";
import { Table, Button } from "react-daisyui";
import { getCart } from "../api/carts";
import CartItem from "@/components/CartItem";
import axios from "axios";
import localforage from "localforage";
export default function Cart() {
  const { data, isLoading } = useQuery("cart", getCart, {
    refetchOnMount: false,
  });

  if (isLoading) return <h2>Loading...</h2>;

  const checkoutHandler = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:1234/orders", data, {
      headers: { "x-auth-token": localStorage.getItem("token") },
    });
    if (res.status === 200) window.location.href = res.data;
  };

  return (
    <div className="py-10">
      {/* <div className="flex flex-col max-w-3xl p-6 space-y-4 sm:p-10 dark:bg-gray-900 dark:text-gray-100"> */}
	<h2 className="text-xl font-semibold flex justify-center">Your cart</h2>
  <div className="flex flex-col md:px-10 items-center">
	<ul className="divide-y divide-gray-700 w-fit">
        {data &&
        data?.items?.map((item) =><CartItem key={item._id} item={item} />)}
  <div className="flex justify-end"><p className="text-lg font-semibold">Rm: {data.total}</p></div>
	</ul>
  </div>
	<div className="flex justify-center space-x-4">
		<button type="button" className="px-6 py-2 border rounded-md dark:border-violet-400" href="/products">Back
			to shop
		</button>
    <form onSubmit={checkoutHandler}>
            <Button className="block w-full bg-accent">Checkout</Button>
    </form>
	</div>
{/* </div> */}
    </div>

    // <div className="overflow-x-auto py-10 my-10">
    //   <Table className="mx-auto">
    //     <Table.Head>
    //       <span></span>
    //       <span >Name</span>
    //       <span>Quantity</span>
    //       <span>Price</span>
    //       <span></span>
    //     </Table.Head>
    //     <Table.Body>
          // {data &&
          //   data?.items?.map((item) =><CartItem key={item._id} item={item} />)}
    //     </Table.Body>
    //     <Table.Footer>
    //       <span></span>
    //       <span></span>
    //       <span>
            // <form onSubmit={checkoutHandler}>
            // <Button className="block w-full bg-accent">Checkout</Button>
            // </form>
    //       </span>
    //       <span><h1>Total: Rm: {data.total}</h1></span>
    //       <span></span>
    //     </Table.Footer>
    //   </Table>
    // </div>
  );
}
