import getProduct from '@/actions/get-product'
import getProducts from '@/actions/get-products'
import Container from '@/components/ui/Container'
import ProductList from '@/components/ProductList'
import Gallery from '@/components/gallery'
import Info from '@/components/Info'

interface ProductPageProps {
    params: {
        productId: string
    }
}

const ProductPage: React.FC<ProductPageProps> = async ({params}) => {
    const prodData = await getProduct(parseInt(params.productId))
    const sugData = await getProducts({
        categoryId: prodData.product?.category.id.toString(),
    })



    return (
        <div className='bg-white'>
         <Container>
            <div className='px-4 py-10 sm:px-6 lg:px-8'>
                <div className='lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8'>
                    <Gallery images={prodData.product.images}/>
                    <div className='mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0'>
                        {/* Info */}
                        <Info data={prodData.product} />
                    </div>
                </div>
                <hr className='my-10'/>
                <ProductList title="Related Items" items={sugData.products} />
            </div>
         </Container>
        </div>
    )
}

export default ProductPage
