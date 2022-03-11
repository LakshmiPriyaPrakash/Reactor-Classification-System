const LOAD_IMAGES = "images/LOAD";
const UPDATE_IMAGES = "images/UPDATE_IMAGES";


const loadImages = (images) => ({
    type: LOAD_IMAGES,
    images,
});


const updateImages = (updatedImages) => ({
  type: UPDATE_IMAGES,
  updatedImages,
});


export const getImages = () => async (dispatch) => {
    const response = await fetch("http://localhost:5000");

    if (response.ok) {
      const images = await response.json();
      dispatch(loadImages(images));
    }
};



export const update_Images = (updatedImages) => async (dispatch) => {
  const response = await fetch("/", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedImages),
  });

  const data = await response.json();

  if (!data.errors) {
    dispatch(updateImages(data));
  }

  return data;
};



const initialState = {};


export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_IMAGES: {
        const newState = {...state, ...action.images}
        return newState;
    }

    case UPDATE_IMAGES:{
      const newState = {...state, ...action.updatedImages}
      for (let key in action.updatedImages) {
        let obj = action.updatedImages[key]
        newState[key] = obj;
      }
      return newState;
    }

    default:
      return state;
  }
};
