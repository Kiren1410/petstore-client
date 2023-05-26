import { getOrders } from "../api/orders";
import { useQuery } from "react-query";
import Moment from 'react-moment';




export default function Orders() {
	const { data, isLoading } = useQuery("orders", getOrders, {
		refetchOnMount: false,
	  });
	  if (isLoading) return <h2>Loading...</h2>;
	  
	  
	  
	//   let quantities = data?.map(order => {
	// 	let totalQuantity = 0;
	// 		order.items.map(item => totalQuantity += item.quantity)
	// 	return totalQuantity
	//   })

	//   console.log(quantities)
	
    return (
    <div>
	<div className="container p-2 mx-auto sm:p-4 dark:text-gray-100">
	<h2 className="mb-4 text-2xl font-semibold leading-tight">Orders</h2>
	<div className="overflow-x-auto">
		<table className="min-w-full text-xs">
			<colgroup>
				<col/>
				<col/>
				<col/>
				<col/>
				<col/>
				<col className="w-24"/>
			</colgroup>
			<thead className="dark:bg-gray-700">
				<tr className="text-left">
					<th className="p-3">Order_Id</th>
					<th className="p-3">Product Quantity</th>
					<th className="p-3">Purchased Date</th>
					<th className="p-3"></th>
					<th className="p-3 text-right">Amount</th>
					<th className="p-3">Status</th>
				</tr>
			</thead>
			<tbody>
				{
					data?.map(order => (						
					<tr className="border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-900">
					<td className="p-3">
						<p>{order._id}</p>
					</td>
					<td className="p-3">
						{
							order.items.map(item => <div>
								<p>{item.product.name}  x{item.quantity}</p>
							</div>)
						}
					</td>
					<td className="p-3">
						<Moment format="DD/MM/YYYY HH:MM:SS">{order.purchased_date}</Moment>
					</td>
					<td className="p-3">
						<p></p>
						<p className="dark:text-gray-400"></p>
					</td>
					<td className="p-3 text-right">
						<p>RM {order.total}</p>
					</td>
					<td className="p-3 text-right">
						<span className="px-3 py-1 font-semibold rounded-md bg-accent dark:text-gray-900">
							<span>Success</span>
						</span>
					</td>
				</tr>			
					))
				}
			</tbody>
		</table>
	</div>
</div>
		</div>

    );
}