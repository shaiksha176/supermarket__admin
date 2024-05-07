import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/header/Header";
import useAxios from "../../hooks/useAxios";
import "./dashboard.css";
import { useForm } from "react-hook-form";

const Dashboard = () => {
  const { register, handleSubmit } = useForm();
  // const { data, error, loading, postData } = useAxios(
  //   "http://localhost:8000/api/products",
  // );
  const formItems = [
    {
      label: "Product Name",
      name: "name",
    },
    {
      label: "Category",
      name: "category",
    },
    {
      label: "Description",
      name: "description",
    },
    {
      label: "Quantity In Stock",
      name: "quantityInStock",
    },
    {
      label: "Price",
      name: "price",
    },
    {
      label: "Manufacturer",
      name: "manufacturer",
    },
  ];
  const categoryId = "650865054ed7eae3f59e8932";
  const onSubmit = async (data: any) => {
    console.log(data);
    try {
      const payload = new FormData();
      payload.append("name", "dwefrg");
      console.log(payload.entries());
      // const { data } = await axios.post(
      //   "http://localhost:8000/api/products",
      //   formDataToSend,

      //   {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //     },
      //   },
      // );

      console.log("Data posted successfully");
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  return (
    <div className="dashboard__container">
      <div className="content">
        <div className="outlet">
          {/* <Header /> */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <h3>Add New Product</h3>
            {formItems.map((item, index) => (
              <div key={index}>
                <label>{item.label}</label>
                <input {...register(item.name)} name={item.name} />
              </div>
            ))}
            <div>
              <label>Choose Image</label>
              <input type="file" {...register("image")} name="image" />
            </div>
            <button type="submit">Add Product</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
