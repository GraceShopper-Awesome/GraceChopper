/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {Login, Signup} from './auth-form'
export {default as ProductAll} from './product-all'
export {default as ProductSingle} from './product-single'
export {default as AdminHome} from './admin-home'
export {default as AdminProducts} from './admin-products'
export {default as AdminOrders} from './admin-orders'
export {default as AdminUsers} from './admin-users'
export {default as AdminAddProduct} from './admin-products-add'
export {default as AdminAddCategory} from './admin-categories-add'
export {default as AdminEditProduct} from './admin-products-edit'
export {default as Cart} from './cart'
export {default as UserOrders} from './users-orders'
export {default as Checkout} from './checkout'
