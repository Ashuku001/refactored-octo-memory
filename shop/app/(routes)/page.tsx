import getBillboard from '@/actions/get-billboard'
import getProducts from '@/actions/get-products'
import Billboard from '@/components/Billboard'
import Container from '@/components/ui/Container'
import ProductList from '@/components/ProductList'

export const revalidate = 0


async function HomePage() {
  const data = await getBillboard(1);
  const billboard = data.billboard

  const prodData = await getProducts({isFeatured: false})
  const products = prodData.products
  return (
    <Container>
      <div className='space-y-10 py-10 '>
        <Billboard data={billboard}/>
      </div>
      <div className='flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8'>
        <ProductList title="Featured products" items={products} />
      </div>
    </Container>
  )
}

export default HomePage
