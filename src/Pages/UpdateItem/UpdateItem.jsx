import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";

//import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";
//import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";
import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";
import { useLoaderData } from "react-router-dom";

const UpdateItem = () => {
  const loadedItems = useLoaderData();
  const { user } = useContext(AuthContext);

  //const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const {
      user_email,
      item_name,
      user_name,
      image,
      sub_category_name,
      price,
      rating,
      customization,
      processing_time,
      short_description,
      stock_status,
    } = data;

    const craftitem = {
      user_email,
      item_name,
      user_name,
      image,
      sub_category_name,
      price,
      rating,
      customization,
      processing_time,
      short_description,
      stock_status,
    };
    console.log(craftitem);
    //   send data to server
    fetch(
      ` https://assignment-10-server-five-navy.vercel.app/updatingItem/${loadedItems._id}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(craftitem),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.modifiedCount > 0) {
          reset();
          Swal.fire({
            title: "Success!",
            text: "Item  updated successfully",
            icon: "success",
            confirmButtonText: "Cool",
          });
        }
      });
    //const from = "/";
    // adding art
  };
  useEffect(() => {
    const subscription = watch(() => {
      // console.log(data);
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [watch]);
  return (
    <div className=" mx-auto max-w-xl ">
      <Helmet>
        <title>Update Item Info</title>
      </Helmet>
      <div className="max-w-xl">
        <div className="w-full   my-5 bg-[#05A081] bg-opacity-5 p-4 space-y-3 rounded-xl dark:bg-gray-50 dark:text-gray-800">
          <h1 className="text-3xl font-jacquard text-[#05A081] font-bold text-center">
            Update Craft Items
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate=""
            action=""
            className="space-y-6"
          >
            {/* row 1 */}
            <div className="flex gap-3 ">
              {/* name */}

              <div className="space-y-1 text-sm w-1/2">
                <label htmlFor="item_name" className="block dark:text-gray-600">
                  Item Name
                </label>
                <input
                  type="text"
                  name="item_name"
                  id="item_name"
                  defaultValue={loadedItems.item_name}
                  {...register("item_name", {
                    required: true,
                  })}
                  placeholder="Name"
                  className="w-full px-4 py-3 rounded-md focus:border-[#05A081] dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
                />

                <span className="font-semibold text-red-600">
                  {errors.username?.type === "required" && "Name is required"}
                  {errors.username?.type === "pattern" &&
                    "Please enter a valid name"}
                </span>
              </div>

              {/* photo Url */}
              <div className="space-y-1 text-sm w-1/2">
                <label htmlFor="image" className="block dark:text-gray-600">
                  Photo URL
                </label>
                <input
                  type="text"
                  name="image"
                  id="image"
                  defaultValue={loadedItems.image}
                  {...register("image", {
                    pattern: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
                  })}
                  placeholder="photo URL"
                  className="w-full px-4 py-3 rounded-md focus:border-[#05A081] dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
                />

                <span className="font-semibold text-red-600">
                  {errors.image?.type === "pattern" &&
                    "Please enter a valid URL"}
                </span>
              </div>
            </div>

            {/* row 2 */}
            <div className="flex gap-3 ">
              {/* SubCategory  name */}

              <div className="space-y-1 text-sm w-1/2">
                <label
                  htmlFor="sub_category_name"
                  className="block dark:text-gray-600"
                >
                  Sub-Category Name
                </label>
                <input
                  type="text"
                  name="sub_category_name"
                  id="sub_category_name"
                  defaultValue={loadedItems.sub_category_name}
                  {...register("sub_category_name", {
                    required: true,
                  })}
                  placeholder="Sub-Category"
                  className="w-full px-4 py-3 rounded-md focus:border-[#05A081] dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
                />

                <span className="font-semibold text-red-600">
                  {errors.sub_category_name?.type === "required" &&
                    "Sub-category is required"}
                </span>
              </div>

              {/* short description */}
              <div className="space-y-1 text-sm w-1/2">
                <label
                  htmlFor="short_description"
                  className="block dark:text-gray-600"
                >
                  Short Description
                </label>
                <input
                  type="text"
                  name="short_description"
                  id="short_description"
                  defaultValue={loadedItems.short_description}
                  {...register("short_description")}
                  placeholder="Description here"
                  className="w-full px-4 py-3 rounded-md focus:border-[#05A081] dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
                />
              </div>
            </div>

            {/* row 3 */}
            <div className="flex gap-3 ">
              {/* price  name */}

              <div className="space-y-1 text-sm w-1/2">
                <label htmlFor="price" className="block dark:text-gray-600">
                  Price
                </label>
                <input
                  type="text"
                  name="price"
                  id="price"
                  defaultValue={loadedItems.price}
                  {...register("price", {
                    required: true,
                  })}
                  placeholder="Price"
                  className="w-full px-4 py-3 rounded-md focus:border-[#05A081] dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
                />

                <span className="font-semibold text-red-600">
                  {errors.price?.type === "required" && "Price is required"}
                </span>
              </div>

              {/* rating */}
              <div className="space-y-1 text-sm w-1/2">
                <label htmlFor="rating" className="block dark:text-gray-600">
                  Rating
                </label>
                <input
                  type="text"
                  name="rating"
                  id="rating"
                  defaultValue={loadedItems.rating}
                  {...register("rating", {
                    required: true,
                  })}
                  placeholder="Rating"
                  className="w-full px-4 py-3 rounded-md focus:border-[#05A081] dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
                />
                <span className="font-semibold text-red-600">
                  {errors.price?.type === "required" && "rating is required"}
                </span>
              </div>
            </div>
            {/* row 4 */}
            <div className="flex gap-3 ">
              {/* customization  name */}

              <div className="space-y-1 text-sm w-1/2">
                <label
                  htmlFor="customization"
                  className="block dark:text-gray-600"
                >
                  Customization(Y/N)
                </label>
                <input
                  type="text"
                  name="customization"
                  defaultValue={loadedItems.customization}
                  id="customization"
                  {...register("customization", {
                    required: true,
                  })}
                  placeholder="y/N"
                  className="w-full px-4 py-3 rounded-md focus:border-[#05A081] dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
                />

                <span className="font-semibold text-red-600">
                  {errors.price?.type === "required" &&
                    "customization is required"}
                </span>
              </div>

              {/* Processing Time */}
              <div className="space-y-1 text-sm w-1/2">
                <label
                  htmlFor="processing_time"
                  className="block dark:text-gray-600"
                >
                  Processing Time
                </label>
                <input
                  type="text"
                  name="processing_time"
                  id="processing_time"
                  defaultValue={loadedItems.processing_time}
                  {...register("processing_time", {
                    required: true,
                  })}
                  placeholder="Processing Time Here"
                  className="w-full px-4 py-3 rounded-md focus:border-[#05A081] dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
                />
                <span className="font-semibold text-red-600">
                  {errors.price?.type === "required" &&
                    "processing time is required"}
                </span>
              </div>
            </div>

            {/* row 5*/}

            <div className="flex gap-3">
              {/* user  email */}
              <div className="space-y-1 text-sm w-1/2">
                <label
                  htmlFor="user_email"
                  className="block dark:text-gray-600"
                >
                  User Email
                </label>
                <input
                  type="user_email"
                  name="user_email"
                  id="user_email"
                  defaultValue={user.email}
                  {...register("user_email", {
                    required: true,
                    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  })}
                  placeholder="Email"
                  className="w-full px-4 py-3 rounded-md focus:border-[#05A081] dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
                />

                <span className="font-semibold text-red-600">
                  {errors.user_email?.type === "required" &&
                    "Email is required"}
                  {errors.user_email?.type === "pattern" &&
                    "Please enter a valid email address"}
                </span>
              </div>
              {/* user  N */}
              <div className="space-y-1 text-sm w-1/2">
                <label htmlFor="user_name" className="block dark:text-gray-600">
                  User Name
                </label>
                <input
                  type="text"
                  name="user_name"
                  id="user_name"
                  defaultValue={user.displayName}
                  {...register("user_name", {
                    required: true,
                    pattern: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
                  })}
                  placeholder="Name"
                  className="w-full px-4 py-3 rounded-md focus:border-[#05A081] dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
                />

                <span className="font-semibold text-red-600">
                  {errors.user_name?.type === "required" && "Name is required"}
                  {errors.user_name?.type === "pattern" &&
                    "Please enter a valid name"}
                </span>
              </div>
            </div>
            {/* row 6*/}

            <div className="flex gap-3">
              {/* Stock*/}
              <div className="space-y-1 text-sm w-full">
                <label
                  htmlFor="stock_status"
                  className="block dark:text-gray-600"
                >
                  Stock Status(In stock, Made to Order )
                </label>
                <input
                  type="text"
                  name="stock_status"
                  id="stock_status"
                  defaultValue={loadedItems.stock_status}
                  {...register("stock_status", {
                    required: true,
                  })}
                  placeholder="Status"
                  className="w-full px-4 py-3 rounded-md focus:border-[#05A081] dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
                />

                <span className="font-semibold text-red-600">
                  {errors.stock_status?.type === "required" &&
                    "stock is required"}
                </span>
              </div>
            </div>

            <button className="block w-full p-3 text-center rounded-lg bg-[#05A081]  text-white font-bold  dark:text-gray-50 dark:bg-violet-600">
              Update
            </button>
          </form>
        </div>
      </div>
      {/* <ToastContainer></ToastContainer> */}
    </div>
  );
};

export default UpdateItem;
