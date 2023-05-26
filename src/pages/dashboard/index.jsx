import { Table, Checkbox } from "react-daisyui";
import { useQuery } from "react-query";
import DashboardProduct from "./product";
import { useRouter } from "next/router";
import { getProducts } from "../api/products";

export default function Dashboard(props) {
  const { data } = useQuery("products", getProducts, {
    refetchOnMount: false,
    revalidateOnMount: true,
  });

  const router = useRouter();

  return (
    <div className="overflow-x-auto py-10">
      <Table className="rounded-box mx-auto">
        <Table.Head>
          <Checkbox />
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span />
          <span />
        </Table.Head>

        <Table.Body>
          {data &&
            data.map((product) => (
              <DashboardProduct key={product._id} product={product} />
            ))}
        </Table.Body>

        <Table.Footer>
          <span>&nbsp;</span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span>&nbsp;</span>
          <span>&nbsp;</span>
        </Table.Footer>
      </Table>
    </div>
  );
}

export async function getServerSideProps() {
  const data = await getProducts();
  return {
    props: { data },
  };
}
