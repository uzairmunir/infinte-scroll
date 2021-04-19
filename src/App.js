import React, { useEffect, useState } from 'react';
import './App.css';
const App = () => {
  const [photos, setPhotos] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const fetchPhotos = async (pageNumber) => {
    const url = await fetch(
      `https://picsum.photos/v2/list?page=${pageNumber}&limit=10`
    );
    const data = await url.json();
    setPhotos((photo) => [...photo, ...data]);
  };
  useEffect(() => {
    fetchPhotos(pageNumber);
  }, [pageNumber]);
  console.log(photos);
  const loadMore = (e) => {
    e.preventDefault();
    setPageNumber((prev) => prev + 1);
  };
  return (
    <div className='container'>
      <h1>Infinite Scroll</h1>
      {photos.map((photo) => (
        <div key={photo.id} className='photo-container'>
          <img src={photo.download_url} className='photos' />
          <p>{photo.author}</p>
        </div>
      ))}
      <p>Length : {photos.length}</p>
      <button className='btn' onClick={loadMore}>
        Load More
      </button>
    </div>
  );
};

export default App;
