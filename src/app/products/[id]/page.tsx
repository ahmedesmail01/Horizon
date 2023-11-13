import PriceTag from "@/components/PriceTag";
import AddToCartButton from "@/app/products/AddToCartButton";
import { prisma } from "@/lib/db/prisma"
import Image from "next/image";
import { notFound } from "next/navigation"
import { cache } from "react";
import { Metadata } from "next";
import { incrementProductQuantity } from "./actions";

interface ProductPageProps {
    params : {
        id: string,
    }
}

const getProduct = cache(async (id:string)=>{
    const product = await prisma.product.findUnique({
        where:{
            id
        }
    })
    if (!product) notFound();
    return product;
})

export async function generateMetadata({
    params: { id },
  }: ProductPageProps): Promise<Metadata> {
    const product = await getProduct(id);
  
    return {
      title: product.name + " - Horizon",
      description: product.description,
      openGraph: {
        images: [{ url: product.imageUrl }],
      },
    };
}

export default async function ProductPage({params:{id}} : ProductPageProps){
    
    const product = await getProduct(id);

    return (
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center">
            <Image
                src={product.imageUrl}
                alt={product.name}
                height={500}
                width={500}
                className="rounded-lg"
                priority
            />
            <div>
                <h1 className="text-5xl font-bold">{product.name}</h1>
                <PriceTag price={product.price} className="mt-4" />
                <p className="py-4">{product.description}</p>
                <AddToCartButton productId={product.id} incermentProductQuantity={incrementProductQuantity} />
            </div>
        </div>
    )
}