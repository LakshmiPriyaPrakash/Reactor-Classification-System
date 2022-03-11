import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import ReactPaginate from "react-paginate";
import "./AllImages.css";
import SingleImage from "../SingleImage";
import { update_Images } from "../../store/images";

function AllImages() {
    const dispatch = useDispatch();
    const allImages = useSelector(state => state.images);
    const [pageNum, setPageNum] = useState(0);
    const [images, setImages] = useState(Object.values(allImages));
    const [imageIDS, setImageIDS] = useState([]);
    const [classification, setClassification] = useState(0);
    const [update, setUpdate] = useState(false);
    const [cancel, setCancel] = useState(false);
    const [category, setCategory] = useState(0);
    const [classHead, setClassHead] = useState("All Images");
    const [remount, setRemount] = useState(0);

    const assignCat = () => {
        if(category === 0) {
            setImages(Object.values(allImages));
        } else if(category === 1) {
            const foamImgs = Object.values(allImages).filter(img => img.tag_id === 1);
            setImages(foamImgs);
        } else if(category === 2) {
            const noFoamImgs = Object.values(allImages).filter(img => img.tag_id === 2)
            setImages(noFoamImgs);
        } else if(category === 3) {
            const unclassImgs = Object.values(allImages).filter(img => img.tag_id === 3)
            setImages(unclassImgs);
        }
    }

    useEffect(() => {
        assignCat();
        onCancel();
    }, [update, allImages]);

    useEffect(() => {
        assignCat();
        setRemount(Math.random());
        onCancel();
    }, [category])


    const onSave = () => {
        if(classification > 0 && imageIDS.length) {
            let updatedTags = [];
            imageIDS.forEach(id => {
                let obj = {
                    "id": id,
                    "tag_id": classification
                }
                updatedTags.push(obj);
            })
            dispatch(update_Images(updatedTags));
            setImageIDS([]);
            setUpdate(!update);
        }
    };

    const onCancel = () => {
        setImageIDS([]);
        setCancel(!cancel);
    };

    const imgsPerPage = 10;
    const pgsVistited = pageNum * imgsPerPage;
    const pageCount = Math.ceil(images.length / imgsPerPage);


    const displayImgs = images
        .slice(pgsVistited, pgsVistited + imgsPerPage)
        .map((image) => {
            return (
                <div key={image.id}>
                    <SingleImage
                        image={image}
                        imageIDS={imageIDS}
                        setImageIDS={setImageIDS}
                        cancel={cancel}
                    />
                </div>
            );
        });

    const changePage = ({ selected }) => {
        setPageNum(selected);
    };


    return (
        <div className="wrapper-cntr">
            <div className="header">
                <h1>Reactor Classification</h1>
            </div>
            <div className="nav-links">
                <div className="link"
                    onClick={() => {
                            setCategory(0)
                            setClassHead("All Images")
                        }
                    }>
                        All Images
                </div>
                <div className="link"
                    onClick={() => {
                        setCategory(1)
                        setClassHead("Foaming")
                    }}>
                        Foaming
                </div>
                <div className="link"
                    onClick={() => {
                        setCategory(2)
                        setClassHead("Non-Foaming")
                    }}>
                        Non-Foaming
                </div>
                <div className="link"
                    onClick={() => {
                        setCategory(3)
                        setClassHead("Unclassified")
                    }}>
                        Unclassified

                </div>
            </div>
            <div className="change-bar">
                <div>
                    Change classification:
                    <select
                        onChange={(e) => setClassification(+e.target.value)}
                    >
                        <option value="0"> --Select--</option>
                        <option value="1">Foaming</option>
                        <option value="2">Non-Foaming</option>
                        <option value="3">Unclassified</option>
                    </select>
                </div>
                <button onClick={onSave}> Save </button>
                <button onClick={onCancel}> Cancel </button>
            </div>
            <h2>{classHead}</h2>
            <div className="img-wrapper">
                {displayImgs}
            </div>
            <div key={remount}>
                <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={"paginationBttns"}
                    activeClassName={"paginationActive"}
                    initialPage={0}
                />
            </div>
        </div>

    );

}



export default AllImages;
