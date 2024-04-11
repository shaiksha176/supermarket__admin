import Sidebar from "../../components/Sidebar";
import Header from "../../components/header/Header";
import "./dashboard.css";
const Dashboard = () => {
  const formItems = [
    {
      label: "Product Name",
    },
    {
      label: "Category",
    },
    {
      label: "Description",
    },
    {
      label: "Quantity In Stock",
    },
    {
      label: "Price",
    },
    {
      label: "Manufacturer",
    },
  ];
  return (
    <div className="dashboard__container">
      <Sidebar />
      <div className="content">
        <div className="outlet">
          <Header />
          <form>
            <h3>Add New Product</h3>
            {formItems.map((item, index: number) => (
              <div>
                <label>{item.label}</label>
                <input />
              </div>
            ))}
            <div>
              <label>Choose Image</label>
              <input type="file" />
            </div>
            <button type="submit">Add Product</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
