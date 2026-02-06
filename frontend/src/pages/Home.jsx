
import { Images } from "lucide-react";
import Navbar from "../components/Navbar";
import ImageSlider from "../components/ImageSlider";
import Footer from "../components/Footer";
import Product from "../components/Product";
import PageTitle from "../components/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProduct } from "../features/products/productSlice";



const Home = () => {
  const { products, productsCount, loading, error } = useSelector((state) => state.product);

  const dispatch = useDispatch();

  useEffect(() => { dispatch(getProduct()) }, [dispatch]);

  return (
    <>
      <PageTitle title={"Home | Avirah Herbs"} />
      <Navbar />
      <ImageSlider />
      <div className="mt-12 p-8 flex flex-col items-center justify-around text-gray-900">
        <h1 className="text-4xl font-semibold mb-8 text-blue-700 text-center drop-shadow-sm">Latest Collections</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products && products.map((product, index) => (
            <Product key={product._id || index} product={product} />
          ))}

        </div>
      </div>
      <Footer />
    </>
  )
}

export default Home;
