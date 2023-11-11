//import FormButtonSubmit from "@/components/FormButtonSubmit";
import { prisma } from "@/lib/db/prisma";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

const metadata = {
    title: 'Add product - Horizon'
}

async function addProduct(formData: FormData){
    'use server';
    const session = await getServerSession(authOptions);

    if (!session){
        redirect("/api/auth/signin?callbackUrl=/add-product")
    }

    const name = formData.get('name')?.toString();
    const description = formData.get('description')?.toString();
    const imageUrl = formData.get('imageUrl')?.toString();
    const price = Number(formData.get('price')) || 0;

    if(!name || !description || !imageUrl || !price){
        throw Error('Missing required fields')
    }


    await prisma.product.create({
        data: {name,description,imageUrl,price},
    });

    redirect('/')
}



export default async function AddProductPage () {

    const session = await getServerSession(authOptions);

    if (!session){
        redirect("/api/auth/signin?callbackUrl=/add-product")
    }

    return <div>
    <h2 className="text-2xl mb-3 font-bold">Add Product</h2>
    <form action={addProduct}>
        <input type="text"
        required
        name="name"
        className="input mb-3 input-bordered input-primary w-full "
        placeholder="product name..."
        />
        <textarea
        required
        name="description"
        placeholder="description"
        className="textarea mb-3 textarea-primary w-full"
        />
        <input type="url"
        required
        name="imageUrl"
        className="input mb-3 input-bordered input-primary w-full "
        placeholder="product image link..."
        />
        <input type="number" name="price" 
        required
        placeholder="price"
        className="input mb-3 input-bordered input-primary w-full"
        />
        <button className="btn btn-primary btn-block" >Add product</button>
    </form>
  </div>;
};

