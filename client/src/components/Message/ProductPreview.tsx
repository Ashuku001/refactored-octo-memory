import { formatter } from '@/lib/utils';
type AboutProductProps = {
  title?: string
  product: {
      name: string;
      price: number
  }
}

export const ProductPreview = ({product, title}: AboutProductProps) => {
  return (
    <>{
    product &&
      <div className=' flex flex-col items-center bg-green-500/10  jusfity-center p-2 rounded-lg w-full'>
          <p className='text-slate-500 text-center'>{title ? title : "Associated Product"}</p>
          <p className='line-clamp-2'>{product?.name}</p> 
          <p>{formatter.format(product.price)}</p> 
      </div>
    }
    </>
    
  )
}
