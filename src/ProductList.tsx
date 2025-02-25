import { useEffect, useState } from "react"

interface Props {
    category: string
}

export function ProductList({ category }: Props) {
    const [products, setProducts] = useState<string[]>([])

    // using effect hook to update products state variable
    useEffect(() => {
        console.log(`updating products for category ${category}` )
        setProducts(['Clothing', 'Household'])
    }, [category])

    return (
        <div>ProductList</div>
    )
}