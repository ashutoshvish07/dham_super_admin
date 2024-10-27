import{r,v as C,u as P,a as b,aF as s,j as o,B as n,a3 as D,P as N}from"./index-nP3sWgOM.js";import{S as v}from"./SearchBar-BByW93zJ.js";import{h as d}from"./moment-G82_0lEo.js";import{l as j}from"./lodash-CeyOGm4C.js";import{D as B}from"./DataTable-BAyMAVN6.js";import"./TextField-Btu36Zmo.js";import"./InputLabel-DaDe49tm.js";import"./Autocomplete-Cb93hnIo.js";import"./Close-CYbAYMXT.js";import"./MenuItem-vSBr2iRT.js";import"./Checkbox-CVXqhyuK.js";import"./Button-DYMAArme.js";import"./Skeleton-DY2pMhD5.js";import"./colorManipulator-BTVsESXO.js";import"./useThemeProps-Cp5GSgP0.js";const K=()=>{const[m,p]=r.useState({open:!1,onClose:()=>p({...m,open:!1})}),[c,l]=r.useState({page:0,pageSize:10}),[g,u]=r.useState("");C();const{loading:h,bookings:y,guidBooking:t}=P(e=>e.bookings);console.log("guidBooking",t);const i=b();r.useEffect(()=>{i(s({page:1,page_size:10}))},[i]);const f=e=>{e.pageSize==c.pageSize?(i(s({page:e.page+1,page_size:e.pageSize})),l(e)):(i(s({page:e.page,page_size:e.pageSize})),l({page:1,pageSize:e.pageSize}))},x=[{field:"guideId",headerName:"Guide Name",renderCell:e=>{const{guideId:a}=e.row;return`${a==null?void 0:a.name} `},flex:1},{field:"totalPrice",headerName:"Total amount",flex:1},{field:"guideIncome",headerName:"Guide Income",flex:1},{field:"paidAmount",headerName:"Paid Amount ",flex:1},{field:"_id",headerName:"Due Amount ",flex:1,renderCell:e=>{const{totalPrice:a,paidAmount:z}=e.row;return a-z}},{field:"perHourPrice",headerName:"Per Hour Price ",flex:1},{field:"bookingStatus",headerName:"Booking Status",flex:1},{field:"paymentStatus",headerName:"Payment Status",flex:1},{field:"totalBookingHours",headerName:"Total Booking Hours",flex:1},{field:"bookingDate",headerName:"Booking Date",flex:2,renderCell:e=>d(e.value).format("DD/MM/YYYY")},{field:"bookingTimeFrom",headerName:"Booking Time From",flex:2,renderCell:e=>(console.log(e.value),d(e.value,"HH:mm").format("hh:mm A"))}],S=r.useCallback(j.debounce(e=>{i(s({page:1,page_size:10,search:e}))},1e3),[]),k=e=>{const a=e.target.value;u(a),S(a)};return o.jsxs("div",{children:[o.jsxs(n,{sx:{display:"flex",justifyContent:"space-between",flexDirection:"row-reverse",alignItems:"center",marginBottom:2},children:[o.jsx(n,{children:o.jsx(v,{value:g,onChange:k,placeholder:"Search...",size:"small",color:"secondary"})}),o.jsx(n,{sx:{borderRadius:2},children:o.jsx(D,{variant:"h2",color:"secondary",children:"Guides Bookings Details"})})]}),o.jsx(N,{children:o.jsx(B,{data:t==null?void 0:t.bookings,columns:x,getRowId:e=>e._id,loading:h,initialState:{pagination:{paginationModel:{pageSize:10}}},rowCount:t==null?void 0:t.count,paginationMode:"server",onPaginationModelChange:f,pageSizeOptions:[10],disableRowSelectionOnClick:!0})})]})};export{K as default};
