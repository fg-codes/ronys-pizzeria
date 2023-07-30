import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "../GlobalStyles";
import { Header } from "./Header.js";
import { Homepage } from "./Homepage";
import { PizzaDetails } from "./PizzaDetails.js"
import { Order } from "./Order";
import { Confirm } from "./Confirm";
import { Admin } from "./Admin";
import { OrderDetails } from "./OrderDetails";

const App = () => {
    return (
        <BrowserRouter>
            <GlobalStyle />
            <Header />
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/order" element={<Order />} />
                <Route path="/order/:orderId" element={<OrderDetails />} />
                <Route path="/pizza/:pizzaId" element={<PizzaDetails />} />
                <Route path="/confirm/:orderId" element={<Confirm />} />
                <Route path="/admin" element={<Admin />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
