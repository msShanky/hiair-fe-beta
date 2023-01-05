import React from "react";
import Head from "next/head";
import { AdminLayout } from "@/components/layout";
import { ProductContent } from "@/components/feature";

// TODO: Optimize the initial data fetching to pre-populate the data from api
const ProductManagementPage = () => {
  return (
    <AdminLayout>
      <>
        <Head>
          <title>HiAir | Admin Product Management</title>
        </Head>
        <section className="w-full">
          <ProductContent />
        </section>
      </>
    </AdminLayout>
  );
};

export default ProductManagementPage;