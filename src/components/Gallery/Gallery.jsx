import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { GalleryContainer, GalleryStyled } from './Gallery.styled';
import { Button, Loader } from 'components/Styled';
import { requestPixabayImages } from 'helpers/requests';
import { BiUpArrow } from 'react-icons/bi';
import GalleryItem from './GalleryItem';
import Modal from 'components/Modal/Modal';
import Message from 'components/Message/Message';
import { useCallback } from 'react';

const Gallery = ({ query, page, nextPage }) => {
  const [state, setState] = useState('idle');
  const [images, setImages] = useState([]);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(null);
  const [reachedEnd, setReachedEnd] = useState(false);
  const [largeImage, setLargeImage] = useState(null);
  const [modalOpened, setModalOpened] = useState(false);

  const fetchImages = useCallback(() => {
    setState('pending');

    requestPixabayImages({ query, page })
      .then(result => {
        const { images, totalHits, totalPages } = result;

        setState('resolved');
        setTotal(totalHits);
        setReachedEnd(page === totalPages);
        setImages(imgs => [...imgs, ...images]);
      })
      .catch(error => {
        setState('rejected');
        setError(error);
      });
  }, [query, page]);

  useEffect(() => {
    if (!query) return;

    if (page === 1) {
      setImages([]);
      setTotal(0);
    }

    fetchImages();
  }, [query, page, fetchImages]);

  const loadMore = () => {
    nextPage();
  };

  const openModal = e => {
    setLargeImage(e.currentTarget.getAttribute('data-imageurl'));
    setModalOpened(true);
  };

  const closeModal = e => {
    setModalOpened(false);
    setLargeImage(null);
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <GalleryContainer>
      {query === '' ? (
        <Message>Please select or enter search query</Message>
      ) : (
        <>
          {!total && query && state !== 'pending' && (
            <Message>Sorry, we couldn't find any results</Message>
          )}
          {total !== 0 && (
            <>
              <GalleryStyled>
                {images.map(imageData => (
                  <GalleryItem
                    key={imageData.id}
                    imageData={imageData}
                    onModalOpen={openModal}
                  />
                ))}
              </GalleryStyled>

              {!reachedEnd && state !== 'pending' && (
                <Button type="button" onClick={loadMore}>
                  Load more
                </Button>
              )}

              {reachedEnd && (
                <>
                  <Message>That's all we have</Message>
                  <Button type="button" className="icon" onClick={scrollToTop}>
                    <BiUpArrow />
                  </Button>
                </>
              )}
            </>
          )}

          {state === 'pending' && <Loader className="pending" />}

          {state === 'rejected' && (
            <div className="rejected">{error.message}</div>
          )}

          {modalOpened && (
            <Modal onCloseModal={closeModal}>
              {largeImage && (
                <img className="large-image" src={largeImage} alt="large" />
              )}
            </Modal>
          )}
        </>
      )}
    </GalleryContainer>
  );
};

Gallery.propTypes = {
  query: PropTypes.string.isRequired,
};

export default Gallery;
