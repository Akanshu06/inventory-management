websocket,email , file_structure

email,websocket_notification,filestructure
///////////////////////

make folder in controller folder
category-> category.create.ts,category.delete.ts
location ->
notification
product
stock

next.ts


same process in routes also
same process in validator also

/////////////////////////

 change the middleware

middleware/                # Express middleware
│   │   ├── middleware.auth.ts     # JWT authentication
│   │   ├── middleware.permission.ts # Permission checking
│   │   ├── middleware.
│   │   ├── middleware.rateLimit.ts # Rate limiting
│   │   ├── middleware.errorHandler.ts # Global error handler
│   │   └── middleware.index.ts    # Middleware exports
│   │

for refrence
/////////////////


workflow :
product:[edit,delete,add,update] -> category[manuel] -> location[manuel] -> stock [product,location,quantity,reserverd,lowstockalert]-> notification[type,title,message,releated_id,]