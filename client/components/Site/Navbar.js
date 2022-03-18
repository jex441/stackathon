import React from "react";
import { fetchUserData } from "../../store/user";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Image } from "cloudinary-react";

export const Navbar = (props) => {
  const dispatch = useDispatch();
  let user = [];
  useEffect(() => {
    user = dispatch(fetchUserData(props?.user.username));
  }, []);

  let siteTitle = props?.user.siteTitle
    ? `${props?.user.siteTitle}`
    : `${props.user.firstName} ${props.user.lastName}`;

  document.title = siteTitle;

  let collections = props.user && props.user.collections;
  console.log("collections", collections);

  let [preview, setPreview] = useState({});

  let [workDropdown, setWorkDropdown] = useState("hidden");

  const show = () => {
    setWorkDropdown("flex justify-between dropdown");
  };

  const hide = () => {
    setWorkDropdown("hidden");
  };

  const previewHandler = (e) => {
    e.preventDefault();
    console.log("e.t.v", e.target.value);
    // setPreview(e.target.value?.works[0]);
  };

  console.log(props);
  return (
    <>
      <nav className="flex flex-row justify-between h-18 items-end mx-2 sm:mx-12 mt-10 tracking-widest">
        <div className="text-lg sm:text-xl">
          <Link to={`/${props.user.userName}`}>{siteTitle}</Link>
        </div>
        <div className="flex flex-row space-x-3 text-sm pe-5">
          <div
            className="subHeader cursor-pointer"
            onMouseOver={show}
            onMouseLeave={hide}
            onClick={hide}
          >
            <Link to={`/${props.user.userName}`}>Selected Work</Link>
            <div className={workDropdown}>
              <div className="h-3/6 w-3/6 bg-red-100 m-5">
                <Image
                  cloudName="jeffreywood"
                  publicId={preview.imgId}
                  className="hover:cursor-pointer"
                  id={preview.collectionTitle}
                  value={preview.id}
                  // onClick={(e) => props.editHandler(e)}
                />
              </div>
              <ul>
                {collections &&
                  collections
                    .filter((collection) => collection.hidden === false)
                    .sort(function (a, b) {
                      return a.order - b.order;
                    })
                    .map((collection, idx) =>
                      props.setCollection ? (
                        <li
                          value={collection}
                          key={idx}
                          className="cursor-pointer mx-8"
                          onMouseOver={(e) => previewHandler(e)}
                          onClick={() => {
                            props.setCollection(collection);
                          }}
                        >
                          <Link
                            to={`/${props.user.userName}/work/${collection.title}`}
                          >
                            {collection.title}
                          </Link>
                        </li>
                      ) : (
                        <li
                          key={idx}
                          className="cursor-pointer mx-8"
                          onMouseOver={(e) => previewHandler(e)}
                        >
                          <Link
                            to={`/${props.user.userName}/work/${collection.title}`}
                          >
                            {collection.title}
                          </Link>
                        </li>
                      )
                    )}
              </ul>
            </div>
          </div>
          <Link to={`/${props.user.userName}/about`} className="subHeader">
            <div>About</div>
          </Link>
          <Link to={`/${props.user.userName}/cv`} className="subHeader">
            <div>CV</div>
          </Link>
          <Link to={`/${props.user.userName}/contact`} className="subHeader">
            <div>Contact</div>
          </Link>
        </div>
      </nav>
    </>
  );
};

// import React from "react";
