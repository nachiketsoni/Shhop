import { useEffect } from "react";
import "remixicon/fonts/remixicon.css";
import { Routes, Route } from "react-router-dom";
import Register from "./components/Auth/Register";
import Hero from "./components/Home/Hero";
import { useSelector, useDispatch } from "react-redux";
import { getProductsAsync } from "./asyncActions/productAction";
import { clearErrorAsync, getUserDataAsync } from "./asyncActions/userAction";
import CartPage from "./components/Home/CartPage";
import OrderPage from "./components/OrderPage/OrderPage";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-mui";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import HomeLayout from "./components/Elements/MainElements/HomeLayout";
import ProductCard from "./components/Elements/MainElements/ProductCard";
import HomeElements from "./components/Elements/MainElements/HomeElements";
import AboutPage from "./components/Home/AboutPage";
import BrowsePage from "./components/Home/BrowsePage";
import TrendingPage from "./components/Home/TrendingPage";
import UserOrders from "./components/Elements/UserOrders/UserOrders";
import ProfilePage from "./components/Profile/ProfilePage";

import ProtectedRoute from "./components/utils/ProtectedRoute";
import { store } from "./store";
import ErrorPage from "./components/utils/ErrorPage";

import AdminPanel from "./components/Dashboard/AdminPanel";
import AdminProducts from "./components/Dashboard/AdminProducts/AdminProducts";
import Dashboard from "./components/Dashboard/AdminDashboard/Dashboard";
import AdminOrder from "./components/Dashboard/AdminOrder/AdminOrder";
import AdminUsers from "./components/Dashboard/AdminUsers/AdminUsers";
import AdminEditProduct from "./components/Dashboard/AdminProducts/AdminEditProduct";
import InternalServer from "./components/utils/InternalServer";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import axios from 'axios'
const url="https://shhop-backend.vercel.app";
axios.defaults.baseURL = url
function App() {
  const { products } = useSelector((store) => store.products);
  const { user, isAuthenticated, admin, loading, success, error } = useSelector(
    (store) => store.user
  );
  const { theme } = useSelector((store) => store.themeControl);
  const MUItheme = createTheme({
    palette: {
      primary: {
        main: "#E26849",
      },
      secondary: {
        main: "#669C96",
      },
      mode: `${theme ? "light" : "dark"}`,
    },
  });

  const dispatch = useDispatch();
  const options = {
    // you can also just use 'bottom center'
    position: positions.BOTTOM,
    timeout: 1000,
    offset: "30px",
    // you can also just use 'scale'
    transition: transitions.SCALE,
  };

  useEffect((e) => {
    store.dispatch(getUserDataAsync());
    store.dispatch(getProductsAsync());
    if (error) {
      dispatch(clearErrorAsync());
    }
  }, []);
  return (
    <div className="App">
      <ThemeProvider theme={MUItheme}>
        <AlertProvider template={AlertTemplate} {...options}>
          <Routes>
            <Route exact path="/" element={<Hero></Hero>}>
              <Route
                index
                element={
                  <HomeLayout
                    heading={`${
                      user ? `${user.username}!` : " "
                    } have a good day`}
                    cardData={products.map((elm) => (
                      <ProductCard key={elm._id} data={elm} />
                    ))}
                    boxStyle={"grid"}
                    rightSide={<HomeElements />}
                  />
                }
              />
              <Route
                path="product/details/:id"
                element={<ProductDetails />}
              ></Route>
              <Route
                path="products/:keyword"
                element={
                  <HomeLayout
                    heading={`${
                      user ? `${user.username}!` : " "
                    } have a good day`}
                    cardData={products.map((elm) => (
                      <ProductCard key={elm._id} data={elm} />
                    ))}
                    boxStyle={"grid"}
                    rightSide={<HomeElements />}
                  />
                }
              ></Route>
              <Route path="cart" element={<CartPage />} />
              <Route path="browse" element={<BrowsePage />} />
              <Route path="trending" element={<TrendingPage />} />
              <Route path="about" element={<AboutPage />} />
              <Route
                path="profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="myOrders"
                element={
                  <ProtectedRoute>
                    <UserOrders />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route
              exact
              path="/order"
              element={
                <ProtectedRoute>
                  <OrderPage />
                </ProtectedRoute>
              }
            />
            <Route exact path="/auth" element={<Register />} />
            <Route
              exact
              path="admin/dashboard"
              element={
                <ProtectedRoute adminCheck={true}>
                  <AdminPanel />
                </ProtectedRoute>
              }
            >
              <Route
                index
                element={
                  <ProtectedRoute adminCheck={true}>
                    <Dashboard />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="products"
                element={
                  <ProtectedRoute adminCheck={true}>
                    <AdminProducts />
                  </ProtectedRoute>
                }
              >
                <Route exact path=":id" element={<AdminEditProduct />}></Route>
              </Route>
              <Route
                path="orders"
                element={
                  <ProtectedRoute adminCheck={true}>
                    <AdminOrder />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="users"
                element={
                  <ProtectedRoute adminCheck={true}>
                    <AdminUsers />
                  </ProtectedRoute>
                }
              ></Route>
            </Route>
            <Route path="*" element={<ErrorPage></ErrorPage>}></Route>
          </Routes>
        </AlertProvider>
      </ThemeProvider>

      {/* <button onClick={()=>{ dispatch(getProductsAsync());}}>clickME</button> */}
    </div>
  );
}

export default App;
