"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Star, ShoppingCart, Heart, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

export default function Product() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()
  const productId = searchParams.get("id")

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products")
      const data = await response.json()
      setProducts(data)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching products:", error)
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <main className="bg-black min-h-screen pt-20">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ebfb29]"></div>
        </div>
      </main>
    )
  }

  return (
    <main className="bg-black min-h-screen pt-20">
      <div className="container mx-auto px-4 py-20">
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/"
            className="flex items-center gap-2 text-[#ebfb29] hover:text-white transition-colors duration-300"
          >
            <ArrowLeft size={20} />
            Back to Home
          </Link>
        </div>

        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">All Products</h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">Browse our complete collection of premium products</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 hover:scale-105"
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-[#ebfb29] hover:text-black transition-all duration-300">
                    <Heart size={20} />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={
                          i < Math.floor(product.rating.rate) ? "text-[#ebfb29] fill-current" : "text-gray-600"
                        }
                      />
                    ))}
                  </div>
                  <span className="text-white/60 text-sm">({product.rating.count})</span>
                </div>

                <h3 className="text-white font-semibold mb-2 line-clamp-2 group-hover:text-[#ebfb29] transition-colors duration-300">
                  {product.title}
                </h3>

                <p className="text-white/60 text-sm mb-4 line-clamp-2">{product.description}</p>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-[#ebfb29]">${product.price}</span>
                  <button className="flex items-center gap-2 px-4 py-2 bg-[#ebfb29] text-black font-medium rounded-lg hover:bg-white transition-colors duration-300">
                    <ShoppingCart size={16} />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
