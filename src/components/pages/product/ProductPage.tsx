import { useEffect, useState, ReactElement } from 'react';
import { useLocation } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { api } from '../../../api/api';
import { ApiResponse, Category, Product } from '../../../types/api';
import { Sidebar } from '../../sidebar/Sidebar';
import Breadcrumbs from '../../breadcrumbs/Breadcrumbs';
import { ShopingAttributs } from '../../shopingAttributs/ShopingAttributs';
import './productPage.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export function ProductPage(): ReactElement {
  const [categories, setCategories] = useState<ApiResponse<Category[]> | null>(
    null,
  );
  const [productData, setProductData] = useState<ApiResponse<Product> | null>(
    null,
  );
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [modalActive, setModalActive] = useState(false);
  const location = useLocation();
  const locationArray = location.pathname.split('/');
  const [cart, setCart] = useState<string[] | null>(null);

  useEffect(() => {
    const loadCart = async () => {
      const cartResp = await api.carts.getCart();
      if (cartResp.isSuccessful && cartResp.data) {
        const cartItems = cartResp.data.lineItems.map((line) => line.productId);
        setCart(cartItems);
      }
    };
    loadCart();
  }, []);
  function handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      setModalActive(false);
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  useEffect(() => {
    const getProduct = async () => {
      if (!categories) {
        const categoriesResponse = await api.catalog.getCategories();
        setCategories(categoriesResponse);
      }
      const pathArray = location.pathname.split('/');
      const lastNest = pathArray[pathArray.length - 1];
      const getProductData = await api.catalog.getProductByKey(lastNest);
      setProductData(getProductData);
    };
    getProduct();
  }, [categories, location.pathname]);

  useEffect(() => {
    if (!currentImage && productData && productData?.data) {
      setCurrentImage(productData.data.imagesUrl[0]);
    }
  }, [currentImage, productData]);

  if (!productData || !productData.data) return <div>Loading...</div>;

  return (
    <main className='product-page'>
      <Sidebar categories={categories} />
      <div className='product-page__main-section'>
        <Breadcrumbs locationArray={locationArray} />
        <div className='product-page__data'>
          <div className='product-page__images_wrapper'>
            <div className='product-page__images-container'>
              <button
                type='button'
                className='product-page__current-image-container'
                onClick={() => setModalActive(true)}
              >
                {currentImage && (
                  <img
                    src={currentImage}
                    alt='current'
                    className='product-page__current-image'
                  />
                )}
              </button>
              <div className='product-page__images-navigation'>
                {productData.data.imagesUrl.map((imageUrl) => (
                  <button
                    type='button'
                    onClick={() => {
                      setCurrentImage(imageUrl);
                    }}
                    key={imageUrl}
                    className={`product-page__image-container ${
                      imageUrl === currentImage
                        ? 'product-page__image-container_active'
                        : null
                    }`}
                  >
                    <img
                      className='product-page__image'
                      src={imageUrl}
                      alt={productData.data && productData.data.name}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
          {modalActive && (
            <div className='modal-wrapper'>
              <div className='modal-wrapper__container'>
                <button
                  type='button'
                  className='modal-wrapper__close'
                  onClick={() => setModalActive(false)}
                >
                  X
                </button>
                <Swiper
                  modules={[Navigation, Pagination, Scrollbar, A11y]}
                  spaceBetween={50}
                  navigation
                  pagination={{ clickable: true }}
                  scrollbar={{ draggable: true }}
                  initialSlide={
                    currentImage
                      ? productData.data.imagesUrl.indexOf(currentImage)
                      : 0
                  }
                >
                  {productData.data.imagesUrl.map((imageUrl, index) => (
                    <SwiperSlide key={imageUrl}>
                      <img
                        src={imageUrl}
                        alt={`slide ${index}`}
                        className='slider-image'
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          )}
          <div className='product-page__product-detailes'>
            <div className='product-page__title-container'>
              <h1 className='product-page__title'>{productData?.data?.name}</h1>
              <div className='product-page__author'>
                by{' '}
                <span className='product-page__bold'>
                  {productData?.data?.attributes[0].value}
                </span>
              </div>
              <div className='product-page__description'>
                <span className='product-page__bold'>
                  {productData?.data?.description}
                </span>
              </div>
            </div>
            <div className='product-page__shoping-attributs'>
              {productData.data && (
                <ShopingAttributs
                  item={productData.data}
                  itemInCart={cart ? cart.includes(productData.data.id) : false}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
