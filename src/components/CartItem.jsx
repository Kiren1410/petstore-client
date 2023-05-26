import { Mask, Table, Button } from "react-daisyui";
import { useMutation, useQueryClient } from "react-query";
import Swal from "sweetalert2";
import { deleteItem } from "@/pages/api/carts";

export default function CartItem({ item }) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(deleteItem, {
    onSuccess: (data) => {
      Swal.fire("Deleted!", data.msg, "success");
      queryClient.invalidateQueries("cart");
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
        <li className="flex flex-col py-6 sm:flex-row sm:justify-between">
			<div className="flex w-full space-x-2 sm:space-x-4">
				<img className="flex-shrink-0 object-cover w-20 h-20 dark:border-transparent rounded outline-none sm:w-32 sm:h-32 dark:bg-gray-500"           src={`http://localhost:1234/${item.product.image.replace(
            "public",
            ""
          )}`} alt="" />
				<div className="flex flex-col justify-between w-full pb-4">
					<div className="flex justify-between w-full pb-2 space-x-2">
						<div className="space-y-1">
							<h3 className="text-lg font-semibold leading-snug sm:pr-8">{item.product.name}</h3>
						</div>
						<div className="text-right">
							<p className="text-lg font-semibold">Rm: {item.subtotal}</p>
						</div>
					</div>
            <div className="text-right">
							<p className="text-lg font-semibold">Quantity x{item.quantity}</p>
						</div>
					<div className="flex text-sm divide-x">
						<button type="button" className="flex items-center px-2 py-1 pl-0 space-x-1">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4 fill-current">
								<path d="M96,472a23.82,23.82,0,0,0,23.579,24H392.421A23.82,23.82,0,0,0,416,472V152H96Zm32-288H384V464H128Z"></path>
								<rect width="32" height="200" x="168" y="216"></rect>
								<rect width="32" height="200" x="240" y="216"></rect>
								<rect width="32" height="200" x="312" y="216"></rect>
								<path d="M328,88V40c0-13.458-9.488-24-21.6-24H205.6C193.488,16,184,26.542,184,40V88H64v32H448V88ZM216,48h80V88H216Z"></path>
							</svg>
							<span onClick={() => deleteHandler(item.product._id)} >Remove</span>
						</button>
					</div>
				</div>
			</div>
		</li>




//   <div className="flex flex-col max-w-3xl p-6 space-y-4 sm:p-10 dark:bg-gray-900 dark:text-gray-100">
// 	<h2 className="text-xl font-semibold">Your cart</h2>
// 	<ul className="flex flex-col divide-y divide-gray-700">
// 		<li className="flex flex-col py-6 sm:flex-row sm:justify-between">
// 			<div className="flex w-full space-x-2 sm:space-x-4">
// 				<img className="flex-shrink-0 object-cover w-20 h-20 dark:border-transparent rounded outline-none sm:w-32 sm:h-32 dark:bg-gray-500"           src={`http://localhost:1234/${item.product.image.replace(
//             "public",
//             ""
//           )}`} alt="" />
// 				<div className="flex flex-col justify-between w-full pb-4">
// 					<div className="flex justify-between w-full pb-2 space-x-2">
// 						<div className="space-y-1">
// 							<h3 className="text-lg font-semibold leading-snug sm:pr-8">{item.product.name}</h3>
// 						</div>
// 						<div className="text-right">
// 							<p className="text-lg font-semibold">Rm: {item.subtotal}</p>
// 						</div>
// 					</div>
// 					<div className="flex text-sm divide-x">
// 						<button type="button" className="flex items-center px-2 py-1 pl-0 space-x-1">
// 							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4 fill-current">
// 								<path d="M96,472a23.82,23.82,0,0,0,23.579,24H392.421A23.82,23.82,0,0,0,416,472V152H96Zm32-288H384V464H128Z"></path>
// 								<rect width="32" height="200" x="168" y="216"></rect>
// 								<rect width="32" height="200" x="240" y="216"></rect>
// 								<rect width="32" height="200" x="312" y="216"></rect>
// 								<path d="M328,88V40c0-13.458-9.488-24-21.6-24H205.6C193.488,16,184,26.542,184,40V88H64v32H448V88ZM216,48h80V88H216Z"></path>
// 							</svg>
// 							<span>Remove</span>
// 						</button>
// 					</div>
// 				</div>
// 			</div>
// 		</li>
// 	</ul>
// 	<div className="space-y-1 text-right">
// 		<p>Total amount:
// 			<span className="font-semibold">Rm: {item.subtotal}</span>
// 		</p>
// 	</div>
// 	<div className="flex justify-end space-x-4">
// 		<button type="button" className="px-6 py-2 border rounded-md dark:border-violet-400">Back
// 			<span className="sr-only sm:not-sr-only">to shop</span>
// 		</button>
// 		<button type="button" className="px-6 py-2 border rounded-md dark:bg-violet-400 dark:text-gray-900 dark:border-violet-400">
// 			<span className="sr-only sm:not-sr-only">Continue to</span>Checkout
// 		</button>
// 	</div>
// </div>





    // <Table.Row>
    //   <div className="flex items-center space-x-3 truncate">
    //     <Mask
    //       className="w-20 h-20 object-cover"
    //       variant="squircle"
          // src={`http://localhost:1234/${item.product.image.replace(
          //   "public",
          //   ""
          // )}`}
    //     />
    //     <div>
    //       <div className="font-bold">{item.product.name}</div>
    //     </div>
    //   </div>
    //   <div>Price</div>
    //   <div>{item.quantity}</div>
    //   <div>{item.subtotal}</div>
    //   <div>
    //   <Button color="error" onClick={() => deleteHandler(item.product._id)}>
    //     Delete
    //   </Button>
    //   </div>
    // </Table.Row>
     
    
  );
}
