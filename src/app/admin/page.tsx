// // app/admin/page.tsx
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { DollarSign, Package, ShoppingCart, Users } from "lucide-react";
// import dbConnect from "@/lib/mongodb";
// import Order from "@/models/Order";
// import Product from "@/models/Product";
// import { formatCurrency } from "@/lib/utils";

// async function getDashboardData() {
//   await dbConnect();

//   const totalRevenuePromise = Order.aggregate([
//     { $match: { status: "delivered" } },
//     { $group: { _id: null, total: { $sum: "$totalAmount" } } },
//   ]);

//   const orderCountPromise = Order.countDocuments();
//   const productCountPromise = Product.countDocuments();
//   const uniqueCustomersPromise = Order.distinct("customerWhatsapp");

//   const [
//     totalRevenueResult,
//     orderCount,
//     productCount,
//     uniqueCustomers,
//   ] = await Promise.all([
//     totalRevenuePromise,
//     orderCountPromise,
//     productCountPromise,
//     uniqueCustomersPromise,
//   ]);

//   const totalRevenue = totalRevenueResult[0]?.total || 0;
//   const uniqueCustomerCount = uniqueCustomers.length;

//   return {
//     totalRevenue,
//     orderCount,
//     productCount,
//     uniqueCustomerCount,
//   };
// }

// export default async function AdminDashboard() {
//   const { totalRevenue, orderCount, productCount, uniqueCustomerCount } =
//     await getDashboardData();

//   const stats = [
//     {
//       title: "Total Revenue",
//       value: formatCurrency(totalRevenue),
//       icon: <DollarSign className="h-5 w-5 text-muted-foreground" />,
//       desc: "Total from all delivered orders",
//     },
//     {
//       title: "Orders",
//       value: orderCount,
//       icon: <ShoppingCart className="h-5 w-5 text-muted-foreground" />,
//       desc: "Total orders placed",
//     },
//     {
//       title: "Total Products",
//       value: productCount,
//       icon: <Package className="h-5 w-5 text-muted-foreground" />,
//       desc: "Total products in inventory",
//     },
//     {
//       title: "Unique Customers",
//       value: uniqueCustomerCount,
//       icon: <Users className="h-5 w-5 text-muted-foreground" />,
//       desc: "Customers who placed an order",
//     },
//   ];

//   return (
//     <div className="pt-6">
//       <h1 className="text-3xl font-bold font-headline mb-8">Dashboard</h1>
//       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
//         {stats.map((stat, i) => (
//           <Card
//             key={i}
//             className="rounded-xl border shadow-sm hover:shadow-md transition-shadow duration-200"
//           >
//             <CardHeader className="flex flex-row items-center justify-between pb-2">
//               <CardTitle className="text-sm font-medium">
//                 {stat.title}
//               </CardTitle>
//               {stat.icon}
//             </CardHeader>
//             <CardContent>
//               <div className="text-3xl font-bold tracking-tight">
//                 {stat.value}
//               </div>
//               <p className="text-xs text-muted-foreground mt-1">{stat.desc}</p>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// }


//update page
// app/admin/page.tsx
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { DollarSign, Package, ShoppingCart, Users } from "lucide-react";
// import dbConnect from "@/lib/mongodb";
// import Order from "@/models/Order";
// import Product from "@/models/Product";
// import { formatCurrency } from "@/lib/utils";

// async function getDashboardData() {
//   await dbConnect();

//   const totalRevenuePromise = Order.aggregate([
//     { $match: { status: "delivered" } },
//     { $group: { _id: null, total: { $sum: "$totalAmount" } } },
//   ]);

//   const orderCountPromise = Order.countDocuments();
//   const productCountPromise = Product.countDocuments();
//   const uniqueCustomersPromise = Order.distinct("customerWhatsapp");

//   const [
//     totalRevenueResult,
//     orderCount,
//     productCount,
//     uniqueCustomers,
//   ] = await Promise.all([
//     totalRevenuePromise,
//     orderCountPromise,
//     productCountPromise,
//     uniqueCustomersPromise,
//   ]);

//   const totalRevenue = totalRevenueResult[0]?.total || 0;
//   const uniqueCustomerCount = uniqueCustomers.length;

//   return {
//     totalRevenue,
//     orderCount,
//     productCount,
//     uniqueCustomerCount,
//   };
// }

// export default async function AdminDashboard() {
//   const { totalRevenue, orderCount, productCount, uniqueCustomerCount } =
//     await getDashboardData();

//   const stats = [
//     {
//       title: "Total Revenue",
//       value: formatCurrency(totalRevenue),
//       icon: <DollarSign className="h-5 w-5 text-gray-500" />,
//       desc: "Total from all delivered orders",
//     },
//     {
//       title: "Orders",
//       value: orderCount,
//       icon: <ShoppingCart className="h-5 w-5 text-gray-500" />,
//       desc: "Total orders placed",
//     },
//     {
//       title: "Total Products",
//       value: productCount,
//       icon: <Package className="h-5 w-5 text-gray-500" />,
//       desc: "Total products in inventory",
//     },
//     {
//       title: "Unique Customers",
//       value: uniqueCustomerCount,
//       icon: <Users className="h-5 w-5 text-gray-500" />,
//       desc: "Customers who placed an order",
//     },
//   ];

//   return (
//     <div className="space-y-8">
//       {/* Welcome Section */}
//       <div>
//         <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back!</h1>
//         <p className="text-gray-600">Here's what's happening with your business today.</p>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
//         {stats.map((stat, i) => (
//           <Card
//             key={i}
//             className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 hover:border-gray-300"
//           >
//             <CardHeader className="flex flex-row items-center justify-between pb-3">
//               <CardTitle className="text-sm font-medium text-gray-600 uppercase tracking-wide">
//                 {stat.title}
//               </CardTitle>
//               <div className="p-2 bg-gray-50 rounded-lg">
//                 {stat.icon}
//               </div>
//             </CardHeader>
//             <CardContent>
//               <div className="text-3xl font-bold text-gray-900 mb-1">
//                 {stat.value}
//               </div>
//               <p className="text-xs text-gray-500">{stat.desc}</p>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {/* Recent Activity Section */}
//       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//         <Card className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
//           <CardHeader>
//             <CardTitle className="text-lg font-semibold text-gray-900">Recent Orders</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                 <div>
//                   <p className="font-medium text-gray-900">#12345</p>
//                   <p className="text-sm text-gray-500">John Doe</p>
//                 </div>
//                 <div className="text-right">
//                   <p className="font-semibold text-gray-900">$125.00</p>
//                   <span className="inline-block px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
//                     Pending
//                   </span>
//                 </div>
//               </div>
//               <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                 <div>
//                   <p className="font-medium text-gray-900">#12344</p>
//                   <p className="text-sm text-gray-500">Jane Smith</p>
//                 </div>
//                 <div className="text-right">
//                   <p className="font-semibold text-gray-900">$89.50</p>
//                   <span className="inline-block px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
//                     Completed
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
//           <CardHeader>
//             <CardTitle className="text-lg font-semibold text-gray-900">Top Products</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="font-medium text-gray-900">Product A</p>
//                   <p className="text-sm text-gray-500">24 sold</p>
//                 </div>
//                 <div className="w-20 bg-gray-200 rounded-full h-2">
//                   <div className="bg-blue-500 h-2 rounded-full" style={{width: '80%'}}></div>
//                 </div>
//               </div>
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="font-medium text-gray-900">Product B</p>
//                   <p className="text-sm text-gray-500">18 sold</p>
//                 </div>
//                 <div className="w-20 bg-gray-200 rounded-full h-2">
//                   <div className="bg-green-500 h-2 rounded-full" style={{width: '60%'}}></div>
//                 </div>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
//           <CardHeader>
//             <CardTitle className="text-lg font-semibold text-gray-900">Quick Actions</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-3">
//               <button className="w-full text-left p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
//                 <p className="font-medium text-blue-900">Add New Product</p>
//                 <p className="text-sm text-blue-600">Create a new product listing</p>
//               </button>
//               <button className="w-full text-left p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
//                 <p className="font-medium text-green-900">Process Orders</p>
//                 <p className="text-sm text-green-600">Review pending orders</p>
//               </button>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }



import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Package, ShoppingCart, Users } from "lucide-react";
import dbConnect from "@/lib/mongodb";
import Order from "@/models/Order";
import Product from "@/models/Product";
import { formatCurrency } from "@/lib/utils";

async function getDashboardData() {
  await dbConnect();

  const totalRevenuePromise = Order.aggregate([
    { $match: { status: "delivered" } },
    { $group: { _id: null, total: { $sum: "$totalAmount" } } },
  ]);

  const orderCountPromise = Order.countDocuments();
  const productCountPromise = Product.countDocuments();
  const uniqueCustomersPromise = Order.distinct("customerWhatsapp");
  
  // Get recent orders (last 5)
  const recentOrdersPromise = Order.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .lean();

  // Get top products by quantity sold
  const topProductsPromise = Order.aggregate([
    { $unwind: "$items" },
    { 
      $group: {
        _id: "$items.product",
        totalSold: { $sum: "$items.quantity" },
        totalRevenue: { $sum: { $multiply: ["$items.quantity", "$items.price"] } }
      }
    },
    { $sort: { totalSold: -1 } },
    { $limit: 3 },
    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "_id",
        as: "productDetails"
      }
    },
    { $unwind: { path: "$productDetails", preserveNullAndEmptyArrays: true } }
  ]);

  const [
    totalRevenueResult,
    orderCount,
    productCount,
    uniqueCustomers,
    recentOrders,
    topProducts
  ] = await Promise.all([
    totalRevenuePromise,
    orderCountPromise,
    productCountPromise,
    uniqueCustomersPromise,
    recentOrdersPromise,
    topProductsPromise
  ]);

  const totalRevenue = totalRevenueResult[0]?.total || 0;
  const uniqueCustomerCount = uniqueCustomers.length;

  return {
    totalRevenue,
    orderCount,
    productCount,
    uniqueCustomerCount,
    recentOrders,
    topProducts
  };
}

function getStatusBadge(status: string) {
  const statusConfig: { [key: string]: { class: string; label: string } } = {
    pending: { class: "bg-yellow-100 text-yellow-800", label: "Pending" },
    processing: { class: "bg-blue-100 text-blue-800", label: "Processing" },
    shipped: { class: "bg-indigo-100 text-indigo-800", label: "Shipped" },
    delivered: { class: "bg-green-100 text-green-800", label: "Delivered" },
    cancelled: { class: "bg-red-100 text-red-800", label: "Cancelled" }
  };
  
  const config = statusConfig[status] || { class: "bg-gray-100 text-gray-800", label: status };
  return (
    <span className={`inline-block px-2 py-1 text-xs rounded-full ${config.class}`}>
      {config.label}
    </span>
  );
}

function getPaymentBadge(paymentStatus: string) {
  const paymentConfig: { [key: string]: { class: string; label: string } } = {
    pending: { class: "bg-yellow-100 text-yellow-800", label: "Pending" },
    paid: { class: "bg-green-100 text-green-800", label: "Paid" },
    failed: { class: "bg-red-100 text-red-800", label: "Failed" }
  };
  
  const config = paymentConfig[paymentStatus] || { class: "bg-gray-100 text-gray-800", label: paymentStatus };
  return (
    <span className={`inline-block px-2 py-1 text-xs rounded-full ${config.class}`}>
      {config.label}
    </span>
  );
}

export default async function AdminDashboard() {
  const { 
    totalRevenue, 
    orderCount, 
    productCount, 
    uniqueCustomerCount, 
    recentOrders, 
    topProducts 
  } = await getDashboardData();

  const stats = [
    {
      title: "Total Revenue",
      value: formatCurrency(totalRevenue),
      icon: <DollarSign className="h-5 w-5 text-gray-500" />,
      desc: "Total from all delivered orders",
    },
    {
      title: "Orders",
      value: orderCount,
      icon: <ShoppingCart className="h-5 w-5 text-gray-500" />,
      desc: "Total orders placed",
    },
    {
      title: "Total Products",
      value: productCount,
      icon: <Package className="h-5 w-5 text-gray-500" />,
      desc: "Total products in inventory",
    },
    {
      title: "Unique Customers",
      value: uniqueCustomerCount,
      icon: <Users className="h-5 w-5 text-gray-500" />,
      desc: "Customers who placed an order",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back!</h1>
        <p className="text-gray-600">Here's what's happening with your business today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card
            key={i}
            className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 hover:border-gray-300"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                {stat.title}
              </CardTitle>
              <div className="p-2 bg-gray-50 rounded-lg">
                {stat.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <p className="text-xs text-gray-500">{stat.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity Section */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Recent Orders Card */}
        <Card className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-orange-500" />
              Recent Orders
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              {recentOrders.length > 0 ? (
                recentOrders.map((order) => (
                  <div key={order._id.toString()} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">
                        #{order._id.toString().slice(-8)}
                      </p>
                      <p className="text-sm text-gray-500 truncate">{order.customerName}</p>
                      <div className="flex items-center gap-2 mt-1">
                        {getPaymentBadge(order.paymentStatus)}
                      </div>
                    </div>
                    <div className="text-right ml-3">
                      <p className="font-semibold text-gray-900 text-sm">
                        {formatCurrency(order.totalAmount)}
                      </p>
                      <div className="mt-1">
                        {getStatusBadge(order.status)}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-gray-500 text-sm">
                  No orders found
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Top Products Card */}
        <Card className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Package className="h-5 w-5 text-green-500" />
              Top Products
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-4">
              {topProducts.length > 0 ? (
                topProducts.map((product, index) => (
                  <div key={product._id?.toString() || index} className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">
                        {product.productDetails?.name || `Product ${product._id?.toString().slice(-8) || 'N/A'}`}
                      </p>
                      <p className="text-sm text-gray-500">
                        {product.totalSold} sold
                        {product.totalRevenue && ` • ${formatCurrency(product.totalRevenue)}`}
                      </p>
                    </div>
                    <div className="w-20 bg-gray-200 rounded-full h-2 ml-3">
                      <div 
                        className={`h-2 rounded-full ${
                          index === 0 ? 'bg-blue-500' : 
                          index === 1 ? 'bg-green-500' : 
                          'bg-purple-500'
                        }`} 
                        style={{ 
                          width: `${topProducts[0]?.totalSold ? 
                            Math.min((product.totalSold / topProducts[0].totalSold) * 100, 100) : 
                            0}%` 
                        }}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-gray-500 text-sm">
                  No product data available
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats Card */}
        <Card className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-purple-500" />
              Quick Stats
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                <div>
                  <p className="font-semibold text-blue-900">{orderCount}</p>
                  <p className="text-sm text-blue-700">Total Orders</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-blue-900">
                    {formatCurrency(totalRevenue)}
                  </p>
                  <p className="text-sm text-blue-700">Revenue</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-2 bg-green-50 rounded-lg">
                  <p className="font-semibold text-green-900">
                    {recentOrders.filter((o: any) => o.paymentStatus === 'paid').length}
                  </p>
                  <p className="text-xs text-green-700">Paid Orders</p>
                </div>
                <div className="text-center p-2 bg-orange-50 rounded-lg">
                  <p className="font-semibold text-orange-900">
                    {recentOrders.filter((o: any) => o.status === 'delivered').length}
                  </p>
                  <p className="text-xs text-orange-700">Delivered</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-2 bg-red-50 rounded-lg">
                  <p className="font-semibold text-red-900">
                    {recentOrders.filter((o: any) => o.status === 'pending').length}
                  </p>
                  <p className="text-xs text-red-700">Pending</p>
                </div>
                <div className="text-center p-2 bg-indigo-50 rounded-lg">
                  <p className="font-semibold text-indigo-900">
                    {uniqueCustomerCount}
                  </p>
                  <p className="text-xs text-indigo-700">Customers</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}