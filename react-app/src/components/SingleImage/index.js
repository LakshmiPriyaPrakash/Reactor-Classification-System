import React, { useState, useEffect } from "react";
import "./SingleImage.css";

function SingleImage({ image, imageIDS, setImageIDS, cancel }) {

    const [selected, setSelected] = useState(false);
    const [imageId, setImageId] = useState();

    useEffect(() => {
        if(imageId) {
            if(selected && !imageIDS.includes(imageId)) {
                let newIDS = [...imageIDS, imageId];
                setImageIDS(newIDS);
            } else {
                let newIDS = imageIDS.filter(id => id !== imageId);
                setImageIDS(newIDS);
            }
        }
    }, [imageId, selected, setImageIDS]);

    useEffect(() => {
        if(imageIDS.includes(image.id)) {
            setSelected (true);
        } else {
            setSelected (false);
        }
    }, [image, cancel])


    return (
        <div id={image.id}
            className={selected ? "selected-cntr" : "image-cntr"}
            onClick={() =>  {
                setSelected(!selected)
                setImageId(image.id)
                }
            }
        >
            <img src={image.image_url} alt="reactor"/>
            <p>{image.tag_name}</p>
        </div>
    );

};


export default SingleImage;
