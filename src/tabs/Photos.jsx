import { useState, useEffect } from 'react';
import Form from '../components/Form/Form';
import { getPhotos } from '../apiService/photos';
import Button from '../components/Button/Button';
import PhotosGallery from '../components/PhotosGallery/PhotosGallery';
import Loader from '../components/Loader/Loader';
const Photos = () => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [totalImages, setTotasImages] = useState(0);

  useEffect(() => {
    if (query === '') return;
    setError(null);
    setIsLoading(true);

    getPhotos(query, page)
      .then(data => {
        const photos = data.photos;
        console.log(data);
        setImages(prevImages =>
          page === 1 ? photos : [...prevImages, ...photos]
        );
        setTotasImages(data.total_results);
      })
      .catch(() => {
        setError('Something went wrong. Please try again later.');
      })
      .finally(() => setIsLoading(false));
  }, [query, page]);

  const nextPage = () => {
    setPage(prevPage => prevPage + 1);
  };
  const getQuery = inputValue => {
    setQuery(inputValue);
    setPage(1);
    setImages([]);
  };
  return (
    <>
      <Form onSubmit={getQuery} />
      {error && <p>Oops</p>}
      {isLoading && <Loader />}

      <PhotosGallery images={images} />
      {images.length > 0 && images.length < totalImages && (
        <Button onClick={nextPage}>Load more</Button>
      )}
    </>
  );
};

export default Photos;
