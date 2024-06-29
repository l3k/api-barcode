import { Router } from "express";
import multer from "multer";
import { ensureAuthenticate } from "./middlewares/ensureAuthenticated";
import { AuthenticateUserController } from "./useCases/auth/authenticateUser/AuthenticateUserController";
import { RefreshTokenUserController } from "./useCases/auth/refreshTokenUser/RefreshTokenUserController";
import { CreateUserController } from "./useCases/users/createUser/CreateUserController";

// Dashboard
import { GetDataController } from "./useCases/dashboard/getData/GetDataController";
import { ExportCsvController } from "./useCases/dashboard/exportCsv/ExportCsvController";

// Products
import { ProductToPdfController } from "./useCases/products/productToPdf/ProductToPdfController";
import { ImportProductController } from "./useCases/products/importProduct/ImportProductController";
import { CreateProductController } from "./useCases/products/createProduct/CreateProductController";
import { ListProductController } from "./useCases/products/listProduct/ListProductController";
import { ListProductsController } from "./useCases/products/listProducts/ListProductsController";
import { UpdateProductController } from "./useCases/products/updateProduct/UpdateProductController";
import { DeleteProductController } from "./useCases/products/deleteProduct/DeleteProductController";

// Associates
import { ImportAssociateController } from "./useCases/associates/importAssociate/ImportAssociateController";
import { CreateAssociateController } from "./useCases/associates/createAssociate/CreateAssociateController";
import { ListAssociateController } from "./useCases/associates/listAssociate/ListAssociateController";
import { ListAssociatesController } from "./useCases/associates/listAssociates/ListAssociatesController";
import { UpdateAssociateController } from "./useCases/associates/updateAssociate/UpdateAssociateController";
import { DeleteAssociateController } from "./useCases/associates/deleteAssociate/DeleteAssociateController";

// Orders
import { CreateOrderController } from "./useCases/orders/createOrder/CreateOrderController";
import { ListOrderController } from "./useCases/orders/listOrder/ListOrderController";
import { ListOrdersController } from "./useCases/orders/listOrders/ListOrdersController";
import { UpdateOrderController } from "./useCases/orders/updateOrder/UpdateOrderController";
import { DeleteOrderController } from "./useCases/orders/deleteOrder/DeleteOrderController";

import uploadConfig from './config/upload';

const upload = multer(uploadConfig);

const router = Router();
const authenticateUserController = new AuthenticateUserController();
const refreshTokenUserController = new RefreshTokenUserController();
const createUserController = new CreateUserController();

// Dashboard
const getDataController = new GetDataController();
const exportCsvController = new ExportCsvController();

// Products
const productToPdfController = new ProductToPdfController();
const importProductController = new ImportProductController();
const createProductController = new CreateProductController();
const listProductController = new ListProductController();
const listProductsController = new ListProductsController();
const updateProductController = new UpdateProductController();
const deleteProductController = new DeleteProductController();

// Associates
const importAssociateController = new ImportAssociateController();
const createAssociateController = new CreateAssociateController();
const listAssociateController = new ListAssociateController();
const listAssociatesController = new ListAssociatesController();
const updateAssociateController = new UpdateAssociateController();
const deleteAssociateController = new DeleteAssociateController();

// Orders
const createOrderController = new CreateOrderController();
const listOrderController = new ListOrderController();
const listOrdersController = new ListOrdersController();
const updateOrderController = new UpdateOrderController();
const deleteOrderController = new DeleteOrderController();


router.post("/login", authenticateUserController.handle);
router.post("/refresh", refreshTokenUserController.handle);
router.get("/me", ensureAuthenticate, (request, response) => {
  if (request.user) {
    const { password, role, ...userData } = request.user;
    return response.json(userData);
  } else {
    return response.status(401).json({ error: "Usuário não autenticado" });
  }
});

router.post("/users", createUserController.handle);

router.get("/dashboard", getDataController.handle)
router.get("/export-csv", exportCsvController.handle)

// Products
router.get('/products/pdf', ensureAuthenticate, productToPdfController.handle);
router.post('/products/import', ensureAuthenticate, upload.single('file'), importProductController.handle);
router.post("/products", ensureAuthenticate, createProductController.handle);
router.get("/products/:product_id", ensureAuthenticate, listProductController.handle);
router.get("/products", ensureAuthenticate, listProductsController.handle);
router.put("/products", ensureAuthenticate, updateProductController.handle);
router.delete("/products/:product_id", ensureAuthenticate, deleteProductController.handle);

// Associates
router.post('/associates/import', ensureAuthenticate, upload.single('file'), importAssociateController.handle);
router.post("/associates", ensureAuthenticate, createAssociateController.handle);
router.get("/associates/:associate_id", ensureAuthenticate, listAssociateController.handle);
router.get("/associates", ensureAuthenticate, listAssociatesController.handle);
router.put("/associates", ensureAuthenticate, updateAssociateController.handle);
router.delete("/associates/:associate_id", ensureAuthenticate, deleteAssociateController.handle);

// Orders
router.post("/orders", ensureAuthenticate, createOrderController.handle);
router.get("/orders/:order_id", ensureAuthenticate, listOrderController.handle);
router.get("/orders", ensureAuthenticate, listOrdersController.handle);
router.put("/orders", ensureAuthenticate, updateOrderController.handle);
router.delete("/orders/:order_id", ensureAuthenticate, deleteOrderController.handle);


export { router };
