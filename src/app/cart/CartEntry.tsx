"use client";
import { CartItemWithProduct } from "@/lib/db/cart"
import { formatPrice } from "@/lib/format";
import Image from "next/image";
import Link from "next/link";
import { useTransition } from "react";

interface CartEntryProps{
    cartItem: CartItemWithProduct;
    setProductQuantity: (productId: string , quantity: number)=>Promise<void>;
}

export default function CartEntry({cartItem:{product,quantity},setProductQuantity}:CartEntryProps){
    const quantityOptions: JSX.Element[] = [];
    for(let i = 1; i < 99 ; i++ ){
        quantityOptions.push(
            <option value={i}>{i}</option>
        )
    }
    const [isPending,setTransition]= useTransition();
    return(
        <div className="m-3">
            <div className="flex flex-wrap gap-3 items-center">
                <Image
                src={product.imageUrl}
                alt={product.name}
                width={200}
                height={200}
                className="rounded-lg"
                />
                <div>
                    <Link href={"/products/"+product.id} className="font-bold">{product.name}</Link>
                    <div>Price: {formatPrice(product.price)}</div>
                    <div className="my-1 flex items-center gap-2">
                        Quantity: <select defaultValue={quantity} className="select select-bordered w-full max-w-[80px]"
                        onChange={(e)=>{
                            const newQuantity = parseInt(e.currentTarget.value)
                            setTransition(async()=>{
                                await setProductQuantity(product.id,newQuantity)
                            })
                        }}
                        >
                            <option value={0}>0 (Remove)</option>
                            {quantityOptions}
                        </select>
                    </div>
                    <div className="flex gap-3 items-center">
                        Total: {formatPrice(product.price * quantity)}
                        {isPending && <span className="loading loading-spinner loading-sm"/>}
                    </div>
                </div>
            </div>
            <div className="divider"/>
        </div>
    )
}