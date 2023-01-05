import { Loader } from "@mantine/core";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import ProductCategoryCard from "../../components/feature/product/ProductCategoryCard";
import AppLayout from "../../components/layout/AppLayout";
import { useGetProductCategoriesQuery } from "../../reducer/breezeBaseApi";
import { definitions } from "../../types/supabase";

const Product: NextPage = () => {
	const router = useRouter();

	const { isLoading, data, isSuccess } = useGetProductCategoriesQuery();

	console.log(" API STATUS ===> ", isLoading, data, isSuccess);

	const handleCategoryRedirection = (category: definitions["product_category"]) => {
		const categoryRoute = `/products/${category.category?.toLowerCase()}`;
		router.push(categoryRoute);
	};

	return (
		<AppLayout>
			<>
				<Head>
					<title>HiAir | Products</title>
				</Head>
				{isLoading && (
					<div className="flex justify-center w-full h-56">
						<Loader size={60} />
					</div>
				)}
				{isSuccess && (
					<section className="container flex flex-wrap gap-10 mx-auto my-20">
						{data?.body?.map((categoryData, index) => {
							return (
								<ProductCategoryCard
									handleCardClick={() => handleCategoryRedirection(categoryData)}
									key={`CATEGORY_INDEX_${index + 15}`}
									categoryProp={categoryData}
								/>
							);
						})}
					</section>
				)}
			</>
		</AppLayout>
	);
};

export default Product;
