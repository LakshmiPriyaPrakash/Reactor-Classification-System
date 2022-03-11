import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { getImages } from './store/images';
import './App.css';
import AllImages from "./components/AllImages";


function App() {

  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    dispatch(getImages())
      .then(() => setLoaded(true));
  }, [dispatch]);

  return(

    <div>
      {loaded &&
        <AllImages />
      }
    </div>
  );
}

export default App;
