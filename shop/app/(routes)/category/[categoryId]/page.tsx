import getCategory from "@/actions/get-category";
import getColors from "@/actions/get-colors";
import getProducts from "@/actions/get-products";
import getSizes from "@/actions/get-sizes";
import Billboard from "@/components/Billboard";
import Container from "@/components/ui/Container";
import Filter from "./components/Filter";
import NoResults from "@/components/ui/No-Results";
import ProductCard from "@/components/ui/Product-Card";
import MobileFilter from "./components/Mobile-Filter";

interface CategoryPageProps {
    params: {
        categoryId: string;
    }
    searchParams: {
        colorId: string;
        sizeId: string;
    }

}
async function CategoryPage({params, searchParams}: CategoryPageProps) {
    const prodData = await getProducts({
        categoryId: params.categoryId,
        colorId: searchParams.colorId,
        sizeId: searchParams.sizeId
    })
    const products = prodData.products
    const sizes = await getSizes();
    const colors = await getColors();
    const category = await getCategory(params.categoryId)
    return (
        <div className="bg-white ">
            <Container>
                <div className="py-10">
                    <Billboard data={category.category.billboard}/>
                </div>
                <div className="px-4 sm:px-6 lg:px-8 pb-24">
                    <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
                        <MobileFilter sizes={sizes.sizes} colors={colors.colors}/>
                        <div className="hidden lg:block">
                            <Filter
                                valueKey="sizeId"
                                name="Sizes"
                                data={sizes.sizes}
                            />
                            <Filter
                                valueKey="colorId"
                                name="Colors"
                                data={colors.colors}
                            />
                        </div>
                        <div className="mt-6 lg:col-span-4 lg:mt-0">
                            {products.length === 0 && <NoResults/>}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {products.map((item) => (
                                    <ProductCard key={item.id} data={item}/>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default CategoryPage
